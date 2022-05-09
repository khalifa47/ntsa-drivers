import { useAuth } from '../hooks/useAuth';
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { findUserById } from '../redux/features/users/usersSlice';
import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardPro = styled(Card)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(1),
}));

const MyDl = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(findUserById(user.uid)).unwrap().then(res => {
                console.log(res);
            });
        }
    }, [user, dispatch]);

    return (
        <Grid container spacing={3} p={1}>
            <Grid container item xs={6}>
                <CardPro>
                    <Grid item xs={12}>
                        Khalifa
                    </Grid>
                    <Grid item xs={12}>
                        Bakari
                    </Grid>
                    <Grid item xs={12}>
                        Fumo
                    </Grid>
                </CardPro>
            </Grid>
            <Grid container item xs={6}>
                <CardPro>
                    <Grid item xs={12}>
                        Real
                    </Grid>
                    <Grid item xs={12}>
                        Slim
                    </Grid>
                    <Grid item xs={12}>
                        Shady
                    </Grid>
                </CardPro>
            </Grid>
        </Grid>
    );
}

export default MyDl;