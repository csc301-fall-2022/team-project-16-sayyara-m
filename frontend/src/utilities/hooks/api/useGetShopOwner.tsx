import { useEffect, useState } from "react"
import { API_ROOT } from "src/utilities/constants";
import { APIError, ShopOwner } from "src/utilities/interfaces";
import useAuthFetch from "../useAuthFetch";

// this hook will fetch the shop owner from the api and return it
// this hook only works when the user is logged in
// all state is mananged in this hook meaning you do not need to declare any state in the component for a shop owner
export const useGetShopOwner = () => {
    const [shopOwner, setShopOwner] = useState<ShopOwner | null>(null);
    const { authFetch } = useAuthFetch();

    const fetchShopOwner = async () => {
        const res = await authFetch(API_ROOT + "/shopOwner", {
            method: "GET",
        })
        if(res.ok){
            setShopOwner(await res.json());
            return;
        }
        const data: APIError = await res.json();
        console.log(data.message);
    }

    useEffect(() => {
        fetchShopOwner();
    }, []);
    return { shopOwner }

}