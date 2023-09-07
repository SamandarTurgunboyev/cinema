import { Divider, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import './filter.css'

const Filter = () => {
    const theme = useTheme()
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 200,
                bgcolor: 'primary',
                display: { xs: 'none', sm: 'block' }
            }}
            component="nav" aria-label="mailbox folders">
            <NavLink to='/' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                <ListItem button>
                    <ListItemText primary="Home" />
                </ListItem>
            </NavLink>
            <Divider />
            <ListItem button divider>
                <NavLink to='/movies' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItemText primary="Movies" />
                </NavLink>
            </ListItem>
            <ListItem button>
                <NavLink to='/tv_show' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItemText primary="TV" />
                </NavLink>
            </ListItem>
            <Divider light />
            <ListItem button>
                <NavLink to='/actors' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItemText primary="Actors" />
                </NavLink>
            </ListItem>
            <ListItem button>
                <NavLink to='/search' style={{ textDecoration: "none", color: theme.palette.color.color }}>
                    <ListItemText primary="Search" />
                </NavLink>
            </ListItem>
        </List >
    )
}

export default Filter