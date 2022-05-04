import { Autocomplete, Grid, Paper, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { lazy, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from '../../utils/helpers';
import publicRecords from '../../records.json';
import map from 'lodash.map';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { register } from '../../redux/features/authAPI';

const Avatar = lazy(() => import('@mui/material/Avatar'));
const LoadingButton = lazy(() => import('@mui/lab/LoadingButton'));
const LockOutlined = lazy(() => import('@mui/icons-material/LockOutlined'));
const LoginSharp = lazy(() => import('@mui/icons-material/LoginSharp'));

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const validationSchema = yup.object({
    phone: yup.number().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.'),
    blood_group: yup.string().oneOf(bloodGroups, 'Invalid blood group').required('Blood group is required.'),
    serial_number: yup.number().oneOf(map(publicRecords, 'serial_id'), 'Invalid serial number')
                      .required('Serial number is required.'),
    email: yup.string().email('Must be a valid email').max(100).required('Email is required.'),
    password: yup.string().max(20).required('Password is required.'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match')
                              .required('Password confirmation is required')
});

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            phone: '',
            email: '',
            blood_group: '',
            serial_number: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            setLoading(true);

            try {
                await register(values);

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
                        <TextField size={'small'} type={'number'} name={'serial_number'} label="Serial Number" fullWidth
                                   required placeholder={'Serial number'} value={formik.values.serial_number}
                                   error={formik.touched.serial_number && Boolean(formik.errors.serial_number)}
                                   helperText={formik.touched.serial_number && formik.errors.serial_number}
                                   onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete name={'blood_group'} options={bloodGroups} freeSolo
                                      onChange={(event, newValue) => {
                                          formik.setFieldValue('blood_group', newValue, true);
                                      }} renderInput={(params) => (
                            <TextField {...params} size={'small'} label="Blood Group"
                                       value={formik.values.blood_group} required placeholder={'Blood group'}
                                       error={formik.touched.blood_group && Boolean(formik.errors.blood_group)}
                                       helperText={formik.touched.blood_group && formik.errors.blood_group}/>
                        )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size={'small'} name={'phone'} label="Phone Number" fullWidth required
                                   placeholder={'Phone number'} value={formik.values.phone}
                                   error={formik.touched.phone && Boolean(formik.errors.phone)}
                                   helperText={formik.touched.phone && formik.errors.phone}
                                   onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size={'small'} name={'email'} label="Email Address" fullWidth required
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
                    <div id={'recaptcha-container'}/>
                    <Grid item xs={12} textAlign={'right'}>
                        <LoadingButton size="small" color="primary" loading={loading} type={'submit'}
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
