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

const defClassesOfVehicles = [
    'A - Motorcycle',
    'B - Light Vehicle',
    'C - Light Truck',
    'D - PSV',
    'E - Heavy Truck',
    'F - Persons with Disability',
    'G - Industrial, Construction & Agricultural',
];

const validationSchema = yup.object({
    class: yup.string()
        .oneOf(Object.values(defClassesOfVehicles).map(r => r[0]), 'Invalid class')
        .required('Class of vehicle is required.'),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.')
});

const ApplicationForDL = ({ type }) => {
    const theme = useTheme();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetchingDL, setFetchingDL] = useState(true);
    const [dl, setDL] = useState(null);
    const [classesOfVehicles, setClassesOfVehicles] = useState(defClassesOfVehicles);

    const formik = useFormik({
        initialValues: { class: '', phone: Number(user?.phone), },
        validateOnChange: true,
        validationSchema,
        onSubmit: async values => {
            setLoading(true);

            const mpesa = new MpesaService(values, user.uid);

            mpesa.onSuccess = async () => {
                await addDoc(collection(db, `licenses/${user.uid}/classes`), {
                    type: type,
                    class: values.class,
                    issueDate: moment().format('MMMM Do YYYY'),
                    validUntil: type === 'pdl' ? moment().add(3, 'months').format("MMMM Do YYYY") : moment().add(3, 'years').format("MMMM Do YYYY")
                });
            };

            await mpesa.init();

            setLoading(false);
        }
    });

    useEffect(() => {
        getDocs(collection(db, `licenses/${user.uid}/classes`)).then(res => {
            const activeDL = res.docs.find(doc => {
                const DLClass = doc.data();

                return moment(DLClass.validUntil, 'MMMM Do YYYY').isAfter(moment()) && DLClass.type === type;
            });

            if (activeDL) {
                setDL(activeDL.data());
                setClassesOfVehicles(classesOfVehicles.filter(DLClass => DLClass[0] !== dl?.class))
            }

            setFetchingDL(false);
        });
    }, [user, dl?.class, type, classesOfVehicles]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item display={'flex'} marginY={'.7rem'}>
                    <Feed fontSize={'small'} />
                    <h1 style={{ marginLeft: '.7rem' }}>Application For {type === 'pdl' ? 'Provisional' : 'Smart'} Driving Licence</h1>
                </Grid>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={'bold'}>STEPS FOR APPLYING FOR {type === 'pdl' ? 'PROVISIONAL' : 'SMART'} DRIVING LICENCE:</Typography>
                <div style={{ marginLeft: '1rem' }}>
                    {
                        type === 'pdl' ?
                            <>
                                <small> 1.Apply for approved provisional driving licence with validity of three months so as to
                                    participate in driving school training and learning, and apply for corresponding type of
                                    vehicle.
                                </small><br />
                                <small>
                                    2.After application is approved, waiting for the notification of physical check organized by
                                    testing center.
                                </small><br />
                                <small>
                                    3.Those who passed physical check will participate in driving school training and apply for
                                    testing booking.
                                </small><br />
                                <small>
                                    4.Attend test followed by booked time and place and staff in test center will give the outcome
                                    of test on site.
                                </small><br />
                                <small>
                                    5.Drivers possessing a PDL must be accompanied by a licensed driver while driving.
                                </small>

                                <br />
                                <small>
                                    Here is the first step of applying for Driving Licence, applicants could get provisional driving
                                    licence for <strong>three months</strong> after filling in all the information correctly and electronic payment of <strong>Ksh. 600</strong>.
                                </small>
                            </>
                            :
                            <>
                                <small> 1.Apply for approved smart driving licence with validity of choice and for corresponding type of
                                    vehicle.
                                </small><br />
                                <small>
                                    2.After payment is approved, your smart DL will be available for viewing on the portal.
                                </small><br />
                                <small>
                                    3.A center can be picked for collection of the physical smart DL.
                                </small><br />
                                <small>
                                    4.Please pick your physical smart DL within a month of application to avoid destruction.
                                </small>

                                <br />
                                <small>
                                    Here is the first step of applying for Driving Licence, applicants could get their smart driving
                                    licence for <strong>three years</strong> after filling in all the information correctly and electronic payment of <strong>Ksh. 3000</strong>.
                                </small>
                            </>
                    }

                </div>
            </Grid>

            {
                fetchingDL
                    ? (
                        <Grid item xs={7} marginX={'auto'} my={5}>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        </Grid>
                    ) : (
                        <>
                            <Grid item xs={11} lg={6} marginX={'auto'} my={'1rem'} textAlign={'center'}>
                                <Divider light variant={'middle'} sx={{ my: 2 }} color={theme.palette.primary.main} />
                                {
                                    dl && (
                                        <Box color={'silver'}>
                                            <Typography>
                                                You currently have an active {type === 'pdl' ? 'PDL' : 'SmartDL'} for the vehicle of class {dl.class} that
                                                <b> expires on {dl.validUntil}</b>.
                                            </Typography>
                                            <Divider light variant={'middle'} sx={{ my: 2 }}
                                                color={theme.palette.primary.main} />
                                        </Box>
                                    )
                                }
                                Apply
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, paddingY: 3 }}>
                                    <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}
                                        padding={'1rem'} component={'form'} onSubmit={formik.handleSubmit}>
                                        <Grid item xs={12} lg={6}>
                                            <Autocomplete name={'class'} freeSolo
                                                options={Object.values(classesOfVehicles).map(r => ({
                                                    label: r,
                                                    value: r[0]
                                                }))}
                                                onChange={(event, { value }) => {
                                                    formik.setFieldValue('class', value, true);
                                                }} renderInput={(params) => (
                                                    <TextField {...params} label="Class of vehicle"
                                                        value={formik.values.class} required
                                                        placeholder={'Class of vehicle'}
                                                        error={formik.touched.class && Boolean(formik.errors.class)}
                                                        helperText={formik.touched.class && formik.errors.class} />
                                                )} />
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <TextField name={'phone'} type={'number'} label="Phone Number" required
                                                fullWidth
                                                placeholder={'Phone number'} value={formik.values.phone}
                                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                helperText={formik.touched.phone && formik.errors.phone}
                                                onChange={formik.handleChange} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LoadingButton type={'submit'} fullWidth loadingPosition={'end'}
                                                loading={loading}
                                                endIcon={<Payments />}
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

export default ApplicationForDL;
