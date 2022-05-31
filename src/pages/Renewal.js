import { Feed, Payments } from "@mui/icons-material";
import {
    Box,
    Divider,
    FormControlLabel,
    Grid,
    LinearProgress,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from "@mui/lab";
import { useFormik } from 'formik';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { MpesaService } from '../utils/helpers';
import * as yup from 'yup';
import db from '../firebase';
import { CardPro } from '../components/CardPro';
import moment from 'moment';
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const validationSchema = yup.object({
    id: yup.string()
           .required('License selection is required.'),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.')
});

const Renewal = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetchingDL, setFetchingDL] = useState(true);
    const [expiredDLs, setExpiredDLs] = useState([]);

    const formik = useFormik({
        initialValues: { id: '', phone: Number(user?.phone), },
        validateOnChange: true,
        validationSchema,
        onSubmit: async values => {
            setLoading(true);

            const mpesa = new MpesaService(values, user.uid);

            mpesa.onSuccess = async () => {
                await updateDoc(doc(db, `licenses/${user.uid}/classes`, values.id), {
                    renewedOn: moment().format("MMMM Do YYYY"),
                    validUntil: values.type === 'pdl'
                                ? moment().add(3, 'months').format("MMMM Do YYYY")
                                : moment().add(3, 'years').format("MMMM Do YYYY")
                });
            };

            await mpesa.init();

            setLoading(false);
        }
    });

    useEffect(() => {
        getDocs(collection(db, `licenses/${user.uid}/classes`)).then(res => {
            setExpiredDLs(res.docs.filter(doc => moment(doc.data().validUntil, 'MMMM Do YYYY').isAfter(moment()))
                             .map(doc => ({
                                 id: doc.id,
                                 data: doc.data()
                             })));

            setFetchingDL(false);
        });
    }, [user]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item display={'flex'} marginY={'.7rem'}>
                    <Feed fontSize={'small'}/>
                    <h1 style={{ marginLeft: '.7rem' }}>Driving Licence Renewal</h1>
                </Grid>
                <hr/>
            </Grid>

            {
                fetchingDL
                ? (
                    <Grid item xs={7} marginX={'auto'} my={5}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress/>
                        </Box>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={6} marginX={'auto'} textAlign={'center'}>
                            <Divider light variant={'middle'} sx={{ my: 2 }} color={theme.palette.primary.main}/>
                            Renew
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ borderWidth: 1, borderColor: theme.palette.primary.main, paddingY: 3 }}>
                                <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}
                                      padding={'1rem'} component={'form'} onSubmit={formik.handleSubmit}>
                                    <RadioGroup
                                        name="id"
                                        onChange={(event, value) => {
                                            formik.setFieldValue('id', value, true);
                                        }}
                                    >
                                        {expiredDLs?.map(dl => (
                                            <FormControlLabel key={dl.id} value={dl.id} control={<Radio/>} label={
                                                <CardPro>
                                                    <Grid item xs={12}>
                                                        {dl.data.type}
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {dl.data.class}
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {dl.data.issueDate}
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {dl.data.validUntil}
                                                    </Grid>
                                                </CardPro>
                                            }/>
                                        ))}
                                    </RadioGroup>

                                    {/* <Grid item xs={12} lg={6}>
                                            <Autocomplete name={'type'} freeSolo
                                                options={[
                                                    { label: 'PDL', value: 'pdl' },
                                                    { label: 'Smart DL', value: 'smart' }
                                                ]}
                                                onChange={(event, { value }) => {
                                                    formik.setFieldValue('type', value, true);
                                                }} renderInput={(params) => (
                                                    <TextField {...params} label="Type of license"
                                                        value={formik.values.type} required
                                                        placeholder={'Type of license'}
                                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                                        helperText={formik.touched.type && formik.errors.type} />
                                                )} />
                                        </Grid>
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
                                        </Grid> */}
                                    <Grid item xs={12}>
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

export default Renewal;