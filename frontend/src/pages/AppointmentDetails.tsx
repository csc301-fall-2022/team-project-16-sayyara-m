import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ROOT } from "src/utilities/constants";
import useAuth from "src/utilities/hooks/useAuth";
import { Appointment } from "../utilities/interfaces";
import { mAppointment } from "../utilities/mockData";

const getAppointment = async (auth: string | null, id: string | undefined) => {
    const res = await fetch(`${API_ROOT}/appointments/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${auth}`,
        }
    })
    return await res.json();
}

const AppointmentDetails = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [appointment, setAppointment] = useState<Appointment>(mAppointment);

    useEffect(() => {
        getAppointment(auth, id)
            .then(appointment => setAppointment(appointment));
        console.log(appointment)
    }, [])


    return (
        <div>
            <h1>Appointment {appointment.id}</h1>
        </div>
    )
}
export default AppointmentDetails;