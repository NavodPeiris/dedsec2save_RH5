import NavbarComponent from "../components/Navbar";
import CardComponent from "../components/Card";
import FormComponent from "../components/Form";
import LineChartComponent from "../components/Linechart";
import BarchartComponent from "../components/Barchart";
import PieChartComponent from "../components/Piechart";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserForm from "./userForm";

function UserDashboard(){

    return(
        <>
            <UserForm/>
        </>
    )
}

export default UserDashboard;