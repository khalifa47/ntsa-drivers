import {useAppSelector} from '../redux/hooks';

export const useAuth = () => {
    return useAppSelector(state => state.auth);
};