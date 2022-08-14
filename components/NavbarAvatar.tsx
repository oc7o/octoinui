import * as React from 'react';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { useAuthContext } from '../auth/AuthContext';

export default function NavbarAvatar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const { state, dispatch } = useAuthContext();

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const logout = () => {
        handleCloseUserMenu();
        dispatch({ type: 'logout' });
    }

    return <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
        </Tooltip>
        <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        >
            {
                state.loggedIn &&
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
            }
            {
                state.loggedIn &&
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
            }
            {
                state.loggedIn &&
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Settings</Typography>
                    </MenuItem>
            }
            {
                state.loggedIn &&
                    <MenuItem onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
            }
        </Menu>
    </Box>
}