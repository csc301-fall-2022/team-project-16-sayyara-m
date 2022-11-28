import { APIError, Service } from "src/utilities/interfaces";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import useAuthFetch from "src/utilities/hooks/useAuthFetch";
import { API_ROOT } from "src/utilities/constants";
interface ServicesOfferedProps {
    services: Service[],
    deleteService: (id: number) => void
}
const ServicesOffered = (props: ServicesOfferedProps) => {
    const { services, deleteService } = props;
    const { authFetch } = useAuthFetch()
    if(services.length === 0) return <div>No Services Currently Offered</div>

    const handleDelete = async(id: number) => {
        const res = await authFetch(`${API_ROOT}/services/${id}`, {
            method: "DELETE"
        });
        if(res.ok){
            deleteService(id);
            console.log("Deleted service")
        }
        const data: APIError = await res.json();
        console.log(data.message)
    }
    const generateServices = () => {
        return services.map(service => {
        const price = service.defaultPrice ? `$${service.defaultPrice}` : "N/A (Contact Shop)";
            return (
                <div
                    className="grid grid-cols-1 justify-items-start border-2 bg-slate-200 rounded-lg text-center p-2">
                    <div className="flex justify-between w-full">
                        <p className="font-semibold">{service.name}</p>
                        <DeleteIcon onClick={() => handleDelete(service.id)} className="text-red-600 cursor-pointer" fontSize="small"/>
                    </div>
                    <p className="text-xs">{price}</p >
                </div>
            )
        })
    }
    return (
        <div className="inline-grid grid-cols-2 gap-2">
            {generateServices()}
        </div>
    )

}
export default ServicesOffered;