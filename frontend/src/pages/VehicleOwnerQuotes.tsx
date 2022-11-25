import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROOT } from "../utilities/constants";
import useAuthFetch from "../utilities/hooks/useAuthFetch";
import { APIError, Quote, VehicleOwner } from "../utilities/interfaces";
import { mQuote } from "../utilities/mockData";

const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 200},
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'expiryTime', headerName: 'Expiry Time', width: 200 },
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
  ];

  const generateQuoteRows = (quotes: Quote[]) => {
    let rows = [];
    let quoteRows = []
    const vehicleOwner: VehicleOwner = mQuote.vehicleOwner;
    for(let i = 0; i < 20; i++){
        rows.push({
            id: (mQuote.id + i),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            price: `$${mQuote.price}`,
            expiryTime: new Date(mQuote.expiryTime).toLocaleString(),
            serviceType: mQuote.serviceType
        });
    }
    for (var quote of quotes) {
        const quoteVehicleOwner: VehicleOwner = quote.vehicleOwner;
        quoteRows.push({
            id: quote.id,
            firstName: quoteVehicleOwner.firstName,
            lastName: quoteVehicleOwner.lastName,
            price: `$${quote.price}`,
            expiryTime: new Date(quote.expiryTime).toLocaleString(),
            serviceType: quote.service.name
        })
    }
    // Return rows to test with mock data
    return quoteRows;
}

const VehicleOwnerQuotes = () => {
    let navigate = useNavigate();
    const { authFetch } = useAuthFetch()
    const [quotes, setQuotes] = useState<Quote[]>([])

    useEffect(() => {
        const getData = async () => {
            let ids = [1, 2, 3]
            let newQuotes: Quote[] = []
            for (var id of ids) {
                console.log(API_ROOT + "/quotes/" + id)
                const res = await authFetch(API_ROOT + "/quotes/" + id, {
                    method: "GET",
                })
    
                if (res.ok) {
                    const data: Quote = await res.json();
                    console.log(data)
                    newQuotes.push(data) 
    
                }
    
                else {
                    const data: APIError = await res.json();
                    console.log(data.message);
                }
            }
            setQuotes(newQuotes)
        }
        getData();
    }, [])

    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        navigate(`/quotes/${params.id}`);
    }

    return(
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Your Quotes</h1>
            <DataGrid
                rows={generateQuoteRows(quotes)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={handleRowClick}
                disableSelectionOnClick={true}
            />
        </div>
    )
}
export default VehicleOwnerQuotes