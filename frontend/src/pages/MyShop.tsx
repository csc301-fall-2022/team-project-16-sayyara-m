import React from "react";
import { mShop as shop } from "src/mockData";

const MyShop = () => {
    return (
        <div>
            <div>
                <h1>My Shop</h1>
                <h1>{shop.shopName}</h1>
                <h1>{shop.address.streetNumber + " " + shop.address.street}</h1>
            </div>
            <div>
                <h1>My Appointments</h1>
            </div>
            <div>
                <h1>My Quotes</h1>
            </div>
        </div>
    )
};
export default MyShop;