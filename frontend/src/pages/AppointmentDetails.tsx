import React from "react";
import { useParams } from "react-router-dom";
const AppointmentDetails = () => {
    const { id } = useParams();

    return (
        <h1>Appointment id: {id}</h1>
    )
}
export default AppointmentDetails;