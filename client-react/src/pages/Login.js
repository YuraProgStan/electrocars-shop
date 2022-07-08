import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {authActions} from "../redux/slices/authSlice";
import {LoginValidator} from "../validation";


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
    color: green;
    cursor: not-allowed;
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
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();
    const [query] = useSearchParams()
    const {loading, error} = useSelector(state => state.user)
    const handleClick = async (e) => {
        e.preventDefault();
        try{
            await LoginValidator.validateAsync({ email, password });
            await dispatch(authActions.login({user: {email, password}}));
            if (state?.pathname) {
                navigate(state.pathname === 'login' ? '/' : state.pathname, {replace: true})
            } else {
                navigate('/');
            }
        }
        catch (err){
            console.log(err)
        }



    }
    useEffect(() => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        dispatch(authActions.logout());
    }, [])

    useEffect(() => {
        console.log('session end', !!query.get('ExpSession'));
    }, [query])
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="email" onChange={e => setEmail(e.target.value)}/>
                    <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                    <Button onClick={handleClick} disabled={loading}>LOGIN</Button>
                    {error && <Error>Something went wrong...}</Error>}

                    <LinkStyled to={'/register'}>DO NOT REMEMBER THE PASSWORD?</LinkStyled>
                    <LinkStyled to={'/register'}>CREATE A NEW ACCOUNT</LinkStyled>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;