import { useState, useEffect } from "react";
import axios from "axios";
import Terms from "../../components/Terms/Terms";
import Symptoms from "../../components/AddSymptoms/Symptoms";
import SymDisplay from "../../components/SymDisplay/SymDisplay";
import Diagnose from "../../components/Diagnose/Diagnose";
import { Fade } from "react-awesome-reveal";

function PredictDecease() {
  const [start, setStart] = useState(false); // State variable to initalize the session
  const [diagfeatures, setDiagfeatures] = useState([]); // To store the symptoms of the user for diagnosis

  const [sessionId, setSessionId] = useState(); // To store the received sessionID

  const [agree, setAgree] = useState(false); // To check whether the user has agreed to the terms and conditions
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    // To get the sessionId
    const options = {
      method: "GET",
      url: "https://api.endlessmedical.com/v1/dx/InitSession",
      headers: {

      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSessionId(response.data.SessionID); // Storing sessionId in state variable for furthur usage
      })
      .catch(function (error) {
        console.error(error);
      });

      console.log(sessionId)
  }, [analyzed]);

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Terms
        start={start}
        setStart={setStart}
        sessionId={sessionId}
        setAgree={setAgree}
      />

      <Symptoms
        diagfeatures={diagfeatures}
        setDiagfeatures={setDiagfeatures}
        sessionId={sessionId}
        agree={agree}
      />

      <Fade>
        <SymDisplay
          diagfeatures={diagfeatures}
          setDiagfeatures={setDiagfeatures}
          sessionId={sessionId}
          agree={agree}
        />
      </Fade>

      <Fade>
        <Diagnose
          sessionId={sessionId}
          agree={agree}
          diagfeatures={diagfeatures}
          setAnalyzed={setAnalyzed}
        />
      </Fade>
    </div>
  );
}

export default PredictDecease;
