import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const Guest = ({component}) => {
    const location = useLocation();

    if (auth.currentUser) {
        // Redirect them to the /home page.

        let urlIntended = location.state?.from?.pathname || "/dashboard";
        return <Navigate to={urlIntended} replace/>;
    }

    return component;
};

export default Guest;