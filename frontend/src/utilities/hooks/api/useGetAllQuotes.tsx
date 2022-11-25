import { useEffect, useState } from "react";
import { API_ROOT } from "src/utilities/constants";
import { APIError, Quote } from "src/utilities/interfaces";
import useAuthFetch from "../useAuthFetch";

//if a user is logged in this hook will return all appointments at their shop
export const useGetAllQuotes = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const { authFetch } = useAuthFetch();
    const getAllQuotes = async() => {
        const res = await authFetch(`${API_ROOT}/quotes`, {
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
        getAllQuotes();
    }, []);
    return { quotes };
}