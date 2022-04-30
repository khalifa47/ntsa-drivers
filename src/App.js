import React from 'react';
import MainLayout from './layouts/MainLayout';
import Layout from './components/Layout';
import Apply from './components/license/Apply'
import Renew from './components/license/Renew'
import { Routes, Route } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Middleware from './middleware';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: `${['"Varela Round"', 'cursive',].join(',')}!important`,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    padding: 'padding: .3125rem 1rem;!important'
                }
            }
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<Middleware.Guest component={<GuestLayout/>}/>}>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout/>}/>}>
                    <Route path="/" element={<h1>WELCOME</h1>}/>
                    <Route path="/home" element={<h1>TO ARENA</h1>}/>
                </Route>
                {/* Account Info */}
                <Route path="/my-dl" element={<h1>MY DL</h1>}/>
                <Route path="/account-management" element={<h1>ACCOUNT MANAGEMENT</h1>}/>
                {/* License */}
                <Route path="/apply-for-smart-dl" element={<Apply />} />
                <Route path="/renew-dl" element={<Renew />} />
                {/* New Drivers */}
                <Route path="/pdl-application" element={<h1>APPLICATION FOR PDL</h1>}/>
                <Route path="/test-booking" element={<h1>TEST BOOKING</h1>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
