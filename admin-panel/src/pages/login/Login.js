import React from 'react';
import  './login.scss';

import {useLocation, useNavigate} from "react-router-dom";


import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import Error from "../../components/error/Error";
import {authActions} from "../../redux/slices/authSlice";
import {LoginValidator} from "../../validation";

const Login = () => {
    // const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {loading, error, currentUser} = useSelector(state => state.auth);
    // const handleClick = () => {
    //     setOpen(true);
    // };
    const {register, handleSubmit, reset, formState: {errors, isValid}} =
        useForm({resolver: joiResolver(LoginValidator), mode: 'onTouched'});
    const onSubmit = async (data) => {
        try {

            await dispatch(authActions.login({user: {email: data.email, password: data.password}}));
            if (state?.pathname) {
                console.log('path', state.pathname)
                navigate(state.pathname === 'login' ? '/' : state.pathname, {replace: true})
            } else {
                navigate('/');
            }
        } catch (err) {
            console.log(err)

        }
        // handleClick();
        reset();
    }
    return (
        <div className="login">
            <div className="wrapper">
                <h1>SIGN IN</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register('email')} placeholder="email"/>
                    <input type="password" {...register('password')} placeholder="password"/>
                    <button

                        disabled={!isValid || loading}
                    >LOGIN</button>
                    {errors.email && <Error>{errors.email.message}</Error>}
                    {errors.password && <Error>{errors.password.message}</Error>}
                </form>
                {/*<Social  profile={'google'}>*/}
                {/*<Google style={{color: 'white'}}/>*/}
                {/*<GoogleAuth state={state}/>*/}
                {/*<FacebookAuth state={state}/>*/}
                {/*</Social>*/}
                {/*<Social onClick={() => dispatch(authActions.facebookAuth())} profile={'facebook'}><Facebook*/}
                {/*    style={{color: 'white'}}/><Span>Facebook</Span></Social>*/}
            </div>
        </div>
    );
};

export default Login;