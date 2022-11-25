import React, { useState } from "react";
import { carModels } from "src/utilities/constants";
import { serviceTypes } from "src/utilities/mockData";
interface FormData {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: string,
    vehicleVIN: string,
    liscensePlate: string,
    serviceType: string,
    notes: string,
}

//list of all car models

interface AppointmentFormProps {
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAppointmentForm = ({setVisibility}: AppointmentFormProps) => {
    const initialForm: FormData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        vehicleMake: "Acura",
        vehicleModel: "ILX",
        vehicleYear: "2022",
        vehicleVIN: "",
        liscensePlate: "",
        serviceType: "",
        notes: "",
    }
    const [formData, setFormData] = useState<FormData>(initialForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changing = e.target.name;
        const newFormData: FormData = { ...formData, [changing]: e.target.value };
        setFormData(newFormData);
    }
    console.log(formData.vehicleMake);
    console.log(formData.vehicleModel);
    const CarMakeDropdown = () => {
        // create drop down with all car makes
        return (
            <div>
                <select value={formData.vehicleMake} onChange={e => setFormData({...formData, vehicleMake: e.target.value, vehicleModel: "Choose a Model"})}>
                    {Object.keys(carModels).map((make) => {
                        return (
                            <option value={make}>{make}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
    interface YearDropDownProps {
        start: number,
        currentYear: number
    }
    const YearDropDown = ({start, currentYear}: YearDropDownProps) => {
        let options: JSX.Element[] = [];
        for(let i = start; i <= currentYear; i++){
            options.push(<option key={i} value={i}>{i}</option>)
        };
        return (
            <select value={formData.vehicleYear} onChange={e => setFormData({...formData, vehicleYear: e.target.value})}>
                {options}
            </select>
        )
    }
    const ServiceTypeDropDown = () => {
        const options = serviceTypes.map(service => {
            return (
                <option value={service}>{service}</option>
            )
        })
        return (
            <select value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
                {options}
            </select>
        )
    }
    const CarModelDropdown = () => {
        // create drop down with all car models
        const models: string[] = carModels[formData.vehicleMake];
        const modelOptions = models.map(model => {
            return <option value={model}>{model}</option>
        })
        return (
            <div>
                <select value={formData.vehicleModel} onChange={e => setFormData({...formData, vehicleModel: e.target.value})}>
                    {modelOptions}
                </select>
            </div>
        );
    }

    return (
        <div className="flex justify-center mb-8">
            <form className="grid grid-cols-1 gap-2 w-[400px]">
                <h3 className="text-2xl pt-2 text-blue-800 sm:text-3xl">Create An Appointment</h3>
                <section className="flex">
                    <div className="pr-1">
                        <label>First Name</label>
                        <input
                            name="firstName"
                            className="border-2 border-black w-full"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pl-1">
                        <label>Last Name</label>
                        <input
                            className="border-2 border-black w-full"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </section>
                <label>Email: </label>
                <div>
                    <input
                        className="border-2 border-black w-full"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <label>Phone Number: </label>
                <div>
                    <input
                        className="border-2 border-black w-full"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <section className="flex justify-between">
                    <div>
                        <label>Vehicle Make: </label>
                        <CarMakeDropdown />
                    </div>
                    <div>
                        <label>Vehicle Model: </label>
                        <CarModelDropdown />
                    </div>
                </section>
                <label>Vehicle Year: </label>
                <div>
                    {/* {YearDropDown(1990, 2022)} */}
                    <YearDropDown start={1990} currentYear={2022} />
                </div>
                <label>Vehicle VIN: </label>
                <div>
                    <input
                        className="border-2 border-black w-full"
                        type="text"
                        name="vehicleVIN"
                        value={formData.vehicleVIN}
                        onChange={handleChange}
                    />
                </div>
                <label>License Plate: </label>
                <div>
                    <input
                        className="border-2 border-black w-full"
                        type="text"
                        name="liscensePlate"
                        value={formData.liscensePlate}
                        onChange={handleChange}
                    />
                </div>
                <label className="">Service Type</label>
                <div className="">
                    <ServiceTypeDropDown />
                </div>
                <label className="align-top">Additional Notes: </label>
                <div>
                    <textarea
                        className="border-2 border-black w-full h-48 text-start"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        datatype="text"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => setVisibility(false)}
                        className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100
                        text-black font-semibold py-2 px-4 rounded border border-black">Cancel
                    </button>
                    <button
                        onClick={() => setVisibility(false)}
                        className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100
                        text-black font-semibold py-2 px-4 rounded border border-black">Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
export default CreateAppointmentForm;
