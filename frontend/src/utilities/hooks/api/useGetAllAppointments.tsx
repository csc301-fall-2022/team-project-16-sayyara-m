import { useEffect, useState } from "react";
import { API_ROOT } from "src/utilities/constants";
import { APIError, Appointment } from "src/utilities/interfaces";
import useAuthFetch from "../useAuthFetch";

//if a user is logged in this hook will return all appointments at their shop
export const useGetAllAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const { authFetch } = useAuthFetch();
    const getAllAppointments = async() => {
        const res = await authFetch(`${API_ROOT}/appointments`, {
            method: "GET",
        });
        if(res.ok){
            setAppointments(await res.json());
            return;
        }
        const data: APIError = await res.json();
        console.log(data.message);
    }
    useEffect(() => {
        getAllAppointments();
    }, []);
    return { appointments };
}