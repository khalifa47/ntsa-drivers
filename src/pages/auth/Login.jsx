import { Grid, Paper, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { LockOutlined } from '@mui/icons-material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { login, reset } from '../../redux/features/auth/authSlice';
import { useEffect } from 'react';
import { toast } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';

const validationSchema = yup.object({
    email: yup.string().email('Must be a valid email').max(100).required('Email is required.'),
    password: yup.string().max(20).required('Password is required.')
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {user, isLoading, isError, isSuccess, message} = useAuth();

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: validationSchema,
        onSubmit: values => dispatch(login(values))
    });

    useEffect(() => {
        if (isError) toast({msg: message, type: 'danger'});
        if (isSuccess || user) navigate('/');

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    return (
        <Grid container alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} padding={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Avatar><LockOutlined fontSize={'small'}/></Avatar>
                        <h4 style={{ paddingLeft: '1rem' }}>Sign In</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size={'small'} name={'email'} label="Email address" fullWidth required
                                   placeholder={'Email address'} value={formik.values.email}
                                   error={formik.touched.email && Boolean(formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}
                                   onChange={formik.handleChange}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
