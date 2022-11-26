import { DataGrid, GridColDef, GridRowParams, MuiEvent, } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VehicleOwner } from "src/utilities/interfaces";
import { mQuote as quote } from "src/utilities/mockData";
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 200},
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'expiryTime', headerName: 'Expiry Time', width: 200 },
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
  ];

  const generateQuoteRows = () => {
    let apptRows = [];
    const vehicleOwner: VehicleOwner = quote.vehicleOwner;
    for(let i = 0; i < 20; i++){
        apptRows.push({
            id: (quote.id + i),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            price: `$${quote.price}`,
            expiryTime: new Date(quote.expiryDate).toLocaleString(),
            serviceType: quote.serviceName
        });
    }
    return apptRows;
}


const Quotes = () => {
    let navigate = useNavigate();
    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        console.log("row clicked");
        navigate(`/quotes/${params.id}`);
    }
    return(
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Your Quotes</h1>
            <DataGrid
                rows={generateQuoteRows()}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={handleRowClick}
                disableSelectionOnClick={true}
            />
        </div>
    )
}
export default Quotes;