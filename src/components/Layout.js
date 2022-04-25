import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* App Bar */}
            <Header handleDrawerToggle={handleDrawerToggle} />

            {/* Sidebar */}
            <Sidebar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />

            {/* Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default Layout;