import { Autocomplete, Box, Divider, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { Feed, Payments } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useEffect, useState } from 'react';
import { MpesaService } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../firebase';
import moment from 'moment';

const classesOfVehicles = [
    'A - Motorcycle',
    'B - Light Vehicle',
    'C - Light Truck',
    'D - PSV',
    'E - Heavy Truck',
    'F - Persons with Disability',
    'H - Industrial, Construction & Agricultural',
];

const validationSchema = yup.object({
    class: yup.string()
              .oneOf(Object.values(classesOfVehicles).map(r => r[0]), 'Invalid blood group')
              .required('Class of vehicle is required.'),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.')
});

const ApplicationForPDL = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetchingPDL, setFetchingPDL] = useState(true);
    const [pdl, setPDL] = useState(null);

    const formik = useFormik({
        initialValues: { class: '', phone: Number(user?.phone), },
        validateOnChange: true,
        validationSchema,
        onSubmit: async values => {
            setLoading(true);

            const mpesa = new MpesaService(values, user.uid);

            mpesa.onSuccess = async () => {
                await addDoc(collection(db, `licenses/${user.uid}/classes`), {
                    type: 'pdl',
                    class: values.class,
                    issueDate: moment().format('MMMM Do YYYY'),
                    validUntil: moment().add(3, 'months').format("MMMM Do YYYY")
                });
            };

            await mpesa.init();

            setLoading(false);
        }
    });

    useEffect(() => {
        getDocs(collection(db, `licenses/${user.uid}/classes`)).then(res => {
            const activePDL = res.docs.find(doc => {
                const PDLClass = doc.data();

                return moment(PDLClass.validUntil, 'MMMM Do YYYY').isAfter(moment());
            });

            if (activePDL) setPDL(activePDL.data());

            setFetchingPDL(false);
        });
    }, [user]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item display={'flex'} marginY={'.7rem'}>
                    <Feed fontSize={'small'}/>
                    <h1 style={{ marginLeft: '.7rem' }}>Application For Provisional Driving Licence</h1>
                </Grid>
                <hr/>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={'bold'}>STEPS FOR APPLYING FOR PROVISIONAL DRIVING LICENCE:</Typography>
                <div style={{ marginLeft: '1rem' }}>
                    <small> 1.Apply for approved provisional driving licence with validity of three months so as to
                        participate in driving school training and learning, and apply for corresponding type of
                        vehicle.
                    </small><br/>
                    <small>
                        2.After application is approved, waiting for the notification of physical check organized by
                        testing center.
                    </small><br/>
                    <small>
                        3.Those who passed physical check will participate in driving school training and apply for
                        testing booking.
                    </small><br/>
                    <small>
                        4.Attend test followed by booked time and place and staff in test center will give the outcome
                        of test on site.
                    </small><br/>
                    <small>
                        5.Applicants inquire driving licence information after inputting the test outcome by test center
                        and await printing and issuing.
                    </small>
                </div>

                <br/>
                <small>
                    Here is the first step of applying for Drving Licence, applicants could get provisional driving
                    licence for three months after filling in all the information correctly and electronic payment.
                </small>
            </Grid>

            {
                fetchingPDL
                ? (
                    <Grid item xs={7} marginX={'auto'} my={5}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress/>
                        </Box>
                    </Grid>
                ) : pdl ? (
                    <Grid item xs={6} marginX={'auto'} my={'1rem'} textAlign={'center'}>
                        <Divider light variant={'middle'} sx={{ my: 2 }} color={theme.palette.primary.main}/>
                        You currently have an active PDL that expires on {pdl.validUntil}
                    </Grid>
                ) : (
                        <>
                            <Grid item xs={6} marginX={'auto'} my={'1rem'} textAlign={'center'}>
                                <Divider light variant={'middle'} sx={{ my: 2 }} color={theme.palette.primary.main}/>
                                Apply
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, paddingY: 3 }}>
                                    <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}
                                          padding={'1rem'}
                                          component={'form'} onSubmit={formik.handleSubmit}>
                                        <Grid item xs={12} lg={6}>
                                            <Autocomplete name={'class'} options={Object.values(classesOfVehicles)
                                                                                        .map(r => ({
                                                                                            label: r,
                                                                                            value: r[0]
                                                                                        }))} freeSolo
                                                          onChange={(event, { value }) => {
                                                              formik.setFieldValue('class', value, true);
                                                          }} renderInput={(params) => (
                                                <TextField {...params} label="Class of vehicle"
                                                           value={formik.values.class} required
                                                           placeholder={'Class of vehicle'}
                                                           error={formik.touched.class && Boolean(formik.errors.class)}
                                                           helperText={formik.touched.class && formik.errors.class}/>
                                            )}/>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <TextField name={'phone'} type={'number'} label="Phone Number" required
                                                       fullWidth
                                                       placeholder={'Phone number'} value={formik.values.phone}
                                                       error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                       helperText={formik.touched.phone && formik.errors.phone}
                                                       onChange={formik.handleChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LoadingButton type={'submit'} fullWidth loadingPosition={'end'}
                                                           loading={loading}
                                                           endIcon={<Payments/>}
                                                           onClick={() => formik.submitForm()}>
                                                Pay With MPESA
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </>
                    )
            }
        </Grid>
    );
};

export default ApplicationForPDL;
