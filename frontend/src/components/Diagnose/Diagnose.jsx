import React, { useState } from "react";
import "./Diganose.css";
import axios from "axios";

function Diagnose({ sessionId, agree, diagfeatures, setAnalyzed}) {
  const [result, setResult] = useState(); // State variable to store the diagnosis result from the server.

  const getresult = () => {
    // Function to get the analysis result form the server.
    var options = {
      method: "GET",
      url: "https://api.endlessmedical.com/v1/dx/Analyze",
      params: { 
        SessionID: sessionId,
        NumberOfResults: 10
      },
      headers: {
        
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setResult(response.data.Diseases); // Storing the diagnosis analysis
      })
      .catch(function (error) {
        console.error(error);
      });

    setAnalyzed(true);
  };

  if (result) {
    // Checking whether the diagnosis analysis is present or not.
    return (
      <div>
        <button className="analyse" onClick={() => getresult()}>
          Analyse
        </button>

        <div className="diagnose-display">
          <div className="rside">
            <div className="heading">Diagnose Results</div>
          </div>
          <div className="rside">
            <div className="results-container">
              {result.map((disease, index) => (
                <div className="Disease Bar">
                  <p className="disease">
                    • &nbsp; {Object.keys(disease)[0]} (
                    {Math.round(Object.values(disease)[0] * 100)}%)
                  </p>
                  <p className="percentage"></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (sessionId && agree && diagfeatures.length > 0) {
    // If the diagnosis result is not present showing the analyse button only if the user has added atleast one symptom.
    return (
      <div>
        <button className="analyse" onClick={() => getresult()}>
          Analyse
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Diagnose;
