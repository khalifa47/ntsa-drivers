import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardPro = styled(Card)(({ theme }) => ({
    color: '#000',
    padding: theme.spacing(2),
    borderWidth: '2px',
    borderColor: theme.palette.primary.main
}));