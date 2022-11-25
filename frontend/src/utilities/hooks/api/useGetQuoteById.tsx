import { useEffect, useState } from "react"
import { API_ROOT } from "src/utilities/constants";
import { APIError, Quote } from "src/utilities/interfaces"

// this hook returns an appointmnet by id
export const useGetQuoteById = (id: string) => {
    const [quote, setQuote] = useState<Quote | null>(null);
    const getQuoteById = async() => {
        const res = await fetch(`${API_ROOT}/quotes/${id}`, {
            method: "GET",
        });
        if(res.ok){
            setQuote(await res.json());
            return;
        }
        const data: APIError = await res.json();
        console.log(data.message);
    }
    useEffect(() => {
        getQuoteById();
    }, []);
    return { quote }

}