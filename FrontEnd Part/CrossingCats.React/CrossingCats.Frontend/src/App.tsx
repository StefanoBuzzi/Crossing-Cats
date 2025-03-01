import './App.css';

import Game from './Components/Game/Game';
import Homepage from './Components/Homepage/Homepage';
import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ThemeProvider } from "styled-components";

type AppProps = {
    pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
    return (
        <div className="App">
            <MsalProvider instance={pca}>
                <ThemeProvider theme={{ color: "mediumseagreen" }}>
                    <Homepage />
                </ThemeProvider>
            </MsalProvider>
        </div>
    );
}

export default App;