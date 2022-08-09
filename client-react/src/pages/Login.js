import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {authActions} from "../redux/slices/authSlice";
import {LoginValidator} from "../validation";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import CustomizedSnackbarLogin from "../components/CustomizedSnackbarLogin";
import * as PropTypes from "prop-types";
import {Facebook, Google} from "@mui/icons-material";
import GoogleAuth from "../components/GoogleAuth";
import FacebookAuth from "../components/FacebookAuth";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)),
  url("https://psm7.com/wp-content/uploads/2022/04/Elon-Musk.png");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width: "75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: ${props => props.theme.colors.buttonBlue};
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: white;
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const LinkStyled = styled(Link)`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`

const Error = styled.span`
  color: red
`
const Social = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px 5px 40px;
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
const Span = styled.span`
  color: white;
`

function CustomizedSnackbarsLogin(props) {
    return null;
}

CustomizedSnackbarsLogin.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool
};


const Login = () => {
        // const [stateDisabled, setStateDisabled] = useState(false);
        const [open, setOpen] = useState(false);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {state} = useLocation();
        // const [query] = useSearchParams()
        const {loading, error, currentUser} = useSelector(state => state.auth);
        const handleClick = () => {
            setOpen(true);
        };
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
        handleClick();
        reset();
    }



        // useEffect(() => {
        //     console.log('session end', !!query.get('ExpSession'));
        // }, [query])
        // useEffect(() => {
        //     if (!errors.email && !errors.password) {
        //         setStateDisabled(true);
        //     } else {
        //         setStateDisabled(false);
        //     }
        // }, [errors])
        return (
            <Container>
                <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input type="text" {...register('email')} placeholder="email"/>
                        <Input type="password" {...register('password')} placeholder="password"/>
                        <Button

                            disabled={!isValid || loading}
                        >LOGIN</Button>
                        {errors.email && <Error>{errors.email.message}</Error>}
                        {errors.password && <Error>{errors.password.message}</Error>}

                        <LinkStyled to={'/registration'}>DO NOT REMEMBER THE PASSWORD?</LinkStyled>
                        <LinkStyled to={'/registration'}>CREATE A NEW ACCOUNT</LinkStyled>
                        {error && <CustomizedSnackbarLogin setOpen={setOpen} open={open} error={error}/>}
                    </Form>
                    {/*<Social  profile={'google'}>*/}
                    {/*<Google style={{color: 'white'}}/>*/}
                    <GoogleAuth state={state}/>
                    <FacebookAuth state={state}/>
                    {/*</Social>*/}
                    {/*<Social onClick={() => dispatch(authActions.facebookAuth())} profile={'facebook'}><Facebook*/}
                    {/*    style={{color: 'white'}}/><Span>Facebook</Span></Social>*/}
                </Wrapper>
            </Container>
        );
    }
;

export default Login;