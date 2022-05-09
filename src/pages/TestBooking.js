import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import { BeachAccess, Feed, Image, Work } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { findUserById } from '../redux/features/users/usersSlice';
import { useEffect } from 'react';

const TestBooking = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user.uid);
        if (user) {
            dispatch(findUserById(user.uid)).unwrap().then(res => {
                console.log(res);
            });
        }
    }, [user, dispatch]);

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
            <Grid item xs={6}>
                <Paper>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default TestBooking;
