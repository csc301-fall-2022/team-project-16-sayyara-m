import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { mAppointment as appt } from "src/utilities/mockData";
import { VehicleOwner } from "src/utilities/interfaces";
import { Navigate } from "react-router-dom";
//plan is to use MUI to create a detailed data table of all the appointments for this user

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
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

const generateApptRows = () => {
    let apptRows = [];
    const vehicleOwner: VehicleOwner = appt.vehicleOwner;
    for(let i = 0; i < 20; i++){
        apptRows.push({
            id: (appt.id + i),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            date: appt.startDate,
            startDate: appt.startDate,
            endDate: appt.endDate,
            Duration: appt.duration,
            serviceType: "Oil Change"
        });
    }
    return apptRows;
}
const Appointments = () => {

    return (
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Upcoming Appointments</h1>
            <DataGrid
                rows={generateApptRows()}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={(params) => <Navigate to={`/appointments/${params.id}`} />}

            />
        </div>
    )
}

export default Appointments