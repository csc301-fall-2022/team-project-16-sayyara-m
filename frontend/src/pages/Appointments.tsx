import React, {useState}  from "react";
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import { Appointment, VehicleOwner } from "src/utilities/interfaces";
import { useGetAllAppointments } from "src/utilities/hooks/api/useGetAllAppointments";
import AppointmentDialog from "src/components/AppointmentDialog/AppointmentDialog";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 200},
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'startTime', headerName: 'Start Time', width: 150 },
    { field: 'endTime', headerName: 'End Time', width: 150 },
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

const generateApptRows = (appointments: Appointment[]) => {
    let apptRows = [];
    for(let appt of appointments){
        const vehicleOwner: VehicleOwner = appt.vehicleOwner;
        apptRows.push({
            id: (appt.id),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            date: new Date(appt.startTime).toISOString().substring(0, 10),
            startTime: new Date(appt.startTime).toLocaleTimeString(),
            endTime: new Date(appt.endTime).toLocaleTimeString(),
            serviceType: appt.serviceName
        });
    }
    return apptRows;
}
const Appointments = () => {
    const { appointments } = useGetAllAppointments();

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
                rows={generateApptRows(appointments)}
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