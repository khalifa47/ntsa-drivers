import { lazy } from 'react';
import MainLayout from './layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import Middleware from './middleware';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

const Home = lazy(() => import('./pages/Home'));
const MyDl = lazy(() => import('./pages/MyDl'));
const TestBooking = lazy(() => import('./pages/TestBooking'));
const ApplicationForDL = lazy(() => import('./pages/ApplicationForDL'));
const Renewal = lazy(() => import('./pages/Renewal'));

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<Middleware.Guest component={<GuestLayout />} />}>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout />} />}>
                    <Route path="/" element={<Home />} />

                    {/* Account Info */}
                    <Route path="/my-dl" element={<MyDl />} />
                    <Route path="/account-management" element={<h1>ACCOUNT MANAGEMENT</h1>} />
                    {/* License */}
                    <Route path="/smart-dl-application" element={<ApplicationForDL type='smart' />} />
                    <Route path="/renew-dl" element={<Renewal />} />
                    {/* New Drivers */}
                    <Route path="/pdl-application" element={<ApplicationForDL type='pdl' />} />
                    <Route path="/test-booking" element={<TestBooking />} />
                    <Route path={'*'} element={<h1>WELCOME</h1>} />
                </Route>
            </Routes>

            <Grid component={'footer'} container spacing={2} position={'fixed'} justifyContent={'center'} bottom={0}>
                <Grid item textAlign={'center'} paddingY={1}>
                    <Box component="img" src="footerLogo.png" alt="logo" sx={{
                        width: {
                            xs: "10rem",
                            md: "15rem",
                            lg: "20rem"
                        }
                    }} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
