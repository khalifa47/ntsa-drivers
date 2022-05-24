import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/features/auth/authSlice';

const Header = ({ handleDrawerToggle }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const logout = async () => {
        dispatch(signOut());

        navigate('/login');
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            enableColorOnDark
            sx={{
                position: 'fixed',
                maxHeight: '70px',
                borderLeft: 'none',
                background: theme.palette.primary.main
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Box>

                    <Box
                        component="img"
                        src="logo.png"
                        alt="logo"
                        sx={{
                            width: {
                                xs: "70px",
                                md: "100px",
                                lg: "160px"
                            }
                        }}
                    />

                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ display: 'flex' }} component={'caption'}>
                            <Typography component={'caption'} sx={{ display: { xs: 'none', md: 'block' } }}>
                                Hello
                            </Typography>
                            <Typography component={'caption'} sx={{ display: { xs: 'block', md: 'none' } }}>
                                Hi
                            </Typography>
                            <Typography component={'caption'} paddingLeft={.5}>{user.full_name}</Typography>
                        </Typography>

                        <Tooltip title="Logout">
                            <IconButton size={'small'} onClick={handleOpenUserMenu}>
                                <Avatar/>
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
                            <MenuItem onClick={logout}>
                                <ListItemIcon sx={{ color: 'rgb(230, 62, 0)' }}><LogoutIcon/></ListItemIcon>
                                <ListItemText>
                                    <Typography sx={{ mx: 1 }}>Logout</Typography>
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;