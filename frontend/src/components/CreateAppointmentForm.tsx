import React, { useState } from "react";
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
    notes: string,
}

//list of all car models
const carModels = {
    "": ["default"],
    "Acura": ["ILX", "MDX", "NSX", "RDX", "RLX", "TLX", "TL", "TSX", "ZDX"],
    "Alfa Romeo": ["4C", "Giulia", "Stelvio"],
    "Aston Martin": ["DB11", "DB9", "DBS", "Rapide", "V12 Vantage", "V8 Vantage", "Vanquish", "Vantage"],
    "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "R8", "RS 3", "RS 5", "RS 7", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "TT", "TTS"],
    "Bentley": ["Arnage", "Azure", "Bentayga", "Brooklands", "Continental", "Continental Flying Spur", "Continental GT", "Continental GTC", "Continental Supersports", "Eight", "Mulsanne", "Turbo R"],
    "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "i3", "i8", "M2", "M3", "M4", "M5", "M6", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z3", "Z4", "Z8"],
    "Bugatti": ["Chiron", "Veyron"],
    "Buick": ["Cascada", "Enclave", "Encore", "Envision", "LaCrosse", "Regal", "Verano"],
    "Cadillac": ["ATS", "CT6", "CTS", "DeVille", "DTS", "ELR", "Escalade", "Escalade ESV", "Escalade EXT", "Fleetwood", "SRX", "STS", "XT5", "XTS"],
    "Chevrolet": ["Aveo", "Bolt EV", "Camaro", "Caprice", "Cavalier", "City Express", "Cobalt", "Cruze", "Cruze Limited", "Equinox", "Express", "HHR", "Impala", "Malibu", "Malibu Limited", "Metro", "Monte Carlo", "Sonic", "Spark", "SS", "Suburban", "Tahoe", "Traverse", "Trax", "Uplander", "Volt"],
    "Chrysler": ["200", "300", "Aspen", "Crossfire", "Pacifica", "Prowler", "Sebring", "Town & Country", "Voyager"],
    "Dodge": ["Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Dakota", "Durango", "Grand Caravan", "Journey", "Magnum", "Neon", "Nitro", "Ram", "Ram 1500", "Ram 2500", "Ram 3500", "Ram 4500", "Ram 5500", "Ram 1500 Classic", "Ram 2500 Classic", "Ram 3500 Classic", "Ram 4500 Classic", "Ram 5500 Classic", "Ram 1500 Limited", "Ram 2500 Limited", "Ram 3500 Limited", "Ram 4500 Limited", "Ram 5500 Limited", "Ram 1500 Rebel", "Ram 2500 Rebel", "Ram 3500 Rebel", "Ram 4500 Rebel", "Ram 5500 Rebel", "Ram 1500 Warlock", "Ram 2500 Warlock", "Ram 3500 Warlock", "Ram 4500 Warlock", "Ram 5500 Warlock", "Ram 1500 Laramie", "Ram 2500 Laramie", "Ram 3500 Laramie", "Ram 4500 Laramie", "Ram 5500 Laramie", "Ram 1500 Laramie Longhorn", "Ram 2500 Laramie Longhorn", "Ram 3500 Laramie Longhorn", "Ram 4500 Laramie Longhorn", "Ram 5500 Laramie Longhorn", "Ram 1500 Laramie Limited", "Ram 2500 Laramie Limited", "Ram 3500 Laramie Limited", "Ram 4500 Laramie Limited", "Ram 5500 Laramie Limited", "Ram 1500 Laramie Limited Tungsten", "Ram 2500 Laramie Limited Tungsten", "Ram 3500 Laramie Limited Tungsten", "Ram 4500 Laramie Limited Tungsten", "Ram 5500 Laramie Limited Tungsten", "Ram 1500 Laramie Limited 10th Anniversary", "Ram 2500 Laramie Limited 10th Anniversary", "Ram 3500 Laramie Limited 10th Anniversary", "Ram 4500 Laramie Limited"],
    "Ferrari": ["488 GTB", "488 Spider", "California T", "F12berlinetta", "F355", "F430", "F50", "FF", "GTC4Lusso", "LaFerrari", "Portofino", "Testarossa"],
    "FIAT": ["124 Spider", "500", "500 Abarth", "500L", "500X", "Abarth", "Abarth 595", "Abarth 595 Competizione", "Abarth 595 Esseesse", "Abarth 595 Turismo", "Abarth 695", "Abarth 695 Biposto", "Abarth 695 Esseesse", "Abarth 695 Rivale", "Abarth 695 Tributo Ferrari", "Abarth 695 Turismo", "Abarth 695 XSR", "Abarth 695 XSR Tributo Ferrari", "Abarth 695 XSR Turismo", "Abarth 695 XSR Competizione", "Abarth 695 XSR Esseesse", "Abarth 695 XSR Rivale", "Abarth 695 XSR Tributo Ferrari", "Abarth 695 XSR Turismo", "Abarth 695 XSR Competizione", "Abarth 695 XSR Esseesse", "Abarth 695 XSR Rivale", "Abarth 695 XSR Tributo Ferrari", "Abarth 695 XSR Turismo", "Abarth 695 XSR Competizione", "Abarth 695 XSR Esseesse", "Abarth 695 XSR Rivale", "Abarth 695 XSR Tributo Ferrari", "Abarth 695 XSR Turismo", "Abarth 695 XSR Competizione", "Abarth 695 XSR Esseesse", "Abarth 695 XSR Rivale", "Abarth 695 XSR Tributo Ferrari", "Abarth 695 XSR Turismo", "Abarth 695 XSR Competizione", "Abarth 695 XSR Esseesse", "Abarth 695 XSR Rivale", "Abarth 695 XSR Tributo Ferrari", "Abarth 695 XSR Turismo", "Abarth 695 XSR Competizione", "Abarth 695 XSR Esseesse", "Abarth 695 XSR Rivale", "Abarth 695 XSR Tributo Ferrari", "Abarth 695 XSR Turismo", "Abarth 695"],
    "Fisker": ["Karma"],
    "Ford": ["Bronco", "Bronco Sport", "C-MAX", "EcoSport", "Edge", "Escape", "Escort", "Excursion", "Expedition", "Expedition MAX", "Explorer", "Explorer Sport Trac", "F-150", "F-250", "F-350", "F-450", "F-550", "F-650", "F-750", "F-150 Raptor", "Fiesta", "Five Hundred", "Flex", "Focus", "Focus Electric", "Focus ST", "Focus RS", "Freestar", "Freestyle", "Fusion", "Fusion Energi", "Fusion Hybrid", "GT", "Mustang", "Mustang Mach-E", "Ranger", "Taurus", "Taurus X", "Thunderbird", "Transit", "Transit Connect", "Transit Connect Wagon", "Transit Courier", "Transit Cutaway"],
    "Genesis": ["G70", "G80", "G90"],
    "GMC": ["Acadia", "Acadia Limited", "Canyon", "Envoy", "Envoy XL", "Envoy XUV", "Jimmy", "Safari", "Savana", "Savana 1500", "Savana 2500", "Savana 3500", "Sierra 1500", "Sierra 2500", "Sierra 3500", "Sierra 1500 Limited", "Sierra 2500 Limited", "Sierra 3500 Limited", "Sierra 1500 Denali", "Sierra 2500 Denali", "Sierra 3500 Denali", "Sierra 1500 AT4"],
    "Honda": ["Accord", "Accord Hybrid", "Accord Plug-In Hybrid", "Civic", "Civic Type R", "Clarity", "Clarity Electric", "Clarity Fuel Cell", "Clarity Plug-In Hybrid", "CR-V", "CR-Z", "Crosstour", "CRX", "Del Sol", "Element", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Prelude", "Ridgeline"],
    "Hyundai": ["Accent", "Azera", "Elantra", "Elantra GT", "Elantra GT N Line", "Elantra N Line", "Elantra Touring", "Genesis", "Genesis Coupe", "Ioniq", "Ioniq Electric", "Ioniq Hybrid", "Ioniq Plug-In Hybrid", "Kona", "Kona Electric", "Kona N Line", "Palisade", "Santa Fe", "Santa Fe XL", "Santa Fe N Line", "Sonata", "Sonata Hybrid", "Sonata Plug-In Hybrid", "Sonata N Line", "Tucson", "Tucson N Line", "Veloster", "Veloster N"],
    "Infiniti": ["EX", "FX", "G", "IPL G", "Q30", "Q50", "Q60", "Q60 Convertible", "Q70", "Q70L", "QX30", "QX50", "QX60", "QX70", "QX80"],
    "Isuzu": ["Ascender", "Axiom", "Hombre", "i-280", "i-290", "i-350", "i-370", "Impulse", "Oasis", "Rodeo", "Rodeo Sport", "Stylus", "Trooper", "VehiCROSS"],
    //all Jaguar cars
    "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XE", "XF", "XJ", "XJ220", "XK", "XK8", "XKR", "XKR-S", "XKSS", "X-Type"],
    "Jeep": ["Cherokee", "Comanche", "Compass", "Grand Cherokee", "Gladiator", "Liberty", "Patriot", "Renegade", "Scrambler", "Wrangler", "Wrangler JK", "Wrangler Unlimited", "Wrangler Unlimited JK"],

    //all Kia cars

}
//append default model to each car in the list
for (let key of Object.keys(carModels)) {
    carModels[key].unshift("Choose a model");
}




const CreateAppointmentForm = () => {
    const initialForm: FormData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        vehicleMake: "Acura",
        vehicleModel: "ILX",
        vehicleYear: "",
        vehicleVIN: "",
        liscensePlate: "",
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
                <select value={formData.vehicleMake} onChange={e => setFormData({...formData, vehicleMake: e.target.value, vehicleModel: carModels[e.target.value[0]]})}>
                    {Object.keys(carModels).map((make) => {
                        return (
                            <option value={make}>{make}</option>
                        )
                    })}
                </select>
            </div>
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
        )

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
                <label>Vehicle Make: </label>
                <div>
                    <CarMakeDropdown />
                </div>
                <label>Vehicle Model: </label>
                <div>
                    <CarModelDropdown />
                </div>
                <label>Vehicle Year: </label>
                <div>
                    <input
                        className="border-2 border-black w-full"
                        type="text"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                    />
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
                <label className="align-top">Additional Notes: </label>
                <div>
                    <textarea
                        className="border-2 border-black w-full h-48 text-start"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        datatype="text"
                    />
                </div>
            </form>
        </div>
    )
}
export default CreateAppointmentForm;
