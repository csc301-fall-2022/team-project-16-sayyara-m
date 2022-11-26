// this is the useVehicleOwner createHook
// when you are creating a quote or an appointment if you have a vehicleId you can use this hook to get the vehicle owner
// if you do not you should call setVehicleOwner with the id you get back from the api call
// example usage:
//     const { vehicleOwner, setVehicleOwner } = useVehicleOwner();
//     setVehicleOwner("1234");
//     vehicleOwner should return "1234" now

export const useVehicleOwner = () => {
    const setVehicleOwner = (vehicleOwnerId: string) => {
        localStorage.setItem("vehicleOwner", vehicleOwnerId);
    }
    return {vehicleOwner: localStorage.getItem("vehicleOwner"), setVehicleOwner};
}