import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {useDispatch} from "react-redux";
import {authActions} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// const Social = styled(FacebookLogin)`
//   height:35px;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   //padding: 5px 10px 5px 40px;
//   gap: 5px;
//   margin: 10px 0;
//   cursor: pointer;
//   background-color:red;
//   `


const FacebookAuth = ({state}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const responseFacebook = async (response) => {

        dispatch(authActions.facebookAuth({userID: response.userID, accessToken: response.accessToken}))
        if (state?.pathname) {
            navigate(state.pathname === 'login' ? '/' : state.pathname, {replace: true})
        } else {
            navigate('/');
        }


    }
    return (
        <FacebookLogin
            appId="733505487976470"
            autoLoad={false}
            size="small"
            fields="name,email,picture"
            callback={responseFacebook}
            textButton="Login with Facebook"
        />
    );
};

export default FacebookAuth;