import React, { useEffect, useState } from "react";
import { API_ROOT } from "../utilities/constants";
import useAuth from "../utilities/hooks/useAuth";
import { APIError, ShopOwner } from "../utilities/interfaces";
import UserInfoPage from '../components/Profile/UserInfoPage';
import EditUserPage from '../components/Profile/EditUserPage';
import ChangePasswordPage from '../components/Profile/ChangePasswordPage';
import ShopInfoPage from '../components/Profile/ShopInfoPage';
import EditShopPage from "../components/Profile/EditShopPage";

const Profile = () => {

    const { auth } = useAuth();
    const [isEditingProfile, setEditingProfile] = useState<boolean>(false)
    const [isChangingPassword, setChangingPassword] = useState<boolean>(false)
    const [isViewingShop, setIsViewingShop] = useState<boolean>(false)
    const [isEditingShop, setIsEditingShop] = useState<boolean>(false)
    // For now, we're giving the user and shop info some mock data as the server calls
    // implementation hasn't been completed as of yet
    const [userInfo, setUserInfo] = useState< {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        phoneNumber: string;
        password: string;
    }>({
        firstName: "Ahsan",
        lastName: "Saeed",
        username: "saeedahsan",
        email: "ahsanm.saeed@mail.utoronto.ca",
        phoneNumber: "123456789",
        password: "password"
    })
    const [shopInfo, setShopInfo] = useState< {
        id: number;
        name: string;
        address: {
            streetNumber: string,
            street: string,
            city: string,
            province: string,
            postalCode: string
        },
        phoneNumber: string,
        email: string;
    }>({
        id: 1,
        name: "My Shop",
        address: {
            streetNumber: "",
            street: "",
            city: "",
            province: "",
            postalCode: ""
        },
        phoneNumber: "987654321",
        email: "myshop@gmail.com"
    })

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(API_ROOT + "/shopOwner", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${auth}`,
                }
            })

            if(res.ok){
                const data: ShopOwner = await res.json();
                console.log(data);
                setUserInfo({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.userName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    password: data.password
                });
                setShopInfo({
                    id: data.shop.id,
                    name: data.shop.shopName,
                    address: data.shop.address,
                    phoneNumber: data.shop.phoneNumber,
                    email: data.shop.email
                });
                return;
            }

            const data: APIError = await res.json();
            console.log(data.message);
        }
        getData();

    }, [auth]);

    const saveUserInfo = (newUserInfo: {firstName: string; lastName: string; username: string; email: string; phoneNumber: string; password: string}) => {
        setEditingProfile(false)
        setChangingPassword(false)
        setUserInfo(newUserInfo)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        }
        let url = 'https://localhost:8080/api/appUsers/' + 'userId' //TODO: Change to live url when possible and figure out how to get user id
      fetch(url, requestOptions)
      .then(response => response.json())
      .then(
        (result) => {
          
        },
        (error) => {
          console.log("Could not update user to database")
          console.log(error)
        }
      )
    }

    const saveShopInfo = (newShopInfo: {id: number, name: string, address: {streetNumber: string, street: string, city: string, province: string, postalCode: string}, email: string; phoneNumber: string;}) => {
        setIsEditingShop(false)
        setShopInfo(newShopInfo)
        const saveShop = async () => {
            const res = await fetch(API_ROOT + "/shop", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth}`
                },
                body: JSON.stringify({
                    newShopInfo
                })
            })

            if (res.ok) {
                setShopInfo(newShopInfo)
                return;
            }

            const data: APIError = await res.json();
            console.log(data.message);
        }

        saveShop();
    }

    return (
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8 pt-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    {!isEditingProfile && !isChangingPassword && !isViewingShop && !isEditingShop ?
                        <UserInfoPage 
                            setChangingPassword={setChangingPassword}
                            setEditingProfile={setEditingProfile}
                            setIsViewingShop={setIsViewingShop}
                            userInfo={userInfo}
                        />
                        : !isChangingPassword && !isViewingShop && !isEditingShop ?
                        <EditUserPage 
                            setEditingProfile={setEditingProfile}
                            userInfo={userInfo}
                            saveUserInfo={saveUserInfo}
                        />
                        : !isViewingShop && !isEditingShop ?
                        <ChangePasswordPage 
                            setChangingPassword={setChangingPassword}
                            userInfo={userInfo}
                            saveUserInfo={saveUserInfo}
                        />
                        : !isEditingShop ?
                        <ShopInfoPage
                            setIsViewingShop={setIsViewingShop}
                            setIsEditingShop={setIsEditingShop}
                            shopInfo={shopInfo}
                        />
                        :
                        <EditShopPage
                            setIsEditingShop={setIsEditingShop}
                            shopInfo={shopInfo}
                            saveShopInfo={saveShopInfo}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;