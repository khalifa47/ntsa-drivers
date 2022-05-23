import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import { BeachAccess, Feed, Image, Work } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { findUserById } from '../redux/features/users/usersSlice';
import { useEffect } from 'react';

const ApplicationForPDL = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const dispatch = useDispatch();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item display={'flex'} marginY={'.7rem'}>
                    <Feed fontSize={'small'}/>
                    <h1 style={{ marginLeft: '.7rem' }}>Application For Provisional Driving Licence</h1>
                </Grid>
                <hr/>
            </Grid>
            <Grid item xs={12} marginX={'1rem'} textAlign={'center'}>
                <Typography variant={'body2'} color={'white'}
                            style={{ backgroundColor: theme.palette.primary.main, padding: '.5rem' }}>
                    Initial Application
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Image fontSize={'small'}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Work fontSize={'small'}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Work" secondary="Jan 7, 2014"/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BeachAccess fontSize={'small'}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={6}>
                <Paper>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default ApplicationForPDL;
