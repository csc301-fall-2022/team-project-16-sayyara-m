import React, { useState } from "react";

import { API_ROOT } from "src/utilities/constants";
import useAuthFetch from "src/utilities/hooks/useAuthFetch";
import { APIError, Service } from "src/utilities/interfaces";

interface ServiceCreationFormProps {
    addService: (service: Service) => void
}
const ServiceCreationForm = (props: ServiceCreationFormProps) => {
    const { addService } = props;
    
    const { authFetch } = useAuthFetch();

    const [service, setService] = useState<string>("")
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    const handleServiceCreate = async () => {
        const req = {
            defaultPrice: price === null || price === "" ? null : Number(price),
            name: service
        };
        const res = await authFetch(`${API_ROOT}/services`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        });
        if (res.ok) {
            const data: Service = await res.json();
            addService(data)
            return;
        }
        const data: APIError = await res.json();
        setError(data.message);
        console.log(data.message);
    }

    return (<>
        <div className="text-3xl w-full">
            Add a New Service
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2 max-w-[450px]">
            <label className="col-span-4 font-semibold">
                Service Name:
            </label>
            <label className="col-span-3 font-semibold">
                Price (Optional):
            </label>
            <input className="col-span-4 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" 
            type="text" value={service} onChange={e => { setService(e.target.value); }}/>
            <input className="col-span-3 shadow-sm appearance-none border border-[#0000003b] rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-blue-500 focus:shadow-outline hover:border-gray-700" 
            type="number" value={price} onChange={e => { setPrice(e.target.value); }}/>
            <button className="col-span-4 transition duration-100 ease-in-out w-[125px] bg-gray-200 border border-gray-300 
            text-gray-600 hover:bg-blue-600 hover:text-white font-semibold py-1 rounded-md shadow-sm"
            onClick={e => {
                e.preventDefault();
                handleServiceCreate()
            }}>
                Add Service
            </button>
            {/* Error Message */}
            <div className="col-span-3 text-red-500 self-center">{error}</div>
        </div>
    </>);
}

export default ServiceCreationForm;