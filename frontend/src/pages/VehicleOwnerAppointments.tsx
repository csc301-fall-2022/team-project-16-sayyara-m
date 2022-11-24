import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VehicleOwner } from "../utilities/interfaces";
import { mAppointment } from "../utilities/mockData";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 200},
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'startDate', headerName: 'Start Time', width: 100 },
    { field: 'endDate', headerName: 'End Time', width: 100 },
    {
      field: 'Duration',
      headerName: 'Duration',
      width: 90,
    },
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
  ];

const generateApptRows = () => {
    let rows = [];
    const vehicleOwner: VehicleOwner = mAppointment.vehicleOwner;
    for(let i = 0; i < 20; i++){
        rows.push({
            id: (mAppointment.id + i),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            date: new Date(mAppointment.startDate).toISOString().substring(0, 10),
            startDate: new Date(mAppointment.startDate).toLocaleTimeString(),
            endDate: new Date(mAppointment.endDate).toLocaleTimeString(),
            Duration: mAppointment.duration,
            serviceType: "Oil Change"
        });
    }
    return rows;
}

const VehicleOwnerAppointments = () => {
    let navigate = useNavigate();
    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        navigate(`/appointments/${params.id}`);
    }

    return (
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Upcoming Appointments</h1>
            <DataGrid
                rows={generateApptRows()}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={handleRowClick}

            />
        </div>
    )
}
export default VehicleOwnerAppointments