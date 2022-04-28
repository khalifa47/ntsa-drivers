import React, { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';

const GuestLayout = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader/>}>
                <Outlet/>
            </Suspense>
        </div>
    );
};

export default memo(GuestLayout);
