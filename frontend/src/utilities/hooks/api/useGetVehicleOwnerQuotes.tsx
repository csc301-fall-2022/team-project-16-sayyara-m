import { useEffect, useState } from "react";
import { API_ROOT } from "src/utilities/constants";
import { APIError, Quote } from "src/utilities/interfaces";

// this hook will return all quotes for a vehicle owner
export const useGetVehicleOwnerQuotes = (vehicleOwnerId: string) => {
    const [quotes, setQuotes] = useState<Quote[] | null>(null);
    const getVehicleOwnerQuotes = async() => {
        const res = await fetch(`${API_ROOT}/vehicleOwner/${vehicleOwnerId}/quotes`, {
            method: "GET",
        });
        if(res.ok){
            setQuotes(await res.json());
            return;
        }
        const data: APIError = await res.json();
        console.log(data.message);
    }
    useEffect(() => {
        getVehicleOwnerQuotes();
    }, []);

    return { quotes };
}