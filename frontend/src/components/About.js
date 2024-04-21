import React from "react";
import Doctor from "../Assets/pngegg (1).png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
        Medilitics is a cutting-edge Healthcare Solution that can provide predictive diagnosis and Dashboards
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Healthcare Data Analytics"
          description="MedeAnalytics offers healthcare data analytics solutions to help payers and providers improve their operational efficiency, financial performance, and quality of care."
        />

        <SolutionStep
          title="Healthcare Resource Services"
          description="Healthcare Resource Services supports individuals, families, and healthcare providers with expert Medi-Cal eligibility guidance, simplifying access to healthcare benefits for all."
        />

        <SolutionStep
          title="Healthcare Predictive Analytics"
          description="Medilitics uses healthcare predictive analytics to accurately coordinate benefits, ultimately increasing the bottom line for healthcare providers."
        />
      </div>
    </div>
  );
}

export default About;
