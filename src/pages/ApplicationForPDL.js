import { Grid, Typography } from '@mui/material';
import { Feed } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ApplicationForPDL = () => {
    const theme = useTheme();

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
                <Typography variant={'body2'} color={'white'} style={{ backgroundColor: theme.palette.primary.main, padding: '.5rem' }}>
                    Initial Application
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ApplicationForPDL;
