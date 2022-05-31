import { LoadingButton } from '@mui/lab';
import { Autocomplete, Grid, Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { Password, toast } from 'utils/helpers';
import { useTheme } from '@mui/material/styles';
import * as yup from 'yup';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../firebase';


const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const validationSchemaBasic = yup.object({
    blood_group: yup.string().oneOf(bloodGroups, 'Invalid blood group').required('Blood group is required.'),
    email: yup.string().email('Must be a valid email').max(100).required('Email is required.')
});

const validationSchemaPassword = yup.object({
    old_password: yup.string().max(20).required('Old password is required.'),
    password: yup.string().max(20).required('Password is required.'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match')
                              .required('Password confirmation is required')
});

const AccountManagement = () => {
    const { user } = useAuth();
    const theme = useTheme();

    const [loadingBasic, setLoadingBasic] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const formikBasic = useFormik({
        initialValues: {
            email: user?.email,
            blood_group: user?.blood_group
        },
        validateOnChange: true,
        validationSchema: validationSchemaBasic,
        onSubmit: async values => {
            setLoadingBasic(true);

            try {
                await updateDoc(doc(db, 'users', user.uid), {
                    email: values.email,
                    blood_group: values.blood_group
                });
                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    email: values.email,
                    blood_group: values.blood_group
                }));
                toast({ msg: 'Profile changed successfully' });
            } catch (err) {
                toast({ msg: err.message });
            }
            setLoadingBasic(false);
        }
    });

    const formikPassword = useFormik({
        initialValues: {
            old_password: '',
            password: '',
            password_confirmation: ''
        },
        validateOnChange: true,
        validationSchema: validationSchemaPassword,
        onSubmit: async values => {
            setLoadingPassword(true);

            try {
                const passwordsMatch = Password.verify(values.old_password, user.password);

                if (!passwordsMatch) throw new Error('Invalid Password Entered');

                await updateDoc(doc(db, 'users', user.uid), {
                    password: Password.hash(values.password)
                });
                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    password: Password.hash(values.password)
                }));
                toast({ msg: 'Password changed successfully' });
            } catch (err) {
                toast({ msg: err.message });
            }
            setLoadingPassword(false);
        }
    });

    return (
        <Grid container spacing={2} p="1rem" pt={{ xs: 2, md: 1 }}>
            <Grid item xs={12}>
                <Paper component={'form'} onSubmit={formikBasic.handleSubmit}
                       sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, p: 3 }}>
                    <Grid item xs={12}>
                        <Autocomplete name={'blood_group'} options={bloodGroups} value={formikBasic.values.blood_group}
                                      freeSolo
                                      onChange={(event, newValue) => {
                                          formikBasic.setFieldValue('blood_group', newValue, true);
                                      }} renderInput={(params) => (
                            <TextField {...params} label="Blood Group"
                                       value={formikBasic.values.blood_group} required placeholder={'Blood group'}
                                       error={formikBasic.touched.blood_group && Boolean(formikBasic.errors.blood_group)}
                                       helperText={formikBasic.touched.blood_group && formikBasic.errors.blood_group}/>
                        )}
                        />
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                        <TextField name={'email'} label="Email Address" fullWidth required
                                   placeholder={'Email address'} value={formikBasic.values.email}
                                   error={formikBasic.touched.email && Boolean(formikBasic.errors.email)}
                                   helperText={formikBasic.touched.email && formikBasic.errors.email}
                                   onChange={formikBasic.handleChange}/>
                    </Grid>
                    <Grid item xs={12} textAlign={'center'} mt={'1rem'}>
                        <LoadingButton
                            loading={loadingBasic}
                            type={'submit'}
                            fullWidth
                            loadingPosition="end"
                            onClick={() => formikBasic.submitForm()}
                            endIcon={<ManageAccountsIcon/>}
                        >
                            Change Profile Details
                        </LoadingButton>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper component={'form'} onSubmit={formikPassword.handleSubmit}
                       sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, p: 3 }}>
                    <Grid item xs={12}>
                        <TextField type={'password'} name={'old_password'} label="Old Password" fullWidth
                                   required placeholder={'Old Password'} value={formikPassword.values.old_password}
                                   error={formikPassword.touched.old_password && Boolean(formikPassword.errors.old_password)}
                                   helperText={formikPassword.touched.old_password && formikPassword.errors.old_password}
                                   onChange={formikPassword.handleChange}/>
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                        <TextField type={'password'} name={'password'} label="Password" fullWidth
                                   required placeholder={'Password'} value={formikPassword.values.password}
                                   error={formikPassword.touched.password && Boolean(formikPassword.errors.password)}
                                   helperText={formikPassword.touched.password && formikPassword.errors.password}
                                   onChange={formikPassword.handleChange}/>
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                        <TextField type={'password'} name={'password_confirmation'}
                                   label="Confirm Password" fullWidth
                                   required placeholder={'Confirm password'}
                                   value={formikPassword.values.password_confirmation}
                                   error={formikPassword.touched.password_confirmation && Boolean(formikPassword.errors.password_confirmation)}
                                   helperText={formikPassword.touched.password_confirmation && formikPassword.errors.password_confirmation}
                                   onChange={formikPassword.handleChange}/>
                    </Grid>
                    <Grid item xs={12} textAlign={'center'} mt={'1rem'}>
                        <LoadingButton
                            loading={loadingPassword}
                            type={'submit'}
                            fullWidth
                            loadingPosition="end"
                            onClick={() => formikPassword.submitForm()}
                            endIcon={<PasswordIcon/>}
                        >
                            Change Password
                        </LoadingButton>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

// phone update
// profile image upload

export default AccountManagement;