import React, { useState } from "react";
import { API_ROOT } from "src/utilities/constants";
import { APIError, Quote } from "src/utilities/interfaces";
import { ReactComponent as CloseBtnSvg } from "src/resources/svgs/close.svg";
import { useGetQuoteById } from "src/utilities/hooks/api/useGetQuoteById";
import clsx from "clsx";
interface QuoteDialogProps {
    quoteId: number,
    setSelectedQuoteId: React.Dispatch<React.SetStateAction<number>>,
    setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>,
    homePage: boolean
}
const QuoteDialog = (props: QuoteDialogProps) => {
    const { quoteId, setSelectedQuoteId, setQuotes, homePage } = props;
    const { quote } = useGetQuoteById(String(quoteId));
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    if(!quote) return <div>Something Went Wrong</div>
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
        if(Number(price) < 0 || e.target.value === "-"){
            setError("Price must be greater than 0");
            return;
        }
        setError("");
    }

    const handleQuoteSubmit = async() => {
        const priceAsNumber = Number(price);
        if(priceAsNumber < 0 || price === ""){
            setError("Price must be greater than 0");
            return;
        }
        setError("");
        const res = await fetch(`${API_ROOT}/quotes/${quote.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price: priceAsNumber
            })
        })
        if(res.ok){
            const data: Quote = await res.json();
            console.log("Quote price sent to vehicle owner");
            console.log(data);
            setQuotes(prevQuotes => prevQuotes.map(prevQuote => {
                if(prevQuote.id === quoteId){
                    return {...prevQuote, price: priceAsNumber, status: "Pending Approval"}
                }
                return prevQuote;
            }));
            setSelectedQuoteId(-1);
            return;
        }
        const data: APIError = await res.json();
        setError(data.message);
        console.log(data.message);
    }
    return (
        <div>
            {/* main body of popup */}
            <div className="fixed top-0 left-0 h-full w-full bg-black opacity-20 z-10"
            onClick={() => {setSelectedQuoteId(-1)}}/>
            {/* As of now, the vertical positioning is hard-coded due to layout difficulties. In the long term, a more flexible solution should be employed */}
            <div className={`absolute right-1/2 translate-x-1/2 min-w-[340px] max-w-[700px] w-[95%] sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-gray-100
            rounded-md px-6 py-2 border border-gray-400 shadow-lg z-20 mb-6 ` + clsx({'top-[550px] sm:top-[400px]': homePage, 'top-24 sm:top-16': !homePage})}>
                <button className='absolute right-6 top-5' onClick={() => {props.setSelectedQuoteId(-1)}}>
                <CloseBtnSvg className='close-btn-svg'/>
                </button>
                <h3 className="text-xl sm:text-2xl font-semibold text-black mt-2 mr-8 pb-4">Quote From {quote.vehicleOwner.firstName} {quote.vehicleOwner.lastName}</h3>
                    <section className="grid grid-cols-2">
                        <div>
                            <label className="font-semibold">Email</label>
                            <br />
                            <p>{quote.vehicleOwner.email}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Phone Number</label>
                            <br />
                            <p>{quote.vehicleOwner.phoneNumber}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Service Type</label>
                            <br />
                            <p>{quote.serviceName}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Quoted Price</label>
                            <br />
                            <p>{quote.price ? `$${quote.price.toFixed(2)}` : "N/A"}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Status</label>
                            <br />
                            <p>{quote.status}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Description</label>
                            <br />
                            <p>{quote.description}</p>
                        </div>
                    </section>

                    {/* Client Vehicle Info Section */}
                    <br />
                    <section>
                        <h3 className="font-semibold text-xl">Client Vehicle Info</h3>
                        <label className="font-semibold">Registered Owner</label>
                        <br />
                        <p>{quote.vehicleOwner.vehicle.registerdOwner ? quote.vehicleOwner.vehicle.registerdOwner : "Not Provided"}</p>
                        <div className="flex">
                            <div className="w-1/4">
                                <label className="font-semibold">Year</label>
                                <br />
                                <p>{quote.vehicleOwner.vehicle.year}</p>
                            </div>
                            <div className="w-1/4">
                                <label className="font-semibold">Make</label>
                                <br />
                                <p>{quote.vehicleOwner.vehicle.make}</p>
                            </div>
                            <div className="w-1/2">
                                <label className="font-semibold">Model</label>
                                <br />
                                <p>{quote.vehicleOwner.vehicle.model}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="">
                                <label className="font-semibold">VIN</label>
                                <br />
                                <p>{quote.vehicleOwner.vehicle.vin}</p>
                            </div>
                            <div className="">
                                <label className="font-semibold">License Plate Number</label>
                                <br />
                                <p>{quote.vehicleOwner.vehicle.plate}</p>
                            </div>
                        </div>
                    </section>
                    <br />
                    {/* Sending Price back to vehicle owner section */}
                    {quote.status === "Pending Review" &&
                    <section>
                        <label className="font-semibold">Send a Price for this Quote</label>
                        <input
                            value={price}
                            onChange={handleInputChange}
                            type="number"

                            className="w-full border border-gray-300 rounded-md p-2" />
                        <div className="text-sm text-red-600">{error && error}</div>
                        <button
                            disabled={quote.status !== "Pending Review"}
                            className="transition duration-100 ease-in-out bg-blue-500 hover:bg-blue-700 text-white
                            font-semibold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleQuoteSubmit}
                        >
                            Submit Quote
                        </button>
                    </section>
                }
            </div>
        </div>
    )
}
export default QuoteDialog