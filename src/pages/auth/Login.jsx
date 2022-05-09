import { Grid, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { lazy, useState } from 'react';
import { toast } from '../../utils/helpers';
import { login } from '../../redux/features/auth/authAPI';
import { useTheme } from '@mui/material/styles';

const Avatar = lazy(() => import('@mui/material/Avatar'));
const LoadingButton = lazy(() => import('@mui/lab/LoadingButton'));
const LockOutlined = lazy(() => import('@mui/icons-material/LockOutlined'));
const LoginSharp = lazy(() => import('@mui/icons-material/LoginSharp'));

const validationSchema = yup.object({
    national_id: yup.number().required('National ID is required.'),
    password: yup.string().max(20).required('Password is required.')
});

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { national_id: "", password: "" },
        validationSchema: validationSchema,
        onSubmit: async values => {
            setLoading(true);

            try {
                await login(values);

                navigate('/');
            } catch (err) {
                console.error(err);
                toast({ msg: err.message });

                setLoading(false);
            }
        }
    });

    return (
        <Grid container alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <Grid item xs={12} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={1} padding={3} borderRadius={'1rem'}>
                <Grid container spacing={2} component={'form'}>
                    <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Avatar style={{backgroundColor:theme.palette.primary.main}}><LockOutlined fontSize={'small'}/></Avatar>
                        <h4 style={{ paddingLeft: '1rem' }}>SIGN IN</h4>
                    </Grid>
                    <Grid item xs={12} textAlign={'center'} marginTop={'.5rem'}><hr/></Grid>
                    <Grid item xs={12}>
                        <TextField size={'small'} type={'number'} name={'national_id'} label="National ID" fullWidth
                                   required placeholder={'National ID'} value={formik.values.national_id}
                                   error={formik.touched.national_id && Boolean(formik.errors.national_id)}
                                   helperText={formik.touched.national_id && formik.errors.national_id}
                                   onChange={formik.handleChange} variant={'standard'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type={'password'} size={'small'} name={'password'} label="Password" fullWidth
                                   required placeholder={'Password'} value={formik.values.password}
                                   error={formik.touched.password && Boolean(formik.errors.password)}
                                   helperText={formik.touched.password && formik.errors.password}
                                   onChange={formik.handleChange} variant={'standard'}/>
                    </Grid>
                    <div id={'recaptcha-container'}/>
                    <Grid item xs={12} textAlign={'center'} marginTop={'1rem'}>
                        <LoadingButton fullWidth size="small" color="primary" loading={loading} type={'submit'}
                                       loadingPosition="end" onClick={() => formik.submitForm()}
                                       endIcon={<LoginSharp/>} variant="contained">
                            Sign In
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        Don't have an account? <Link to={'/register'} style={{color:'green'}}>Sign Up</Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
