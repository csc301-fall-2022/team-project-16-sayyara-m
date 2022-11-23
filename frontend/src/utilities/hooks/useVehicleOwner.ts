export const useVehicleOwner = () => {
    const setVehicleOwner = (vehicleOwnerId: string) => {
        localStorage.setItem("vehicleOwner", vehicleOwnerId);
    }
    return {vehicleOwner: localStorage.getItem("vehicleOwner"), setVehicleOwner};
}