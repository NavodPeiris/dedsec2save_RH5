import NavbarComponent from "../components/Navbar";
import CardComponent from "../components/Card";
import FormComponent from "../components/Form";
import LineChartComponent from "../components/Linechart";
import BarchartComponent from "../components/Barchart";
import PieChartComponent from "../components/Piechart";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import BarChartComponent from "../components/Barchart";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { backend_link } from "../backend_link";

function DashboardContent(){

    const [sympData, setSympData] = useState([]);
    const [month, setMonth] = useState("");
    const [week, setWeek] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");
    const [chart, setChart] = useState("BarChart");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleWeekChange = (e) => {
        setWeek(e.target.value);
    };

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleButtonClick = async() => {
        console.log("month", month)
        console.log("week", week)
        console.log("district", district)
        console.log("city", city)
        console.log("age", age)

        try {
            const response = await axios.post(`${backend_link}/getSymptomCount`, {
              month: month,
              week: week,
              district: district,
              city: city,
              age: age
            });
            const data = response.data;
            console.log(data);
            setSympData(data);
            handleShow();
            } catch (error) {
            console.error('Error:', error);
            alert("failed")
        }

    }

    const handleChartType = (e) => {
        setChart(e.target.value)
    }

    return (
        <>
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Symptoms Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Month: {month}</p>
                <p>Week: {week}</p>
                <p>District: {district}</p>
                <p>City: {city}</p>
                <p>Age: {age}</p>
                {chart === 'BarChart' && (
                    <BarChartComponent data={sympData}/>
                )}
                {chart === 'PieChart' && (
                    <PieChartComponent data={sympData}/>
                )}
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
                <Form.Control
                value={month}
                onChange={handleMonthChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Week</Form.Label>
                <Form.Control
                value={week}
                onChange={handleWeekChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>District</Form.Label>
                <Form.Control
                value={district}
                onChange={handleDistrictChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>City</Form.Label>
                <Form.Control
                value={city}
                onChange={handleCityChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Age</Form.Label>
                <Form.Control
                value={age}
                onChange={handleAgeChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Select Chart Type</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => handleChartType(e)} value={chart}>
                    <option>{chart}</option>
                    <option value="BarChart">BarChart</option>
                    <option value="PieChart">PieChart</option>
                </Form.Select>
            </Form.Group>
            <Button variant="secondary" onClick={handleButtonClick}>
                Submit
            </Button>{' '}
            </Form>
        </div>
    </>
    );
}

export default DashboardContent;