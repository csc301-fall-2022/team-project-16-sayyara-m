import { useEffect, useState } from "react";
import { API_ROOT } from "src/utilities/constants";
import { APIError, Shop } from "src/utilities/interfaces";

export const useGetShopById = (id: string | undefined) => {
    const [shop, setShop] = useState<Shop | null>(null);

    const getShopById = async() => {
        if(id === undefined) return;
        const res = await fetch(`${API_ROOT}/shop/${id}`, {
            method: "GET",
        });

        if(res.ok){
            setShop(await res.json());
            console.log("shop successfully fetched");
            return;
        }
        const data: APIError = await res.json();
        console.log(data.message);
    }
    useEffect(() => {
        getShopById();
    }, []);
    return { shop };
}