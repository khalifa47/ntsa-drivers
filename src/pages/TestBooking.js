import { Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { Feed, Payments } from '@mui/icons-material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useState } from 'react';
import { MpesaService } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '@mui/material/styles';

const validationSchema = yup.object({
    test_date: yup.date().min(moment().toDate(), 'Invalid date').required('Test date is required'),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.')
});

const TestBooking = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: { test_date: null, phone: '', },
        validateOnChange: true,
        validationSchema,
        onSubmit: async values => {
            setLoading(true);

            await new MpesaService(values, user.uid).init();

            setLoading(false);
        }
    });

    const enableWedAndFri = date => [0, 1, 2, 4, 6].includes(date.day());

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item display={'flex'} marginY={'.7rem'}>
                    <Feed fontSize={'small'}/>
                    <h1 style={{ marginLeft: '.7rem' }}>Driving Test Booking</h1>
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
                <Typography marginTop={'1rem'} fontWeight={'bold'}>
                    STEPS FOR APPLICATION OF DRIVING CLASS ENDORSEMENT:
                </Typography>
                <div style={{ marginLeft: '1rem' }}>
                    <small>
                        1.Applicants fill in the class endorsement application accurately and completely, and explain
                        the type of DL needs to be added, upload existing DL and scanning copy of ID. Renewal fee is
                        done by electronic payment.
                    </small><br/>
                    <small>
                        2.The application should be verified by NTSA staff, and attend training by themselves after
                        approval.
                    </small><br/>
                    <small>
                        3.Apply for test booking when passing the training in school.
                    </small><br/>
                    <small>
                        4.Attend test based on booked time and place and staff in testing center will provide the
                        outcome.
                    </small><br/>
                    <small>
                        5.Applicants inquire driving licence information after inputting the test outcome by test center
                        and await printing and issuing.
                    </small>
                </div>
            </Grid>
            <Grid item xs={6} marginX={'auto'} my={'1rem'} textAlign={'center'}>
                <Divider light variant={'middle'} sx={{ my: 2 }} color={theme.palette.primary.main}/>
                Apply
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, paddingY: 3 }}>
                    <Grid container spacing={2} justifyContent={'center'} padding={'1rem'}>
                        <Grid item md={5} lg={3}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker minDateTime={moment().add(1, 'd')} shouldDisableDate={enableWedAndFri}
                                                label="Test date" value={formik.values.test_date}
                                                onChange={(newValue) => formik.setFieldValue('test_date', newValue, true)}
                                                renderInput={(params) => (
                                                    <TextField {...params} name={'test_date'} fullWidth
                                                               placeholder={'Pick a test date'}/>
                                                )}/>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={5} lg={3}>
                            <TextField name={'phone'} type={'number'} label="Phone Number" required fullWidth
                                       placeholder={'Phone number'} value={formik.values.phone}
                                       error={formik.touched.phone && Boolean(formik.errors.phone)}
                                       helperText={formik.touched.phone && formik.errors.phone}
                                       onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item md={6} lg={7}>
                            <LoadingButton fullWidth loadingPosition={'end'} loading={loading} endIcon={<Payments/>}
                                           onClick={() => formik.submitForm()}>
                                Pay With MPESA
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TestBooking;
