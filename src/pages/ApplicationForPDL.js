import { Grid } from '@mui/material';
import { Newspaper } from '@mui/icons-material';

const ApplicationForPDL = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Newspaper/>
                <h1>Application For Provisional Driving Licence</h1>
                <hr/>
            </Grid>
        </Grid>
    );
};

export default ApplicationForPDL;
