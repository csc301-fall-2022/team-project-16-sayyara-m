import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { API_ROOT } from "../App";
import useAuth from "../utilities/hooks/useAuth";
import { Shop } from "../utilities/interfaces";


const columns: GridColDef[] = [
    { field: 'name', headerName: 'Shop Name', width: 200},
    { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];
  
const generateRows = (text: string) => {
    let rows = []
    rows.push({
        id: 0,
        name: "Uth's Shop",
        address: {
            streetNumber: "123",
            street: "Street Rd",
            city: "Toronto",
            province: "ON",
            postal: "M4T2T1",
        },
        phoneNumber: "+1 647 501 1536",
        email: "uthshop@gmail.com"
    })

    rows.push({
        id: 1,
        name: "My Shop",
        address: {
            streetNumber: "123",
            street: "Avenue Rd",
            city: "Toronto",
            province: "ON",
            postal: "M4T2T1",
        },
        phoneNumber: "+1 416 423 7104",
        email: "myshop@gmail.com"
    })

    rows.push({
        id: 2,
        name: "Ahsan's Shop",
        address: {
            streetNumber: "45",
            street: "Grenoble Dr",
            city: "Toronto",
            province: "ON",
            postal: "M3C1C5",
        },
        phoneNumber: "+1 647 501 1536",
        email: "ahsanshop@gmail.com"
    })

    rows.push({
        id: 3,
        name: "Ball's Shop",
        address: {
            streetNumber: "123",
            street: "Obamna Rd",
            city: "Toronto",
            province: "ON",
            postal: "M4T2T1",
        },
        phoneNumber: "+1 647 766 4732",
        email: "ballshop@gmail.com"
    })

    rows.push({
        id: 4,
        name: "Random Shop",
        address: {
            streetNumber: "123",
            street: "Street Rd",
            city: "Toronto",
            province: "ON",
            postal: "M4T2T1",
        },
        phoneNumber: "+1 647 501 1536",
        email: "randomshop@gmail.com"
    })

    console.log(rows)

    return rows.filter((row) => {
        return row.name.toLowerCase().includes(text.toLowerCase()) || row.phoneNumber.includes(text) || row.email.toLowerCase().includes(text.toLowerCase)
    })
}

const Home = () => {

    const { auth } = useAuth();
    const [shops, setShops] = useState<Shop[]>([])
    const [searchText, setsearchText] = useState<string>('')
    const [showShopInfo, setShowShopInfo] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(API_ROOT + "/shop", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${auth}`,
                }
            })

            if (res.ok) {
                const data: Shop[] = await res.json();
                setShops(data)
            }
        }
        getData();
    })

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
                rows={generateRows(searchText)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={() => setShowShopInfo(true)}

            />

            <Dialog
                open={showShopInfo}
                onClose={() => setShowShopInfo(false)}
            >
                <DialogTitle>Shop Name</DialogTitle>
                <DialogContent>
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Home;