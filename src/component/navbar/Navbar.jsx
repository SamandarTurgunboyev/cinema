import { AppBar, Box, CssBaseline, Divider, Drawer, FormControl, FormControlLabel, IconButton, List, ListItem, ListItemButton, ListItemText, NativeSelect, Switch, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import React, { useState } from 'react'
import zona from '../../assets/zonauz.png'
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';
const drawerWidth = 240;
const navItems = ['Home', 'Movies', 'TV Shows', 'Actors', 'Search']
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));


const Navbar = (props) => {
    const { window } = props;
    const theme = useTheme()
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Zona
            </Typography>
            <Divider />
            <List>
                <NavLink to='/' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to='/movies' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={"Movies"} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to='/tv_show' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={"TV"} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to='/actors' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={"Actors"} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to='/search' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={"Search"} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            </List>
        </Box >
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ color: theme.palette.color.color, background: theme.palette.nav.back, display: 'flex', gap: "20px" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ width: "100%", display: { xs: 'none', sm: "flex" }, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            component="div"
                        >
                            Zona
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }} checked={props.checked ? false : true} onClick={props.click} />}
                            />
                        </Typography>
                        <img src={zona} alt="zona icon navbar" style={{ width: '50px', paddingTop: '15px' }} />
                    </Box>
                    <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                        <NativeSelect
                            defaultValue={props.lang}
                            onChange={props.OnLang}
                        >
                            <option value={'en-Us'}>Eng</option>
                            <option value={'ru-Ru'}>Ru</option>
                        </NativeSelect>
                    </FormControl>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}
Navbar.propTypes = {
    window: PropTypes.func,
}

export default Navbar