import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth, faChartLine, faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What Is MediLitics</span>
        </h3>
        <p className="info-description">
        Medilitics is a sophisticated predictive analytics framework that uses data and analytics to track and analyze vital health data and hospital admission records. By forecasting the worst-case health outcomes for patients with chronic diseases over the coming years, we can help communities take proactive measures to prevent disease outbreaks and improve healthcare outcomes.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Predictive Analytics"
          description="Predictive analytics is a powerful tool in healthcare that uses data and analytics to forecast the worst-case health outcomes for patients with chronic diseases over the coming years. By analyzing data from various sources, predictive analytics can help healthcare providers identify potential health issues before they become major problems, enabling them to take proactive measures to prevent disease outbreaks and improve healthcare outcomes."
          icon={faChartLine}
        />

        <InformationCard
          title="Disease Outbreak Tracking"
          description="Disease outbreak tracking is a critical function of public health systems, helping to identify, contain, and prevent the spread of infectious diseases. The process typically involves tracking the spread of a disease from a single index case, mapping the patient's contacts and activities, and identifying potential sources of infection,This information is used to limit the wider outbreak and prevent further transmission."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Healthcare Resource Access"
          description="Healthcare Resource Access refers to the ability of individuals, families, and communities to access healthcare services, including prevention, diagnosis, treatment, and management of diseases, illness, disorders, and injuries. The availability and accessibility of healthcare resources can be influenced by various factors."
          icon={faPrescriptionBottle}
        />
      </div>
    </div>
  );
}

export default Info;
