import React, { useEffect, useState } from "react";
import { API_ROOT } from "../../utilities/constants";
import useAuth from "../../utilities/hooks/useAuth";
import { APIError, ShopOwner } from "../../utilities/interfaces";
import UserInfoPage from '../../components/Profile/UserInfoPage';
import EditUserPage from '../../components/Profile/EditUserPage';
import ChangePasswordPage from '../../components/Profile/ChangePasswordPage';
import ShopInfoPage from '../../components/Profile/ShopInfoPage';
import EditShopPage from "../../components/Profile/EditShopPage";
import { mShop, mShopOwner } from "../../utilities/mockData";
import useAuthFetch from "../../utilities/hooks/useAuthFetch";

const Profile = () => {

    const { auth } = useAuth();
    const { authFetch } = useAuthFetch()
    const [isOldPasswordIncorrect, setIsOldPasswordIncorrect] = useState<boolean>(false)
    const [isEditingProfile, setEditingProfile] = useState<boolean>(false)
    const [isChangingPassword, setChangingPassword] = useState<boolean>(false)
    const [isViewingShop, setIsViewingShop] = useState<boolean>(false)
    const [isEditingShop, setIsEditingShop] = useState<boolean>(false)

    const [userInfo, setUserInfo] = useState< {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        phoneNumber: string;
    }>(mShopOwner)
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
    }>(mShop)

    // Fetch shop owner and shop data from server
    useEffect(() => {
        const getData = async () => {
            const res = await authFetch(API_ROOT + "/shopOwner", {
                method: "GET"
            })

            if(res.ok){
                const data: ShopOwner = await res.json();
                console.log(data);
                setUserInfo({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                });
                setShopInfo({
                    id: data.shop.id,
                    name: data.shop.name,
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

    // Save updated user info to server
    const saveUserInfo = (newUserInfo: {firstName: string; lastName: string; username: string; email: string; phoneNumber: string}) => {
        setEditingProfile(false)
        const saveInfo = async () => {
            const res = await authFetch(API_ROOT + "/shopOwner", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    newUserInfo
                )
            })

            // Only update on frontend if server call was successful
            if (res.ok) {
                setUserInfo(newUserInfo)
                return;
            }

            const data: APIError = await res.json();
            console.log(data.message);
        }

        saveInfo();
    }

    // Save user's new password to server
    const saveUserPassword = (oldPassword: string, newPassword: string) => {
        const savePassword = async () => {
            const res = await authFetch(API_ROOT + "/shopOwner/password", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                })
            })

            // Only update on frontend if server call was successful
            if (res.ok) {
                setUserInfo({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    username: userInfo.username,
                    email: userInfo.email,
                    phoneNumber: userInfo.phoneNumber,
                })
                setChangingPassword(false)
                return;
            }

            if (res.status === 400) {
                setIsOldPasswordIncorrect(true)
                return;
            }

            setChangingPassword(false)

            const data: APIError = await res.json();
            console.log(data.message);
        }

        savePassword();
    }

    // Save updated shop info to server
    const saveShopInfo = (newShopInfo: {id: number, name: string, address: {streetNumber: string, street: string, city: string, province: string, postalCode: string}, email: string; phoneNumber: string;}) => {
        setIsEditingShop(false)
        const saveShop = async () => {
            const res = await authFetch(API_ROOT + "/shop", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    newShopInfo
                )
            })

            // Only update on frontend if server call was successful
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
                            saveUserInfo={saveUserPassword}
                            isOldPasswordIncorrect={isOldPasswordIncorrect}
                            setIsOldPasswordIncorrect={setIsOldPasswordIncorrect}
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