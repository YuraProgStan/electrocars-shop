import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import {authActions as authAction} from "../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Joi from "joi";
import {RegistrationValidator} from "../validation";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
  url("https://psm7.com/wp-content/uploads/2022/04/Elon-Musk.png");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: ${props => props.theme.colors.buttonBlue};
  color: white;
  cursor: pointer;

  &:disabled {
    color: white;
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
const Error = styled.span`
  color: red
`
const initialState = {username: "", password: "", email: "", passwordConfirm: "", phone: ""}
const Registration = () => {
        const [state, setState] = useState(initialState);
        const [errors, setErrors] = useState(null);
        const [stateDisabled, setStateDisabled] = useState(false);
        const [open, setOpen] = React.useState(false);

        const handleClick = () => {
            setOpen(true);
        };
        const dispatch = useDispatch();
        const user  = useSelector(state => state.user);

        const schema = Joi.object({
            username: Joi.string()
                .regex(/^[[a-zA-ZА-яёЁіІїЇ]{2,20}$/).messages({
                    'string.empty': '"username" can\'t be an empty field',
                    'string.pattern.base': '"username" can be letters, 2-30 length',

                }),
            password: Joi.string()
                .regex(/^[a-zA-Z0-9]+$/).messages({
                    'string.empty': '"password" can\'t be empty',
                    'string.pattern.base': '"password" cab be numbers and letters, 3-30 length'
                }),

            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).messages({
                    'string.empty': '"email" can\'t be empty',
                    'string.email': 'Not allowed email'
                }),
            passwordConfirm: Joi.string().valid(Joi.ref('password')).messages({
                'any.only': '"confirm password" should be equal password'
            }),
        })

        // const validateField = (name, value) =>{
        //     const fieldValidator = RegistrationValidator[name];
        //     const message = validateValue(value, fieldValidator);
        //     return message
        // }
        const validateProperty = (name, value) => {
            const validationResult = RegistrationValidator.validate({[name]: value});
            if (!validationResult.error) {
                return null
            }
            setStateDisabled(false)

            if (name === 'passwordConfirm') {
                if (value === state.password && !errors.username && state.username && !errors.password && state.password && !errors.email && state.email) {
                    setStateDisabled(true)
                }
            }
            return validationResult.error.message
        }

        const handleChange = (e) => {
            console.log(schema)
            setState({...state, [e.target.name]: e.target.value.trim()});
            setErrors({...errors, [e.target.name]: validateProperty(e.target.name, e.target.value.trim(), schema)})
        }

        const handleSubmit = (e) => {
            e.preventDefault();
           dispatch(authAction.registration({user: state}))
            handleClick()
            dispatch(authAction.resetUsernameError())
        }

        return (
            <Container>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input placeholder="username" type="text" onChange={handleChange} name="username"
                               value={state.username || ''}
                        />

                        <Input placeholder="email" type="text" onChange={handleChange} name="email"
                               value={state.email || ''}
                        />
                        <Input placeholder="phone" type="text" onChange={handleChange} name="phone"
                               value={state.phone || ''}
                        />
                        <Input placeholder="password" onChange={handleChange} name="password"
                               value={state.password || ''}
                        />
                        <Input placeholder="confirm password" onChange={handleChange}
                               value={state.passwordConfirm || ''}
                               name="passwordConfirm"/>
                        <Agreement>
                            By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>PRIVACY POLICY</b>
                        </Agreement>
                        <Button disabled={!stateDisabled} type='submit'>
                            CREATE
                        </Button>
                        <div>{errors?.username && <Error>{errors.username}</Error>}</div>
                        <div>{errors?.password && <Error>{errors.password}</Error>}</div>
                        <div>{errors?.email && <Error>{errors.email}</Error>}</div>
                        <div>{errors?.phone && <Error>{errors.phone}</Error>}</div>
                        <div>{errors?.passwordConfirm && !stateDisabled && <Error>{errors.passwordConfirm}</Error>}</div>
                    </Form>
                    {(user.username || user.error) &&<CustomizedSnackbars setOpen={setOpen} username={user.username} error={user.error} open={open}/>}

                </Wrapper>
            </Container>
        );
    }
;

export default Registration;