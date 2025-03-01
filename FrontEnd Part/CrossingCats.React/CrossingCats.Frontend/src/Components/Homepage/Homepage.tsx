import './Homepage.css';

import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import { RouterProvider } from 'react-router-dom';
import UserLogin from '../Login-Page/Login-Page';
import router from '../../route';

const Homepage = () => {
    return (
        <>
            <AuthenticatedTemplate>
                <RouterProvider router={router} />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <UserLogin />
            </UnauthenticatedTemplate>
        </>
    );
};

export default Homepage;
