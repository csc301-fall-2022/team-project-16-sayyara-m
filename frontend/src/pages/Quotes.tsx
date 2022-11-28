import { DataGrid, GridColDef, GridRowParams, MuiEvent, } from "@mui/x-data-grid";
import React, { useState } from "react";
import QuoteDialog from "src/components/QuoteDialog";
import { useGetAllQuotes } from "src/utilities/hooks/api/useGetAllQuotes";
import { Quote, VehicleOwner } from "src/utilities/interfaces";
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 200},
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'expiryDate', headerName: 'Expiry Time', width: 150 },
    { field: 'serviceType', headerName: 'Service Type', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
  ];

  const generateQuoteRows = (quotes: Quote[]) => {
    let quoteRows = [];

    for(let quote of quotes){
        const vehicleOwner: VehicleOwner = quote.vehicleOwner;
        quoteRows.push({
            id: (quote.id),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            price: quote.price ? `$${quote.price.toFixed(2)}` : "N/A",
            expiryDate: quote.expiryDate.substring(0, 10),
            serviceType: quote.serviceName,
            status: quote.status,
            description: quote.description
        });
    }
    return quoteRows;
}


const Quotes = () => {
    const { quotes, setQuotes } = useGetAllQuotes();
    const [selectedQuoteId, setSelectedQuoteId] = useState(-1);
    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        setSelectedQuoteId(parseInt(`${params.id}`));
    }

    const renderDetailsDialog = () => {
        if(selectedQuoteId === -1){
            return <></>
        }
        const selectedQuote = quotes.find(quote => quote.id === selectedQuoteId);
        if(selectedQuote !== undefined){
            return <QuoteDialog quote={selectedQuote} setQuotes={setQuotes} quoteId={selectedQuoteId} setSelectedQuoteId={setSelectedQuoteId}/>
        }
        return <></>
    }
    return(
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Your Quotes</h1>
            <DataGrid
                className="cursor-pointer"
                rows={generateQuoteRows(quotes)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={handleRowClick}
                disableSelectionOnClick={true}
            />
        {
            // funciton renders the quote dialog
            renderDetailsDialog()
        }
        </div>
    )
}
export default Quotes;