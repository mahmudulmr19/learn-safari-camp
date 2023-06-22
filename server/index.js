import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";
import stripe from "stripe";

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;
const client = new MongoClient(URL);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send({ message: "Learn Safari Camp" });
});

// collections
const usersCollection = client.db("learnsafaricamp").collection("users");
const classesCollection = client.db("learnsafaricamp").collection("classes");
const selectedCollection = client.db("learnsafaricamp").collection("selected");
const paymentsCollection = client.db("learnsafaricamp").collection("payments");

// verify token
const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.decoded = decoded;
    next();
  });
};

// verify admin
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await usersCollection.findOne({ email: email });

  if (user?.role !== "admin") {
    return res.status(403).send({ message: "Forbidden access" });
  }

  next();
};

// verify instructor
const verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;

  const user = await usersCollection.findOne({ email: email });

  if (user?.role !== "instructor") {
    return res.status(403).send({ message: "Forbidden access" });
  }

  next();
};

// auth register routes
app.post("/api/register", async (req, res) => {
  try {
    const body = req.body;
    const user = { ...body, role: "student" };
    await usersCollection.insertOne(user);
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!" });
  }
});

// auth login routes
app.post("/api/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// google login
app.post("/api/google_login", async (req, res) => {
  try {
    const body = req.body;
    const foundUser = await usersCollection.findOne({ email: body.email });

    if (foundUser) {
      const token = jwt.sign(foundUser, process.env.JWT_SECRET);
      return res.status(200).send({ token });
    } else {
      const newUser = { ...body, role: "student" };
      await usersCollection.insertOne(newUser);
      const token = jwt.sign(newUser, process.env.JWT_SECRET);
      return res.status(200).send({ token });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// user(me) route
app.get("/api/users/me", verifyToken, async (req, res) => {
  try {
    const email = req.decoded.email;
    const findUser = await usersCollection.findOne({ email: email });
    if (!findUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(findUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// all users
app.get("/api/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// set role
app.patch("/api/users/:userId", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.userId;
    const { role } = req.body;
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: role } }
    );
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instructor related api
// prettier-ignore
app.post("/api/instructors/classes/create", verifyToken, verifyInstructor, async (req, res) => {
  try {
    const body = req.body
    const result = await classesCollection.insertOne(body)
    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
);

// get specific instructor data by instructor email
// prettier-ignore
app.get("/api/instructors/classes/:instructorEmail", verifyToken, verifyInstructor, async (req, res) => {
  try {
    const email = req.params.instructorEmail
    const decodedEmail = req.decoded.email;
    
    if(email !== decodedEmail){
      throw new Error("Forbidden access")
    }
    const result = await classesCollection.find({instructor_email: email}).toArray();
    res.send(result)

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get class instructor
// prettier-ignore
app.get("/api/instructors/class/:classId", verifyToken, verifyInstructor, async (req, res) => {
  try {
    const classId = req.params.classId
    const result = await classesCollection.findOne({_id: new ObjectId(classId)})
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// edit class
// prettier-ignore
app.patch("/api/instructors/class/:classId",verifyToken, verifyInstructor, async (req,res) =>{
  try{
    const classId = req.params.classId
    const body = req.body
    const result = await classesCollection.updateOne({_id: new ObjectId(classId)},{$set: body})
    res.send(result);
  }
  catch{
    res.status(400).send({ message: error.message });
  }
});

// get all classes
// prettier-ignore
app.get("/api/classes/all", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await classesCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// set class status
app.patch("/api/class/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await classesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// send feedback
// prettier-ignore
app.patch("/api/class/feedback/:id", verifyToken, verifyAdmin, async (req,res) =>{
  try {
    const id = req.params.id;
    const { feedback } = req.body
    const result = await classesCollection.updateOne({_id: new ObjectId(id)},{$set:{feedback: feedback}})
    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get all instructors data
app.get("/api/instructors", async (req, res) => {
  try {
    const result = await usersCollection.find({ role: "instructor" }).toArray();
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get all classes
// prettier-ignore
app.get("/api/classes", async (req, res) => {
  try {
    const result = await classesCollection.find({ status: "approved" }).toArray()
    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// select class
app.post("/api/select_class", verifyToken, async (req, res) => {
  try {
    const body = req.body;

    const query = {
      classId: body.classId,
      email: body.email,
    };

    const existClass = await selectedCollection.findOne(query);
    if (existClass) {
      throw new Error("Already selected");
    }
    const result = await selectedCollection.insertOne(body);
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get selected class by user email
app.get("/api/select_class/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    if (req.decoded.email !== email) {
      throw new Error("Forbidden access");
    }
    const result = await selectedCollection.find({ email: email }).toArray();
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// delete selected class by by id
// prettier-ignore
app.delete("/api/select_class/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await selectedCollection.deleteOne({_id: new ObjectId(id)})
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get specific class
app.get("/api/selected_class/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const decodedEmail = req.decoded.email;
    const findClass = await selectedCollection.findOne({
      classId: id,
      email: decodedEmail,
    });
    if (!findClass) {
      throw new Error("Selected class not found");
    }

    res.send(findClass);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// payment related api
// create payment intent
app.post("/api/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);

    if (!price) {
      throw new Error("Price required");
    }

    const paymentIntent = await stripe(
      process.env.PAYMENT_SECRET_KEY
    ).paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// payments route
app.post("/api/payments", verifyToken, async (req, res) => {
  try {
    const payment = req.body;
    const query = {
      classId: payment.classId,
      email: payment.email,
    };
    await selectedCollection.deleteOne(query);

    // Reduce the available seats for the class by 1
    const classQuery = { _id: new ObjectId(payment.classId) };
    const classUpdate = {
      $inc: { available_seats: -1, total_enrolled_students: 1 },
    };
    await classesCollection.updateOne(classQuery, classUpdate);

    const result = await paymentsCollection.insertOne(payment);
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get student enrolled class data
app.get("/api/student/enrolled_class", verifyToken, async (req, res) => {
  try {
    const email = req.decoded.email;
    const result = await paymentsCollection.find({ email: email }).toArray();
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get payment history for a student
app.get("/api/student/payment_history", verifyToken, async (req, res) => {
  try {
    const email = req.decoded.email;
    const paymentHistory = await paymentsCollection
      .find({ email: email })
      .sort({ date: -1 })
      .toArray();

    res.send(paymentHistory);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//  popular classes route
app.get("/api/popular-classes", async (req, res) => {
  try {
    // prettier-ignore
    const popularClasses = await classesCollection.find().sort({ total_enrolled_students: -1 }).limit(6).toArray()
    res.send(popularClasses);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// popular instructors route
app.get("/api/popular-instructors", async (req, res) => {
  try {
    const pipeline = [
      // Match only instructors
      { $match: { role: "instructor" } },
      // Lookup for classes taught by the instructor and calculate total enrolled students
      {
        $lookup: {
          from: "classes",
          localField: "email",
          foreignField: "instructor_email",
          as: "classes",
        },
      },
      {
        $addFields: {
          totalStudents: { $sum: "$classes.total_enrolled_students" },
        },
      },
      // Sort by total enrolled students in descending order
      { $sort: { totalStudents: -1 } },
      // Limit to 6 instructors
      { $limit: 6 },
      // Project only the required fields
      {
        $project: {
          name: 1,
          photoURL: 1,
          email: 1,
          _id: 0,
        },
      },
    ];

    const popularInstructors = await usersCollection
      .aggregate(pipeline)
      .toArray();

    res.send(popularInstructors);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Run the server
client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
