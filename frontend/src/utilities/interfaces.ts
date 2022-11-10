export interface User {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    phoneNumber: string
    email: string,
}

export interface Address {
    id: number,
    street: string,
    streetNumber: string,
    postalCode: string,
    province: string
}

export interface Shop {
    id: number,
    shopName: string,
    address: Address,
    email?: string,
    appointments: Appointment[]
    quotes: Quote[]
}

export interface ShopOwner extends User {
    shop: Shop
}
export interface Vehicle {
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
    id: number,
    vehicleOwner: VehicleOwner,
    // TODO: Change to strings instead of dates
    startDate: Date,
    endDate: Date,
    duration: number
}

export interface Quote {
    vehicleOwner: VehicleOwner,
    price: number,
    expiryTime: string
}