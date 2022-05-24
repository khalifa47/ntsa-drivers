import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';
import { Suspense } from 'react';

const MainLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* App Bar */}
            <Header handleDrawerToggle={handleDrawerToggle}/>

            {/* Sidebar */}
            <Sidebar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>

            {/* Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Toolbar/>

                <Suspense fallback={<PageLoader/>}><Outlet/></Suspense>
            </Box>
        </Box>
    );
};

export default MainLayout;