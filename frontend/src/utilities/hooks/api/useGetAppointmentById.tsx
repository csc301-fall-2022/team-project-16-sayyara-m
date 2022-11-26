import { useEffect, useState } from "react"
import { API_ROOT } from "src/utilities/constants";
import { APIError, Appointment } from "src/utilities/interfaces"

// this hook retursn an appointmnet by id
export const useGetAppointmentById = (id: string) => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const getAppointmentById = async() => {
        const res = await fetch(`${API_ROOT}/appointments/${id}`, {
            method: "GET",
        });
        if(res.ok){
            setAppointment(await res.json());
            return;
        }
        const data: APIError = await res.json();
        console.log(data.message);
    }
    useEffect(() => {
        getAppointmentById();
    }, []);
    return { appointment }

}