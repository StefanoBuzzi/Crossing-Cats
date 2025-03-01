import './Layout.css'

import Cookies from 'universal-cookie';
import { Outlet } from "react-router-dom";
import SideBar from "../NavBar/SideBar";
import axios from 'axios';
import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';

const Layout = () => {
    const { instance } = useMsal();
    const cookies = new Cookies();

    const handleGetUserData = async () => {
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                scopes: ["api://9032a7e7-5c56-4180-9c5f-89239ffd3a74/access_as_user"]
            });

            const graphToken = await instance.acquireTokenSilent({
                scopes: ["User.Read"]
            })

            const userDataResponse = await axios(
                "https://graph.microsoft.com/v1.0/me",
                {
                    headers: {
                        Authorization: `Bearer ${graphToken.accessToken}`
                    }
                }
            );

            console.log(userDataResponse.data);

            cookies.set("Try_Token", `${tokenResponse.accessToken}`);
        } catch (err) {
            console.log(err);
        }
    };

    const createUser = async () => {
        const getToken = cookies.get("Try_Token");
        //const currentAccount = instance.getActiveAccount();
        const data = {
            userName: "Stefano4",
            email: "stefanobuzzi@gmail.com",
            password: "Stefano04!"
        }
        console.log(getToken);
        try {
            const response = await axios.post("https://localhost:7055/api/User/CreateUser", data, {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                    ContentType: 'application/json'
                }
            })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetUserData();
        createUser();
    }, [instance]);

    return (
        <div className='app'>
            <div className='page-container'>
                <div>
                    <SideBar />
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;