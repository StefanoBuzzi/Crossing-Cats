import './SideBar.css';

import MuiAppBar, { AppBarTypeMap } from '@mui/material/AppBar';
import { Theme, styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import ArticleIcon from '@mui/icons-material/Article';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CssBaseline from '@mui/material/CssBaseline';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
})) as OverridableComponent<AppBarTypeMap<{ open: boolean }>>;

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }: any) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const SideBar = () => {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    const { instance } = useMsal();

    const logOut = () => {
        instance.logout();
    };
    
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if(currentAccount){
            setUsername(currentAccount.name ?? "");
        }
    }, [instance]);
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open} style={{ background: 'linear-gradient(to right, black, rgb(28, 116, 110)' }}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                            color: 'rgb(0, 255, 238)',
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{
                            fontFamily: 'Custom1',
                            color: 'rgb(0, 255, 238)',
                            ...(open && { display: 'none'}), 
                        }}>
                        <div
                            className='leftTitleStyle'
                            onClick={() => {
                                navigate('home');
                            }}>
                            CROSSING CATS
                        </div>
                    </Typography>
                    <div className='tooltip center user-btn other'>
                            <p onClick={() => logOut()} className='user-text'>
                                Welcome <br></br> {username}
                                <span className='tooltiptext'>Exit</span>
                            </p>
                        </div>
                </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={open} className='change-color'>
                <DrawerHeader>
                    <IconButton
                        onClick={handleDrawerClose}
                        sx={{
                            color: 'rgb(0, 255, 238)',
                        }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                padding: 0,
                            }}
                            onClick={() => {
                                navigate('home');
                            }}>
                            <ListItemIcon
                                sx={{
                                    color: 'rgb(0, 255, 238)',
                                }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontFamily: 'Custom2',
                                        color: 'rgb(0, 255, 238)',
                                    }}>
                                    Home
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                padding: 0,
                            }}
                            onClick={() => {
                                navigate('leaderboard');
                            }}>
                            <ListItemIcon
                                sx={{
                                    color: 'rgb(0, 255, 238)',
                                }}>
                                <EqualizerRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontFamily: 'Custom2',
                                        color: 'rgb(0, 255, 238)',
                                    }}>
                                    Top 10 scores
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                padding: 0,
                            }}
                            onClick={() => {
                                navigate('ruleset');
                            }}>
                            <ListItemIcon
                                sx={{
                                    color: 'rgb(0, 255, 238)',
                                }}>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontFamily: 'Custom2',
                                        color: 'rgb(0, 255, 238)',
                                    }}>
                                    Ruleset
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default SideBar;