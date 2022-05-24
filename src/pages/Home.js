import { Grid } from '@mui/material';
import { Feed } from '@mui/icons-material';

const Home = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item display={'flex'} marginY={'.7rem'} justifyContent={'center'}>
                    <Feed fontSize={'small'}/>
                    <h1 style={{ marginLeft: '.7rem' }}>Welcome</h1>
                </Grid>
                <hr/>
            </Grid>

        </Grid>
    );
};

export default Home;
