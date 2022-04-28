import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

const Guest = ({component}) => {
    const {auth} = useAuth();
    const location = useLocation();

    if (auth) {
        // Redirect them to the /home page.

        let urlIntended = location.state?.from?.pathname || "/dashboard";
        return <Navigate to={urlIntended} replace/>;
    }

    return component;
};

export default Guest;