import { APIError, Service } from "src/utilities/interfaces";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import useAuthFetch from "src/utilities/hooks/useAuthFetch";
import { API_ROOT } from "src/utilities/constants";
interface ServicesOfferedProps {
    services: Service[],
    deleteService?: (id: number) => void
}
const ServicesOffered = (props: ServicesOfferedProps) => {
    const { services, deleteService } = props;
    const { authFetch } = useAuthFetch()
    if(services.length === 0) return <div>No Services Currently Offered</div>

    const handleDelete = async(id: number) => {
        if(deleteService === undefined) return;
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
        const price = service.defaultPrice ? `$${service.defaultPrice}` : "N/A (Request a Quote)";
            return (
                <div className="grid grid-cols-1 justify-items-start border border-gray-300 shadow-md bg-gray-50 rounded-lg text-center p-2">
                    <div className="flex justify-between w-full">
                        <p className="font-semibold text-left text-blue-900">{service.name}</p>
                        {deleteService ? <DeleteIcon onClick={() => {handleDelete(service.id)}} className="transition ease-in-out duration-300 text-gray-300 hover:text-red-500 cursor-pointer" fontSize="small"/> : null}
                    </div>
                    <p className="text-sm self-end">{price}</p >
                </div>
            )
        })
    }
    return (
        <div className="w-full inline-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {generateServices()}
        </div>
    )

}
export default ServicesOffered;