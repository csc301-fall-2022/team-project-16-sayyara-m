import { useEffect, useState } from "react";
export const useGetLatLong = (address: string) => {
    const [lat, setLat] = useState<number>(-1);
    const [lng, setLng] = useState<number>(-1);
    const [formattedAddress, setFormattedAddress] = useState("");
    const fetchData = async() => {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`, {
            method: "POST",
        });
        if(res.ok){
            const data = await res.json();
            setLat(data.results[0].geometry.location.lat);
            setLng(data.results[0].geometry.location.lng);
            setFormattedAddress(data.results[0].formatted_address);
            console.log(data);
            return;
        }
        console.log("Something went wrong with google maps");
        console.log(await res.json());
    }
    useEffect(() => {
        fetchData();
    })
    return { lat, lng, formattedAddress };
}