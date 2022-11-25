import { ShopOwner, Shop, Address, Appointment, VehicleOwner, Quote } from "./interfaces";
export const mVehicleOwner: VehicleOwner = {
    id: 2,
    firstName: "Hamoon",
    lastName: "Zamiri",
    username: "hamoon",
    phoneNumber: "747-223-1190",
    email: "hz@gmail.com",
    vehicle: {
        year: 2002,
        make: "Toyota",
        model: "Camry",
        vin: "2313123",
        plate: "bxmt 293"
    }
}
export const mAppointment: Appointment = {
    id: 1,
    vehicleOwner: mVehicleOwner,
    startTime: "2022-11-15T15:45:00",
    endTime: "2022-11-15T15:45:00",
    duration: 100
}
export const mQuote: Quote = {
    id: 1,
    vehicleOwner: mVehicleOwner,
    price: 120.00,
    expiryTime: "2020-12-12",
    serviceType: "Oil Change",
    status: "Accepted"
}
const generateAppointments = () => {
    let appointments: Appointment[] = [];
    for(let i = 0; i < 20; i++){
        appointments.push(mAppointment);
    }
    return appointments;
}
const genereateQuotes = () => {
    let quotes: Quote[] = [];
    for(let i = 0; i < 20; i++){
        quotes.push(mQuote);
    }
    return quotes;
}
export const mAddress: Address = {
    id: 1,
    street: "Daemon Blvd",
    streetNumber: "123",
    postalCode: "M4B192",
    province: "ON",
    city: "Toronto"
}
export const mShop: Shop = {
    id: 1,
    name: "Uths Garage",
    address: mAddress,
    phoneNumber: "+1 416 445 9898",
    email: "123uth@gmail.com",
    appointments: generateAppointments(),
    quotes: genereateQuotes()
}
export const mShopOwner: ShopOwner = {
    id: 1,
    firstName: "Uthman",
    lastName: "Mohammed",
    username: "123Uth",
    phoneNumber: "+1 416 445 9898",
    email: "123uth@gmail.com",
    shop: mShop
}

export const serviceTypes = ["Oil Change", "Tire Rotation", "Wiper Replacement", "Exterior Repair",
    "Interior Repair", "Engine Repair", "Transmission Repair", "Brake Repair", "Suspension Repair",
    "Electrical Repair", "Other"];