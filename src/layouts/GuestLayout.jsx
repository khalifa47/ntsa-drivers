import React, { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';
import { useTheme } from '@mui/material/styles';

const GuestLayout = () => {
    const theme = useTheme();

    return (
        <div style={{ backgroundColor: theme.palette.primary.main }}>
            <Suspense fallback={<PageLoader/>}>
                <Outlet/>
            </Suspense>
        </div>
    );
};

export default memo(GuestLayout);
