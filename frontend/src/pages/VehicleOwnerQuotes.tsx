import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VehicleOwner } from "../utilities/interfaces";
import { mQuote } from "../utilities/mockData";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 200},
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'expiryTime', headerName: 'Expiry Time', width: 200 },
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
  ];

  const generateQuoteRows = () => {
    let rows = [];
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
    return rows;
}

const VehicleOwnerQuotes = () => {
    let navigate = useNavigate();
    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
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
export default VehicleOwnerQuotes