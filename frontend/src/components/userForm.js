import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { backend_link } from '../backend_link';
import { symptoms } from './symptoms';
import Modal from 'react-bootstrap/Modal';

function UserForm() {
    // State variables to store input values
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [description, setDescription] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState(Array(17).fill(''));
    const [availableSymptoms, setAvailableSymptoms] = useState([]);
    const [month, setMonth] = useState("");
    const [week, setWeek] = useState("");
    const [show, setShow] = useState(false);
    const [decease, setDecease] = useState("");
    const [treatments, setTreatments] = useState(Array(4).fill(''));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        setAvailableSymptoms(symptoms);
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSymptomChange = (index, e) => {
        const newSelectedSymptoms = [...selectedSymptoms];

        if(newSelectedSymptoms[index] == ""){
            newSelectedSymptoms[index] = e.target.value;
            setSelectedSymptoms(newSelectedSymptoms);

            // Remove the selected symptom from the available symptoms list
            const updatedAvailableSymptoms = availableSymptoms.filter(symptom => symptom !== e.target.value);
            setAvailableSymptoms(updatedAvailableSymptoms);
        }
        else{
            const old_symptom = newSelectedSymptoms[index];
            newSelectedSymptoms[index] = e.target.value;
            setSelectedSymptoms(newSelectedSymptoms);

            // Remove the selected symptom from the available symptoms list
            const updatedAvailableSymptoms1 = availableSymptoms.filter(symptom => symptom !== e.target.value);
            
            const updatedAvailableSymptoms2 = [...updatedAvailableSymptoms1];
            updatedAvailableSymptoms2.unshift(old_symptom);
            setAvailableSymptoms(updatedAvailableSymptoms2);
        }
        
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value)
    }

    const handleWeekChange = (e) => {
        setWeek(e.target.value)
    }

    const handleButtonClick = async () => {
    
        console.log("name", name)
        console.log("age", age)
        console.log("city", city)
        console.log("district", district)
        console.log("description", description)
        
        selectedSymptoms.map((symptom, index) => (
            console.log(`symptom${index+1}`, symptom)
        ))

        const phone = localStorage.getItem("phone")

        try {
            const response = await axios.post(`${backend_link}/create_health`, {
              month: month,
              week: week,
              phone: phone,
              name: name,
              age: age,
              city: city,
              district: district,
              description: description,
              symptom1: selectedSymptoms[0],
              symptom2: selectedSymptoms[1],
              symptom3: selectedSymptoms[2],
              symptom4: selectedSymptoms[3],
              symptom5: selectedSymptoms[4],
              symptom6: selectedSymptoms[5],
              symptom7: selectedSymptoms[6],
              symptom8: selectedSymptoms[7],
              symptom9: selectedSymptoms[8],
              symptom10: selectedSymptoms[9],
              symptom11: selectedSymptoms[10],
              symptom12: selectedSymptoms[11],
              symptom13: selectedSymptoms[12],
              symptom14: selectedSymptoms[13],
              symptom15: selectedSymptoms[14],
              symptom16: selectedSymptoms[15],
              symptom17: selectedSymptoms[16],
            });
      
            console.log(response);

            const Rdecease = response.data.decease;
            setDecease(Rdecease);
            const Rtreatments = response.data.treatments;
            setTreatments(Rtreatments);
            handleShow();
            } catch (error) {
            console.error('Error:', error);
            alert("failed")
        }

    };

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Predictions and Precautions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>Predicted Decease: {decease}</h3>
            <h3>Precautions: </h3>
            <h4>{treatments[0]}</h4>
            <h4>{treatments[1]}</h4>
            <h4>{treatments[2]}</h4>
            <h4>{treatments[3]}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        <div style={{ maxHeight: '100%', maxWidth: '60%', overflowX: 'auto', margin: 20 }}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Month</Form.Label>
                    <Form.Control value={month} onChange={handleMonthChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Week</Form.Label>
                    <Form.Control value={week} onChange={handleWeekChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Age</Form.Label>
                    <Form.Control value={age} onChange={handleAgeChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={city} onChange={handleCityChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>District</Form.Label>
                    <Form.Control value={district} onChange={handleDistrictChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
                </Form.Group>
                {selectedSymptoms.map((selectedSymptom, index) => (
                    <Form.Group key={index} className="mb-3">
                        <Form.Label>Select Symptom {index + 1}</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => handleSymptomChange(index, e)} value={selectedSymptom}>
                            <option>{selectedSymptom}</option>
                            {availableSymptoms.map(symptom => (
                                <option key={symptom} value={symptom}>{symptom}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                ))}
                <Button style={{ margin: 10 }} variant="secondary" onClick={handleButtonClick}>
                    Submit
                </Button>{' '}
            </Form>
        </div>
        </>
    );
}

export default UserForm;
