import { useAuth } from '../hooks/useAuth';
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { findUserById } from '../redux/features/users/usersSlice';
import { Avatar, Box, Card, Divider, List, ListItem, ListItemText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

const CardPro = styled(Card)(({ theme }) => ({
    color: '#000',
    padding: theme.spacing(2),
    borderWidth: '2px',
    borderColor: theme.palette.primary.main
}));

const MyDl = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({});

    const [licenses, setLicenses] = useState([]);

    const driverDetails = [
        { field: "Full Name", desc: userDetails.full_name },
        { field: "National ID", desc: userDetails.national_id },
        { field: "Phone", desc: userDetails.phone },
        { field: "E-mail", desc: userDetails.email },
        { field: "Date of Birth", desc: userDetails.dob },
        { field: "Gender", desc: userDetails.gender },
        { field: "Pin Number", desc: userDetails.pin },
        { field: "Blood Group", desc: userDetails.blood_group },
    ];
    const licenseDetails = [
        { field: "License ID", desc: 'DL-1234567' },
        {
            field: "Licenses", desc: (
                <List sx={{ m: 0, p: 0 }}>
                    {licenses?.map(license => (
                        <ListItem key={license.id} sx={{ background: `${license.data.type === 'pdl' ? '#ffff8d' : '#cbcb9f'}`, borderRadius: '2vh', my: 2, p: { xs: 0, sm: 1 } }}>
                            <ListItemText>
                                Class: {license.data.class}
                                <br />
                                Issue Date: {license.data.issueDate}
                                <br />
                                Valid Until: {license.data.validUntil}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List >
            )
        },
    ];

    useEffect(() => {
        if (user) {
            dispatch(findUserById(user.uid)).unwrap().then(res => {
                setUserDetails(res);
            });

            getDocs(collection(db, `licenses/${user.uid}/classes`)).then(res => setLicenses(res.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))));
        } else {
            setLicenses([]);
        }
    }, [user, dispatch]);

    const theme = useTheme()

    return (
        <Grid container spacing={2} p="1rem" pt={{ xs: 2, md: 1 }}>
            <Grid item xs={12} lg={6}>
                <CardPro>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Avatar sx={{ width: 56, height: 56 }} src='coa.png' variant={'rounded'} />
                        <Avatar sx={{ bgcolor: 'rgb(41, 149, 64)', width: 56, height: 56 }} src='Khalifa Fumo portrait.jpg'>KF</Avatar>
                    </Box>
                    <Divider variant={'middle'} sx={{ my: 2, borderBottomWidth: 3 }} color={theme.palette.primary.main} />
                    <Grid container spacing={1} columnSpacing={{ xs: 0, sm: 1 }}>
                        {driverDetails.map(driver => (
                            <React.Fragment key={driver.field}>
                                <Grid item xs={6}>
                                    {driver.field}
                                </Grid>
                                <Grid item xs={6}>
                                    {driver.desc}
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </CardPro>
            </Grid>
            <Grid item xs={12} lg={6}>
                <CardPro>
                    <Grid container spacing={{ xs: 1, sm: 2 }} columnSpacing={{ xs: 0, sm: 1 }}>
                        {licenseDetails.map(license => (
                            <React.Fragment key={license.field}>
                                <Grid item xs={6}>
                                    {license.field}
                                </Grid>
                                <Grid item xs={6}>
                                    {license.desc}
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </CardPro>
            </Grid>
        </Grid>
    );
}

export default MyDl;