import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import { mAppointment as appt } from "src/utilities/mockData";
import { VehicleOwner } from "src/utilities/interfaces";
import AppointmentDialog from "src/components/AppointmentDialog/AppointmentDialog";
// import { useNavigate } from "react-router-dom";
// import useAuthFetch from "src/utilities/hooks/useAuthFetch";
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
            date: new Date(appt.startDate).toISOString().substring(0, 10),
            startDate: new Date(appt.startDate).toLocaleTimeString(),
            endDate: new Date(appt.endDate).toLocaleTimeString(),
            Duration: appt.duration,
            serviceType: "Oil Change"
        });
    }
    return apptRows;
}
const Appointments = () => {
    
    // This is the state for managing the expanded details dialog. Empty string means no dialog is rendered.
    // Otherwise, the string is set to the ID of the expanded appointment
    const [selectedAptId, setSelectedAptId] = useState<string>("");
    
    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        setSelectedAptId(`${params.id}`);
    }

    const renderDetailsDialog = () => {
        // Render nothing if no appointment is currently selected
        if (selectedAptId === "")
            return(<></>);
        
        // Render the details dialog component with the selected appointment ID
        return(<AppointmentDialog id={selectedAptId} setSelectedAptId={setSelectedAptId}/>);
    }

    return (
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-900 sm:text-3xl py-4">Upcoming Appointments</h1>
            <DataGrid
                rows={generateApptRows()}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={handleRowClick}
            />
            {renderDetailsDialog()}
        </div>
    )
}

export default Appointments