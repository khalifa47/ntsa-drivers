import { LoadingButton } from '@mui/lab';
import { Autocomplete, Grid, LinearProgress, Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { Password, toast } from 'utils/helpers';
import { useTheme } from '@mui/material/styles';
import * as yup from 'yup';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import { doc, updateDoc } from 'firebase/firestore';
import db, { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { isValidPhoneNumber } from 'libphonenumber-js';

// Import React FilePond with plugins & styles
import { FilePond, registerPlugin } from 'react-filepond';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { User } from '../service/user.service';

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);


const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const validationSchemaBasic = yup.object({
    phone: yup.number().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }),
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
    const { user: storageUser } = useAuth();
    const theme = useTheme();

    const [loadingBasic, setLoadingBasic] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [user, loading] = useAuthState(auth);

    const formikBasic = useFormik({
        initialValues: {
            phone: storageUser?.phone,
            email: storageUser?.email,
            blood_group: storageUser?.blood_group,
            image: '',
        },
        validateOnChange: true,
        validationSchema: validationSchemaBasic,
        onSubmit: async values => {
            setLoadingBasic(true);

            await User.update(user, values)

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
                const passwordsMatch = Password.verify(values.old_password, storageUser.password);

                if (!passwordsMatch) return toast({ msg: 'Invalid Password Entered.' });

                await updateDoc(doc(db, 'users', storageUser.uid), {
                    password: Password.hash(values.password)
                });

                toast({ msg: 'Password changed successfully' });
            } catch (err) {
                toast({ msg: err.message });
            }

            setLoadingPassword(false);
        }
    });

    if (loading) return <LinearProgress/>;

    return (
        <Grid container spacing={2} p="1rem" pt={{ xs: 2, md: 1 }}>
            <Grid item xs={12}>
                <Paper component={'form'} onSubmit={formikBasic.handleSubmit}
                       sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <TextField name={'email'} label="Email Address" fullWidth required
                                       placeholder={'Email address'} value={formikBasic.values.email}
                                       error={formikBasic.touched.email && Boolean(formikBasic.errors.email)}
                                       helperText={formikBasic.touched.email && formikBasic.errors.email}
                                       onChange={formikBasic.handleChange}/>
                        </Grid>
                        <Grid item lg={6}>
                            <TextField name={'phone'} label="Phone Number" fullWidth required
                                       placeholder={'Phone number'} value={formikBasic.values.phone}
                                       error={formikBasic.touched.phone && Boolean(formikBasic.errors.phone)}
                                       helperText={formikBasic.touched.phone && formikBasic.errors.phone}
                                       onChange={formikBasic.handleChange}/>
                        </Grid>
                        <div id={'recaptcha-container'}/>
                        <Grid item xs={12}>
                            <Autocomplete name={'blood_group'} options={bloodGroups}
                                          value={formikBasic.values.blood_group}
                                          freeSolo
                                          onChange={(event, newValue) => {
                                              formikBasic.setFieldValue('blood_group', newValue, true);
                                          }} renderInput={(params) => (
                                <TextField {...params} label="Blood Group"
                                           value={formikBasic.values.blood_group} required placeholder={'Blood group'}
                                           error={formikBasic.touched.blood_group && Boolean(formikBasic.errors.blood_group)}
                                           helperText={formikBasic.touched.blood_group && formikBasic.errors.blood_group}/>
                            )}/>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <FilePond maxFiles={1} name="image" maxFileSize={'1MB'} className={'mb-0'}
                                      labelMaxFileSizeExceeded={'Image is too large.'}
                                      labelFileTypeNotAllowed={'Invalid image type. allowed(jpg, png, jpeg)'}
                                      labelIdle='Drag & Drop an image or <span class="filepond--label-action">Browse</span>'
                                      acceptedFileTypes={['image/jpg', 'image/png', 'image/jpeg']} dropOnPage
                                      imageResizeTargetWidth={300} imageResizeTargetHeight={300}
                                      onupdatefiles={image => formikBasic.setFieldValue('image', image[0]?.file, true)}
                                      onremovefile={() => formikBasic.setFieldValue('image', null, true)}/>
                        </Grid>
                        <Grid item xs={12} textAlign={'center'}>
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
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper component={'form'} onSubmit={formikPassword.handleSubmit}
                       sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField type={'password'} name={'old_password'} label="Old Password" fullWidth
                                       required placeholder={'Old Password'} value={formikPassword.values.old_password}
                                       error={formikPassword.touched.old_password && Boolean(formikPassword.errors.old_password)}
                                       helperText={formikPassword.touched.old_password && formikPassword.errors.old_password}
                                       onChange={formikPassword.handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type={'password'} name={'password'} label="Password" fullWidth
                                       required placeholder={'Password'} value={formikPassword.values.password}
                                       error={formikPassword.touched.password && Boolean(formikPassword.errors.password)}
                                       helperText={formikPassword.touched.password && formikPassword.errors.password}
                                       onChange={formikPassword.handleChange}/>
                        </Grid>
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
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

// phone update
// profile image upload

export default AccountManagement;