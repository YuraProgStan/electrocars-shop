import React, {useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {authActions} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const Social = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //padding: 5px 10px 5px 40px;
  gap: 5px;
  margin: 10px 0;
  cursor: pointer;
  background-color: ${props => {
    switch (props.profile) {
        case "google":
            return '#DB4437';
        case "facebook":
            return '#4267B2';
        default:
            return 'white'
    }
}
}

`
const GoogleAuth = ({state}) => {
    const dispatch = useDispatch();
    const googleButton = useRef(null);
    const navigate= useNavigate()
    const handleCredentialResponse = (response) => {
        dispatch(authActions.googleAuth(response.credential));
        if (state?.pathname) {
            navigate(state.pathname === 'login' ? '/' : state.pathname, {replace: true})
        } else {
            navigate('/');
        }
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
        google.accounts.id.prompt();
    }, [])

    return (

        <Social   id="signInDiv"></Social>

    );
};

export default GoogleAuth;