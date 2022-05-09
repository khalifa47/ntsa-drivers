import { useTheme } from "@mui/material";
import { useAuth } from '../hooks/useAuth';
import Card from "@mui/material/Card";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { findUserById } from '../redux/features/users/usersSlice';

const MyDl = () => {
    const theme = useTheme();
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
        <Card>
        </Card>
    );
}

export default MyDl;