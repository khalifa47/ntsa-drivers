import { lazy, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Apply from './components/license/Apply';
import Renew from './components/license/Renew';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import Middleware from './middleware';
import { ThemeProvider } from '@mui/material/styles';
import { auth } from './firebase';
import { setUser } from './redux/features/auth/authSlice';
import { toast } from './utils/helpers';
import { PageLoader } from './components/PageLoader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import TestBooking from './pages/TestBooking';
import MyDl from './pages/MyDl';
import { theme } from './theme';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ApplicationForPDL = lazy(() => import('./pages/ApplicationForPDL'));

function App() {
    const dispatch = useDispatch();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (error) toast({ msg: error.message, type: 'danger' });
    }, [user, error]);

    if (loading) return <PageLoader />;
    if (user) dispatch(setUser(user.toJSON()));

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<Middleware.Guest component={<GuestLayout />} />}>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout />} />}>
                    <Route path="/" element={<h1>WELCOME</h1>} />

                    {/* Account Info */}
                    <Route path="/my-dl" element={<MyDl />} />
                    <Route path="/account-management" element={<h1>ACCOUNT MANAGEMENT</h1>} />
                    {/* License */}
                    <Route path="/apply-for-smart-dl" element={<Apply />} />
                    <Route path="/renew-dl" element={<Renew />} />
                    {/* New Drivers */}
                    <Route path="/pdl-application" element={<ApplicationForPDL />} />
                    <Route path="/test-booking" element={<TestBooking />} />
                    <Route path={'*'} element={<h1>WELCOME</h1>} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
