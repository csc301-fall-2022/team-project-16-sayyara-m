import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_ROOT } from "src/utilities/constants";
import useAuth from "src/utilities/hooks/useAuth";

const AppointmentDetails = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    //const [appointment, setAppointment] = useState(null);
    useEffect(() => {
        const getAppointment = async () => {
            const res = await fetch(`${API_ROOT}/appointments/${id}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${auth}`,
                }
            })
            const appointment = await res.json();
            return appointment;
        }
        console.log(getAppointment());
        //setAppointment(getAppointment());
    })
    return (
        <h1>Appointment id: {id}</h1>
    )
}
export default AppointmentDetails;