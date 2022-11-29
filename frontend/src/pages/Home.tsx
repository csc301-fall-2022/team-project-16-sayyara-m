import { TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { API_ROOT } from "../utilities/constants";
import { APIError, Shop } from "../utilities/interfaces";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../utilities/hooks/useAuthFetch";


const columns: GridColDef[] = [
    { field: 'name', headerName: 'Shop Name', width: 200},
    { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 200, valueGetter(params) {
        return (params.row.address.streetNumber + ' ' + params.row.address.street)
    } },
    { field: 'city', headerName: 'City', width: 200, valueGetter(params) {
        return params.row.address.city
    } },
    { field: 'province', headerName: 'Province', width: 200, valueGetter(params) {
        return params.row.address.province
    } },
    { field: 'postalCode', headerName: 'Postal Code', width: 200, valueGetter(params) {
        return params.row.address.postalCode
    } }
  ];

const generateRows = (text: string, shops: Shop[]) => {
//     let rows: Shop[] = []
//     rows.push({
//         id: 0,
//         name: "Uth's Shop",
//         address: {
//             id: 0,
//             streetNumber: "123",
//             street: "Street Rd",
//             city: "Toronto",
//             province: "ON",
//             postalCode: "M4T2T1",
//         },
//         phoneNumber: "+1 647 501 1536",
//         email: "uthshop@gmail.com",
//         appointments: [],
//         quotes: []
//     })

//     rows.push({
//         id: 1,
//         name: "My Shop",
//         address: {
//             id: 1,
//             streetNumber: "123",
//             street: "Avenue Rd",
//             city: "Toronto",
//             province: "ON",
//             postalCode: "M4T2T1",
//         },
//         phoneNumber: "+1 416 423 7104",
//         email: "myshop@gmail.com",
//         appointments: [],
//         quotes: []
//     })

//     rows.push({
//         id: 2,
//         name: "Ahsan's Shop",
//         address: {
//             id: 2,
//             streetNumber: "45",
//             street: "Grenoble Dr",
//             city: "Toronto",
//             province: "ON",
//             postalCode: "M3C1C5",
//         },
//         phoneNumber: "+1 647 501 1536",
//         email: "ahsanshop@gmail.com",
//         appointments: [],
//         quotes: []
//     })

//     rows.push({
//         id: 3,
//         name: "Some Shop",
//         address: {
//             id: 3,
//             streetNumber: "123",
//             street: "Some Rd",
//             city: "Toronto",
//             province: "ON",
//             postalCode: "M4T2T1",
//         },
//         phoneNumber: "+1 647 766 4732",
//         email: "someshop@gmail.com",
//         appointments: [],
//         quotes: []
//     })

//     rows.push({
//         id: 4,
//         name: "Random Shop",
//         address: {
//             id: 4,
//             streetNumber: "123",
//             street: "Street Rd",
//             city: "Toronto",
//             province: "ON",
//             postalCode: "M4T2T1",
//         },
//         phoneNumber: "+1 647 501 1536",
//         email: "randomshop@gmail.com",
//         appointments: [],
//         quotes: []
//     })

    // return rows.filter()... in order to test with the mock data above

    return shops.filter((row) => {
        return row.name.toLowerCase().includes(text.toLowerCase()) || row.phoneNumber.includes(text) ||
        row.email.toLowerCase().includes(text.toLowerCase()) || (row.address.streetNumber + ' ' + row.address.street).toLowerCase().includes(text.toLowerCase()) ||
        row.address.city.toLowerCase().includes(text.toLowerCase()) || row.address.province.toLowerCase().includes(text.toLowerCase()) ||
        row.address.postalCode.toLowerCase().includes(text.toLowerCase())
    })
}

const Home = () => {

    let navigate = useNavigate();
    const { authFetch } = useAuthFetch()
    const [shops, setShops] = useState<Shop[]>([])
    const [searchText, setsearchText] = useState<string>('')

    useEffect(() => {
        const getData = async () => {
            const res = await authFetch(API_ROOT + "/shops", {
                method: "GET",
            })

            if (res.ok) {
                const data: Shop[] = await res.json();
                setShops(data)
                return;
            }

            const data: APIError = await res.json();
            console.log(data.message);
        }
        getData();
    }, [])

    const openShopInfo = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
        navigate(`/shop/${params.id}`);
    }

    // replace with some kind of spinning wheel
    if(shops.length === 0) return <div>Loading...</div>
    return (
        <div className="h-[650px] w-full">
            <h1 className="flex justify-center font-semibold text-blue-500 sm:text-3xl py-4">Shops</h1>
            <TextField
            id="searchField"
            style={{margin: "10px"}}
            variant="outlined"
            label="Search"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
            />
            <DataGrid
                getRowClassName={() => "cursor-pointer"}
                rows={generateRows(searchText, shops)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={openShopInfo}

            />
        </div>
    )
}

export default Home;