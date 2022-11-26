import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import VehicleOwnerQuoteDialog from "../components/VehicleOwnerQuoteDialog/VehicleOwnerQuoteDialog";
import { API_ROOT } from "../utilities/constants";
import { APIError, Quote, VehicleOwner } from "../utilities/interfaces";
import { mQuote } from "../utilities/mockData";

const columns: GridColDef[] = [
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'expiryTime', headerName: 'Expiry Time', width: 200 },
    { field: 'shopName', headerName: 'Shop Name', width: 200, valueGetter(params) {
        return (params.row.shopInfo.name)
    } },
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
            expiryTime: new Date(mQuote.expiryDate).toLocaleString(),
            service: {id: 1, name: "Oil Change", defaultPrice: 120.00}
        });
    }
    for (var quote of quotes) {
        const quoteVehicleOwner: VehicleOwner = quote.vehicleOwner;
        quoteRows.push({
            id: quote.id,
            firstName: quoteVehicleOwner.firstName,
            lastName: quoteVehicleOwner.lastName,
            price: quote.price ? `$${quote.price}` : 'N/A',
            expiryTime: new Date(quote.expiryDate).toLocaleString(),
            serviceType: quote.serviceName,
            shopInfo: quote.shopInfo,
            status: quote.status
        })
    }
    // Return rows to test with mock data
    return quoteRows;
}

const VehicleOwnerQuotes = () => {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [selectedQuoteId, setSelectedQuoteId] = useState<number>(-1);

    useEffect(() => {
        const getData = async () => {
            let ids = [1, 2, 3]
            let newQuotes: Quote[] = []
            for (var id of ids) {
                console.log(API_ROOT + "/quotes/" + id)
                const res = await fetch(API_ROOT + "/quotes/" + id, {
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
        setSelectedQuoteId(parseInt(`${params.id}`));
    }

    const renderDetailsDialog = () => {
        // Render nothing if no quote is currently selected
        if (selectedQuoteId === -1)
            return(<></>);

        // Render the details dialog component with the selected quote
        let selectedQuote = quotes.find(quote => quote.id === selectedQuoteId)
        if (selectedQuote !== undefined) {
            return(<VehicleOwnerQuoteDialog quote={selectedQuote} setSelectedQuoteId={setSelectedQuoteId}/>);
        }
        return(<></>);
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
            {renderDetailsDialog()}
        </div>
    )
}
export default VehicleOwnerQuotes