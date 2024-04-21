import React, { useEffect, useState } from "react";
import Doctor from "../Assets/pngegg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/Hero.css";
import Slide from '@mui/material/Slide';


function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);
  const [checked, setChecked] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setChecked((prevChecked) => !prevChecked);
    }, 5000); // Change the interval time (in milliseconds) as needed

    return () => clearInterval(interval);
  }, []);


  const handleRegisterClick = () => {
    navigate("/user/register");
  };

  

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
   
  

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ Health comes first</p>
          <h2 className="text-title">
          Predict. Prevent. Improve
          </h2>
          <p className="text-descritpion">
          Medilitics is a catalyst for change in healthcare. By providing actionable insights and empowering communities to take control of their health, 
          Medilitics is helping to transform healthcare and build healthier communities for the future
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleRegisterClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Register
          </button>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Expert Doctors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
     
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
         <img className="hero-image1" src={Doctor} alt="Doctor" />
      </Slide>
         
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
