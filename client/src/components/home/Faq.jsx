import React from "react";
import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { Fade } from "react-awesome-reveal";

const Faq = () => {
  const faqData = [
    {
      question: "What age groups are the art and craft programs suitable for?",
      answer:
        "Our art and craft programs are designed for children and teenagers aged 5-16. We offer age-appropriate activities and projects to ensure an engaging and educational experience for each participant.",
    },
    {
      question: "How long are the courses?",
      answer:
        "The duration of our courses varies depending on the program. Most courses run for 4 to 8 weeks, with one session per week. Each session typically lasts 1-2 hours, allowing ample time for instruction, practice, and creativity.",
    },
    {
      question: "What materials are needed for the classes?",
      answer:
        "The required materials vary for each course and will be provided in the course description. Generally, we provide all the necessary art supplies and materials, ensuring that students have everything they need to participate fully.",
    },
    {
      question: "How can I register for a course?",
      answer:
        'To register for a course, simply visit our website and navigate to the Courses section. Select the desired course and click on the "Register" button. Fill out the registration form with the necessary details and submit it. Our team will contact you to confirm your enrollment and provide further instructions.',
    },
    {
      question: "Is there a minimum skill level required to join the courses?",
      answer:
        "No prior experience is required to join our courses. Our programs are designed to cater to beginners as well as those with some prior art and craft knowledge. Our instructors will guide and support students at their respective skill levels.",
    },
    {
      question: "Are the classes conducted online or in-person?",
      answer:
        "Currently, all our classes are conducted online. We offer live virtual sessions where students can interact with instructors and fellow participants. We provide a secure and user-friendly online learning platform that enables students to engage in art and craft from the comfort of their homes.",
    },
    {
      question: "Can I reschedule or cancel my registration?",
      answer:
        "We understand that circumstances may change. If you need to reschedule or cancel your registration, please contact us as soon as possible. We will do our best to accommodate your request, depending on availability and our rescheduling policy.",
    },
  ];

  return (
    <Container sx={{ mt: 10 }}>
      <Fade direction="down">
        <Stack direction="column" textAlign="center">
          <Typography variant="h3">Frequently Asked Question</Typography>
          <Typography variant="body2" maxWidth={400} mx="auto">
            Find answers to commonly asked questions about our art and craft
            programs.
          </Typography>
        </Stack>
      </Fade>

      <Stack direction="column" spacing={2} mt={7}>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Container>
  );
};

export default Faq;
