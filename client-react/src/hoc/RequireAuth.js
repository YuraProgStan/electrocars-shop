import {useDispatch, useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {authActions} from "../redux/slices/authSlice";

export const RequireAuth = ({children}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {currentUser} = useSelector(state => state.user)

  if (!currentUser && localStorage.getItem('access')){
        const req = async () => {
            try {
                await dispatch(authActions.me());
            } catch (err) {
                return <Navigate to={'/login'} state={location}/>
            }

        }
        req();

    }
    else if (!currentUser && !localStorage.getItem('access')) {

        return <Navigate to={'/login'} state={location}/>
    }
    return children
}