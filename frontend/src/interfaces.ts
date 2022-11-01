export interface User {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    phoneNumber: string
    email: string,
}

export interface Address {
    addressId: number,
    street: string,
    streetNumber: string,
    postalCode: string,
    province: string
}

export interface Shop {
    shopId: number,
    shopName: string,
    address: Address,
    email?: string,
    appointments: Appointment[]
    quotes: Quote[]
}

export interface ShopOwner extends User {
    shop: Shop
}
interface Vehicle {
    year: number,
    make: string,
    model: string,
    vin: string,
    plate: string
}

export interface VehicleOwner extends User {
    vehicle: Vehicle
}

export interface Appointment {
    appointmentId: string,
    vehicleOwner: VehicleOwner,
    startTime: Date,
    endTime: Date,
    day: string,
    duration: number
}

export interface Quote {
    vehicleOwner: VehicleOwner,
    price: number,
    expiryTime: string
}