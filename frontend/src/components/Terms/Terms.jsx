import React from "react";
import "./Terms.css";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";

function Terms({ start, setStart, sessionId, setAgree }) {

  const options = {
    // Options for the axios request.
    method: "POST",
    url: "https://api.endlessmedical.com/v1/dx/AcceptTermsOfUse",
    params: {
      passphrase:
        "I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com",
      SessionID: sessionId,
    },
  };

  const getTerms = () => {
    // Function to verify the terms and conditions.
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAgree(true); // Changing the state variable.
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (sessionId && !start) {
    // Checking whether the user has clicked the "Get Started" Button and sessionId is recieved or not.
    return (
      <Fade>
        <div className="terms-container">
          <hr className="terms-line" />
          <button
            onClick={() => {
              getTerms(); // Calling the function to check terms on "Agree" button click.
              setStart(true);
            }}
            className="agree-button"
          >
            Start
          </button>
        </div>
      </Fade>
    );
  } else {
    return <div></div>;
  }
}

export default Terms;
