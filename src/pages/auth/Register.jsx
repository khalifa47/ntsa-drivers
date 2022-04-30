import { Grid, Paper, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useFormik } from 'formik';
import { register, reset } from '../../redux/features/auth/authSlice';
import * as yup from 'yup';
import { toast } from '../../utils/helpers';
import { useDispatch } from 'react-redux';

const Avatar = lazy(() => import('@mui/material/Avatar'));
const LoadingButton = lazy(() => import('@mui/lab/LoadingButton'));
const LockOutlined = lazy(() => import('@mui/icons-material/LockOutlined'));
const LoginSharp = lazy(() => import('@mui/icons-material/LoginSharp'));

const validationSchema = yup.object({
    phone: yup.number().required('Phone number is required.'),
    blood_group: yup.string().required('Blood group is required.'),
    email: yup.string().email('Must be a valid email').max(100).required('Email is required.'),
    password: yup.string().max(20).required('Password is required.'),
    password_confirmation: yup.string().max(20).required('Password confirmation is required.')
});

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useAuth();

    const formik = useFormik({
        initialValues: { phone: '', email: '', blood_group: '', password: '', password_confirmation: '' },
        validationSchema: validationSchema,
        onSubmit: values => dispatch(register(values))
    });

    useEffect(() => {
        if (isError) toast({ msg: message, type: 'danger' });
        if (isSuccess || user) navigate('/');

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    return (
        <Grid container alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <Grid item xs={12} sm={8} md={5} lg={4} component={Paper} elevation={1} padding={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Grid item display={'flex'} alignItems={'center'}>
                            <Avatar><LockOutlined fontSize={'small'}/></Avatar>
                            <h4 style={{ paddingLeft: '1rem' }}>Sign Up</h4>
                        </Grid>
                        <Link to={'/login'}>Sign In</Link>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField size={'small'} name={'phone'} label="Phone number" fullWidth required
                                   placeholder={'Phone number'} value={formik.values.phone}
                                   error={formik.touched.phone && Boolean(formik.errors.phone)}
                                   helperText={formik.touched.phone && formik.errors.phone}
                                   onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField size={'small'} name={'blood_group'} label="Blood group" fullWidth required
                                   placeholder={'Blood group'} value={formik.values.blood_group}
                                   error={formik.touched.blood_group && Boolean(formik.errors.blood_group)}
                                   helperText={formik.touched.blood_group && formik.errors.blood_group}
                                   onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size={'small'} name={'email'} label="Email address" fullWidth required
                                   placeholder={'Email address'} value={formik.values.email}
                                   error={formik.touched.email && Boolean(formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}
                                   onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type={'password'} size={'small'} name={'password'} label="Password" fullWidth
                                   required placeholder={'Password'} value={formik.values.password}
                                   error={formik.touched.password && Boolean(formik.errors.password)}
                                   helperText={formik.touched.password && formik.errors.password}
                                   onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type={'password'} size={'small'} name={'password_confirmation'}
                                   label="Confirm Password" fullWidth
                                   required placeholder={'Confirm password'} value={formik.values.password_confirmation}
                                   error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                                   helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                                   onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={12} textAlign={'right'}>
                        <LoadingButton size="small" color="primary" loading={isLoading} type={'submit'}
                                       loadingPosition="end" className="w-100 mt-3" onClick={() => formik.submitForm()}
                                       endIcon={<LoginSharp/>} variant="contained">
                            Sign In
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Register;
