import React, { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Apply from './components/license/Apply';
import Renew from './components/license/Renew';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Middleware from './middleware';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from './firebase';
import { setUser } from './redux/features/authSlice';
import { toast } from './utils/helpers';
import { PageLoader } from './components/PageLoader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch()
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (error) toast({ msg: error.message, type: 'danger' });
    }, [user, error]);

    if (loading) return <PageLoader/>;
    if(user) dispatch(setUser(user.toJSON()))

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<Middleware.Guest component={<GuestLayout/>}/>}>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout/>}/>}>
                    <Route path="/" element={<h1>WELCOME</h1>}/>

                    {/* Account Info */}
                    <Route path="/my-dl" element={<h1>MY DL</h1>}/>
                    <Route path="/account-management" element={<h1>ACCOUNT MANAGEMENT</h1>}/>
                    {/* License */}
                    <Route path="/apply-for-smart-dl" element={<Apply/>}/>
                    <Route path="/renew-dl" element={<Renew/>}/>
                    {/* New Drivers */}
                    <Route path="/pdl-application" element={<h1>APPLICATION FOR PDL</h1>}/>
                    <Route path="/test-booking" element={<h1>TEST BOOKING</h1>}/>
                    <Route path={'*'} element={<h1>WELCOME</h1>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
