import "font-awesome/css/font-awesome.min.css";
import "./NavBar.css";

import { Box, Drawer, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface INavBarProps {
}

const NavBar = (props: INavBarProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => setIsDrawerOpen(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                className="change-color"
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box p={2} width='250xp' textAlign='center' role='presentation'>
                    <Typography variant="h6" component='div'>
                        <div className="main-div center">
                            <div>
                                <button className="btn fa fa-trophy" onClick={() => { navigate("leaderboard"); }}> Leaderboard</button>
                            </div>
                            <div>
                                <button className="btn fa fa-sign-in" onClick={() => { navigate("login"); }}> Login Page</button>
                            </div>
                            <div>
                                <button className="btn fa fa-user icon" onClick={() => { navigate("register"); }}> Registration Page</button>
                            </div>
                            <div>
                                <button className="btn fa fa-home" onClick={() => { navigate("home"); }}> Homepage</button>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
};

export default NavBar;