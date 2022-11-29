import React from "react";
import { Appointment, Vehicle, VehicleOwner } from "src/utilities/interfaces";
interface AppointmentCardProps {
    ap: Appointment,
    setSelectedAptId: React.Dispatch<React.SetStateAction<string>>
}
const AppointmentCard = ({ ap, setSelectedAptId }: AppointmentCardProps) => {
    const vehicleOwner: VehicleOwner = ap.vehicleOwner;
    const vehicle: Vehicle = vehicleOwner.vehicle;

    return (
        <div className="cursor-pointer hover:bg-blue-200 bg-blue-100 text-sm border-solid border-inherit border-4 rounded-md w-full px-3 mx-1 sm:text-xl"
            onClick={() => { setSelectedAptId(`${ap.id}`) }}>
            <h1 className="text-xl sm:text-2xl"><strong>{vehicleOwner.firstName} {vehicleOwner.lastName}</strong></h1>
            <p className="whitespace-nowrap">{vehicle.make} {vehicle.model}</p>
            <p className="whitespace-nowrap">{(ap.startTime + "Z").substring(0, 10)}</p>
            <p className="whitespace-nowrap">{new Date(ap.startTime + "Z").toLocaleTimeString()}-{new Date(ap.endTime + "Z").toLocaleTimeString()}</p>
            <p>{ap.quote?.serviceName}</p>
        </div>
    )
}
export default AppointmentCard;