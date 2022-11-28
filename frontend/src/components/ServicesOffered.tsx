import { Service } from "src/utilities/interfaces";
import React from "react";
interface ServicesOfferedProps {
    services: Service[]
}
const ServicesOffered = (props: ServicesOfferedProps) => {
    const { services } = props;
    if(services.length === 0) return <div>No Services Currently Offered</div>
    const generateServices = () => {
        return services.map(service => {
        const price = service.defaultPrice ? `$${service.defaultPrice}` : "N/A (Contact Shop)";
            return (
                <div
                    className="grid grid-cols-1 justify-items-start border-2 bg-slate-200 rounded-lg text-center p-2">
                    <p className="font-semibold">{service.name}</p><p className="text-xs">{price}</p >
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