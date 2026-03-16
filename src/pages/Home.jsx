import { useState } from "react";
import "./Home.css";
import hotelImg from "../assets/hotel.jpg";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "STAFF") navigate("/staff");
    else navigate("/customer");
  };
  const [testimonialIndex, setTestimonialIndex] = useState(0);

const testimonials = [
  {
    text: "Our stay at the hotel was wonderful. The rooms were comfortable, the service was excellent, and the staff were extremely friendly. We would definitely visit again.",
    name: "Rudra ",
    role: "Regular Client",
  },
  {
    text: "Exceptional service and stunning rooms. The staff was incredibly attentive and made our anniversary stay truly unforgettable. We will definitely be returning soon.",
    rating: 5,
    name: "Tina Rajput",
    role: "Guest",
  },
  {
    text: "From the moment we arrived, everything was perfect. The ambiance, the food, the comfort — BM Group Of Hotels exceeded every expectation we had.",
    rating: 4,
    name: "Akshay Kumar",
    role: "Business Traveler",
  },
];
  return (
    <Box>

      {/* HERO */}

      <Box
        id="home"
        className="hero"
        style={{ backgroundImage: `url(${hotelImg})` }}
      >
        <Box className="hero-overlay">

          <Typography className="hero-title">
            Enjoy A Luxury Experience
          </Typography>

          <Typography className="hero-subtitle">
            Discover the perfect hotel for your stay
          </Typography>



        </Box>
      </Box>


      {/* BOOKING FORM */}

      <Container className="booking-container">

        <Grid container spacing={2}>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Check In"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Check Out"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Guests" />
          </Grid>

          <Grid item xs={12} md={3}>
            <Button className="check-btn">
              Check Availability
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button className="check-btn" href="#contact">
              Contact Us
            </Button>
          </Grid>

        </Grid>

      </Container>


{/* ABOUT SECTION */}

<Container id="about" className="about-section">

  <Box className="about-container">

    {/* LEFT IMAGES */}

    <Box className="about-images">

      <img
        src={hotelImg}
        alt="hotel"
        className="about-img-main"
      />

      <img
        src={hotelImg}
        alt="hotel"
        className="about-img-small"
      />

    </Box>


    {/* RIGHT TEXT */}

    <Box className="about-text-box">

      <Typography className="about-subtitle">
        ABOUT US
      </Typography>

      <Typography className="about-title">
        Welcome To BM Group Of Hotels
      </Typography>

      <Typography className="about-text">
        Experience comfort and luxury at BM Group Of Hotels where every guest
        enjoys exceptional hospitality and premium services.
      </Typography>

      <Typography className="about-text">
        Our hotel provides elegant rooms, modern facilities and
        outstanding service to ensure a memorable stay.
      </Typography>

      <Button className="about-btn">
        Discover More
      </Button>

    </Box>

  </Box>

</Container>


      {/* FEATURES */}

   <Container className="features-section">

  <Container className="feature-container">

    <Typography className="features-title">
      OUR FEATURES
    </Typography>

    <Grid container spacing={4} justifyContent="center">

      <Grid item xs={12} md={4}>
        <Box className="feature-box">
          <Typography variant="h6" className="feature-heading">
            Luxury Rooms
          </Typography>
          <Typography className="feature-text">
            Comfortable and modern rooms designed
            for relaxation and elegance.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box className="feature-box">
          <Typography variant="h6" className="feature-heading">
            Restaurant & Dining
          </Typography>
          <Typography className="feature-text">
            Enjoy premium cuisine and exceptional
            dining experiences.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box className="feature-box">
          <Typography variant="h6" className="feature-heading">
            Premium Services
          </Typography>
          <Typography className="feature-text">
            24/7 room service and professional hospitality.
          </Typography>
        </Box>
      </Grid>

    </Grid>

  </Container>

</Container>

  {/* ROOMS */}

<Container id="rooms" className="rooms-section">

  <Typography className="section-title center">
    Our Rooms
  </Typography>

  <Grid container spacing={4} justifyContent="center">

    <Grid item xs={12} sm={6} md={4}>
      <Card className="room-card">
        <CardMedia
          component="img"
          height="250"
          image={hotelImg}
        />
        <CardContent>
          <Typography variant="h6">
            Deluxe Room
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Card className="room-card">
        <CardMedia
          component="img"
          height="250"
          image={hotelImg}
        />
        <CardContent>
          <Typography variant="h6">
            Family Room
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Card className="room-card">
        <CardMedia
          component="img"
          height="250"
          image={hotelImg}
        />
        <CardContent>
          <Typography variant="h6">
            Luxury Suite
          </Typography>
        </CardContent>
      </Card>
    </Grid>

  </Grid>

</Container>

{/* TESTIMONIALS */}

<Container className="testimonials-section">

  <Typography className="testimonial-watermark">
    Testimonial
  </Typography>

  <Box className="testimonial-slider">

    <button
      className="testimonial-arrow left"
      onClick={() =>
        setTestimonialIndex((prev) =>
          prev === 0 ? testimonials.length - 1 : prev - 1
        )
      }
    >
      &#8249;
    </button>

    <Box className="testimonial-content">

      <Box className="testimonial-avatar-wrap">
        <img
          src={hotelImg}
          alt="client"
          className="testimonial-avatar"
        />
        <span className="testimonial-quote-icon">&#10077;</span>
      </Box>

      <Typography className="testimonial-text">
        {testimonials[testimonialIndex].text}
      </Typography>

      <Box className="testimonial-stars">
        {Array(testimonials[testimonialIndex].rating)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="star">&#9733;</span>
          ))}
      </Box>

      <Typography className="testimonial-name">
        <strong>{testimonials[testimonialIndex].name}</strong>,{" "}
        <span className="testimonial-role">
          {testimonials[testimonialIndex].role}
        </span>
      </Typography>

    </Box>

    <button
      className="testimonial-arrow right"
      onClick={() =>
        setTestimonialIndex((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        )
      }
    >
      &#8250;
    </button>

  </Box>

</Container>

{/* CONTACT SECTION */}

<Container id="contact" className="contact-section">

  <Typography className="section-title center">
    Contact Us
  </Typography>

  <Grid container spacing={5} className="contact-container">

    {/* LEFT SIDE - CONTACT FORM */}

    <Grid size={{ xs: 12, md: 6 }}>

      <Box className="contact-form">

        <Grid container spacing={3}>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={5}
              variant="outlined"
            />
          </Grid>

          <Grid size={12}>
            <Button className="contact-btn">
              Send Message
            </Button>
          </Grid>

        </Grid>

      </Box>

    </Grid>


    {/* RIGHT SIDE - GOOGLE MAP */}

    <Grid size={{ xs: 12, md: 6 }}>

      <Box className="map-container">

        <iframe
          title="hotel-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.68902772706!2d74.4762344!3d19.7683625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc5ba7461768af%3A0xf422a9c980e1f1de!2sQF9G%2B8FX%2C%20Shirdi%2C%20Maharashtra%20423109!5e0!3m2!1sen!2sin!4v1773567427279!5m2!1sen!2sin"
          width="100%"
          height="420"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>

      </Box>

    </Grid>

  </Grid>

</Container>

      {/* FOOTER */}

      <Box id="contact" className="footer">

        <Typography className="footer-title">
          BM Group Of Hotels
        </Typography>

        <Typography>
          © 2026 BM Group Of Hotels. All Rights Reserved.
        </Typography>

      </Box>

    </Box>
  );
};

export default Home;