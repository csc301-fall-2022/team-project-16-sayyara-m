export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string
    email: string,
}

export interface Address {
    id: number,
    street: string,
    streetNumber: string,
    city: string,
    postalCode: string,
    province: string
}

export interface Shop {
    id: number,
    name: string,
    address: Address,
    email: string,
    phoneNumber: string,
    appointments: Appointment[]
    quotes: Quote[],
    services: Service[]
}

export interface ShopOwner extends User {
    shop: Shop
}
export interface Vehicle {
    year: number,
    make: string,
    model: string,
    vin: string,
    plate: string,
    registerdOwner?: string
}

export interface VehicleOwner extends User {
    vehicle: Vehicle
}

export interface Appointment {
    id: number,
    shopId: number,
    vehicleOwner: VehicleOwner,
    quote?: Quote,
    startTime: string,
    endTime: string,
    duration?: number,
    wasQuote: boolean,
    shopInfo: ShopInfo,
    serviceName: string,
    price: number
}
export interface Service {
    id: number,
    name: string,
    defaultPrice: number | null,
}
export interface Quote {
    id: number,
    shopId: number,
    vehicleOwner: VehicleOwner,
    price: number,
    expiryDate: string,
    serviceName: string,
    status: "Pending Review" | "Pending Approval" | "Accepted" | "Rejected" | "Expired",
    shopInfo: ShopInfo,
    description: string
}

export interface APIError {
    message: string
}

export interface ShopInfo {
    shopId: number,
    name: string,
    address: Address,
    email: string,
    phoneNumber: string
  }