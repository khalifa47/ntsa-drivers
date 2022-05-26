import React, { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar, Grid, Toolbar } from '@mui/material';

const GuestLayout = () => {
    const theme = useTheme();

    return (
        <div style={{ backgroundColor: theme.palette.primary.main }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: '#fff', height: { lg: '5rem' }, mt: 5 }}>
                    <Toolbar variant="dense"
                             sx={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center" }}>
                        <Box component="img" src="logo-full.png" alt="logo" sx={{
                            width: {
                                xs: "12.5rem",
                                md: "15rem",
                                lg: "20rem"
                            }
                        }}/>
                    </Toolbar>
                </AppBar>
            </Box>
            <Suspense fallback={<PageLoader/>}>
                <Box sx={{ px: 2 }}><Outlet/></Box>
            </Suspense>
        </div>
    );
};

export default memo(GuestLayout);
