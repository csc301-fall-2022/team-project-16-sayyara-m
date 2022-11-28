import React, { useState } from "react";
import { API_ROOT } from "src/utilities/constants";
import useAuthFetch from "src/utilities/hooks/useAuthFetch";
import { APIError, Service } from "src/utilities/interfaces";
interface ServiceCreationFormProps {
    addService: (service: Service) => void
}
const ServiceCreationForm = (props: ServiceCreationFormProps) => {
    const { addService } = props;
    const [service, setService] = useState<string>("")
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const { authFetch } = useAuthFetch();

    const handleServiceCreate = async() => {
        const req = {
            defaultPrice: price === null || price === "" ? null : Number(price),
            name: service
        }
        const res = await authFetch(`${API_ROOT}/services`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        if(res.ok){
            const data: Service = await res.json();
            addService(data)
            return;
        }
        const data: APIError = await res.json();
        setError(data.message);
        console.log(data.message);
    }

    return (
        <form className="block">
                <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Add a New Service</h3>
                <section className="flex">
                    <div className="pr-2">
                        <label className="">Service:</label>
                        <br />
                        <input
                            className="p-2 mt-3 border-2 rounded box-border"
                            type="text"
                            onChange={(e) => setService(e.target.value)}
                            value={service}
                        />
                    </div>
                    <div>

                        <label>Price: (Optional)</label>
                        <br />
                        <input
                            className="p-2 mt-3 border-2 rounded box-border"
                            type="number"
                            value={price}
                            onChange={e => {
                                console.log(e.target.value)
                                setPrice(e.target.value)}
                            }
                        />
                        <br></br>
                    </div>
                </section>
                {error && <div className="text-red-500">{error}</div>}
                <button
                    className="cursor-pointer bg-blue-700 my-4 p-2.5 rounded text-white text-center "
                    onClick={e => {
                        e.preventDefault();
                        handleServiceCreate()}
                    }
                >
                    Add Service
                </button>
            </form>
    )
}
export default ServiceCreationForm;