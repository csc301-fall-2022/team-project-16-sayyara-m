import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROOT } from "../utilities/constants";
import { useVehicleOwner } from "../utilities/hooks/useVehicleOwner";
import { APIError, Appointment, VehicleOwner } from "../utilities/interfaces";
import { mAppointment } from "../utilities/mockData";

const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 200},
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'startTime', headerName: 'Start Time', width: 100 },
    { field: 'endTime', headerName: 'End Time', width: 100 },
    {
      field: 'Duration',
      headerName: 'Duration',
      width: 90,
    },
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
  ];

const generateApptRows = (appointments: Appointment[]) => {
    let rows = [];
    let appointmentRows = []
    const vehicleOwner: VehicleOwner = mAppointment.vehicleOwner;
    for(let i = 0; i < 20; i++){
        rows.push({
            id: (mAppointment.id + i),
            firstName: vehicleOwner.firstName,
            lastName: vehicleOwner.lastName,
            date: new Date(mAppointment.startTime).toISOString().substring(0, 10),
            startTime: new Date(mAppointment.startTime).toLocaleTimeString(),
            endTime: new Date(mAppointment.endTime).toLocaleTimeString(),
            Duration: mAppointment.duration,
            serviceType: "Oil Change"
        });
    }
    for (var appointment of appointments) {
        const apptVehicleOwner: VehicleOwner = appointment.vehicleOwner;
        appointmentRows.push({
            id: appointment.id,
            firstName: apptVehicleOwner.firstName,
            lastName: apptVehicleOwner.lastName,
            date: new Date(appointment.startTime).toISOString().substring(0, 10),
            startTime: new Date(appointment.startTime).toLocaleTimeString(),
            endTime: new Date(appointment.endTime).toLocaleTimeString(),
            Duration: appointment.duration,
            serviceType: "Oil Change"
        })
    }
    // Return rows to test with mock data
    return appointmentRows;
}

const VehicleOwnerAppointments = () => {
    let navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const { vehicleOwner, setVehicleOwner } = useVehicleOwner();

    useEffect(() => {
        const getData = async () => {
            // Uncomment the commented lines and comment out the uncommented lines in getData() to fetch appointments 
            // with id's 1, 2, and 3 instead of using the vehicle owner's id from local storage 

            // let ids = [1, 2, 3]
            // let newAppointments: Appointment[] = []

            if (vehicleOwner) {
                const res = await fetch(API_ROOT + "/vehicleOwner/" + vehicleOwner + "/appointments", {
                    method: "GET",
                })
    
                if (res.ok) {
                    const data: Appointment[] = await res.json();
                    setAppointments(data)
                }
    
                else {
                    const data: APIError = await res.json();
                    console.log(data.message);
                }
            }

            // for (var id of ids) {
            //     const res = await fetch(API_ROOT + "/appointments/" + id, {
            //         method: "GET",
            //     })

            //     if (res.ok) {
            //         const data: Appointment = await res.json();
            //         newAppointments.push(data)
            //     }

            //     else {
            //         const data: APIError = await res.json();
            //         console.log(data.message);
            //     }
            // }
            // setAppointments(newAppointments)
        }
        getData(); // Don't comment this out
    }, [])

    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        navigate(`/appointments/${params.id}`);
    }

    return (
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Upcoming Appointments</h1>
            <DataGrid
                rows={generateApptRows(appointments)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={handleRowClick}

            />
        </div>
    )
}
export default VehicleOwnerAppointments