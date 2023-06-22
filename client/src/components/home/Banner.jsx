import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "@/assets/home/slider1.jpg";
import slider2 from "@/assets/home/slider2.jpg";
import slider3 from "@/assets/home/slider3.jpg";
import slider4 from "@/assets/home/slider4.jpg";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container sx={{ my: 13 }}>
      <Slider {...settings}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <img
            src={slider1}
            alt="Slider Image 1"
            height={450}
            width="100%"
            style={{
              borderRadius: "5px",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "5%",
              color: "#fff",
            }}
          >
            <Typography variant="h2">Unlock Your Creative Potential</Typography>
            <Typography maxWidth={700}>
              Join our Art & Craft School and explore the limitless
              possibilities of artistic expression. Whether you're a beginner or
              an experienced artist, we have programs tailored to enhance your
              skills and nurture your creativity.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
          }}
        >
          <img
            src={slider2}
            alt="Slider Image 2"
            height={450}
            width="100%"
            style={{
              borderRadius: "5px",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "5%",
              color: "#fff",
            }}
          >
            <Typography variant="h2">
              Immerse Yourself in the World of Art
            </Typography>
            <Typography maxWidth={700}>
              Immerse yourself in a vibrant community of artists, craftsmen, and
              art enthusiasts. Our school offers a wide range of classes,
              workshops, and events, where you can learn new techniques,
              discover different mediums, and be inspired by fellow artists.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
          }}
        >
          <img
            src={slider3}
            alt="Slider Image 2"
            height={450}
            width="100%"
            style={{
              borderRadius: "5px",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "5%",
              color: "#fff",
            }}
          >
            <Typography variant="h2">Discover Your Artistic Voice</Typography>
            <Typography maxWidth={700}>
              Our dedicated instructors are passionate about helping you find
              your unique artistic voice. Through personalized guidance and
              constructive feedback, we'll encourage you to explore your style,
              experiment with various techniques, and unleash your artistic
              potential.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
          }}
        >
          <img
            src={slider4}
            alt="Slider Image 2"
            height={450}
            width="100%"
            style={{
              borderRadius: "5px",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "5%",
              color: "#fff",
            }}
          >
            <Typography variant="h2">Create Lasting Masterpieces</Typography>
            <Typography maxWidth={700}>
              At our Art & Craft School, you'll have access to state-of-the-art
              facilities, high-quality materials, and a supportive environment
              to create lasting masterpieces. Whether you're interested in
              painting, sculpture, ceramics, or any other art form, we provide
              the resources and guidance to bring your vision to life.
            </Typography>
          </Box>
        </Box>
      </Slider>
    </Container>
  );
};

export default Banner;
