import React from 'react';
import CustomizedSnackbarLogin from "./CustomizedSnackbarLogin";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {DeliveryValidator, LoginValidator} from "../validation";
import {authActions} from "../redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {addDeliveryAddress} from "../redux/slices/cartSlice";
import {countryData} from "../countryData";

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.buttonBlue};
  padding: 10px;
  border-radius: 10px;
`
const Title = styled.h3`
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
`;
const Group = styled.div`
    display: flex;
  gap: 10px;
  justify-content: space-around;
`
const Box = styled.div`
    flex: 1;
`
const Label = styled.label`
  display: flex;
  justify-content: space-between;
`
const Button = styled.button`
  background-color: ${props => props.theme.colors.buttonBlue};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  width: fit-content;
  &:disabled{
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const Error = styled.span`
  color: red
`

const Datalist =styled.datalist`
`
const Option = styled.option`
`
const AddressDelivery = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isValid}} =
        useForm({resolver: joiResolver(DeliveryValidator), mode: 'onTouched'});

    const onSubmit = async (data) => {
        try {

            await dispatch(addDeliveryAddress({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                streetAddress: data.streetAddress,
                aptNumber: data.aptNumber,
                country:data.country,
                city: data.city,
                zip: data.zip,


            }));
            // if (currentUser) {
            //     if (state?.pathname) {
            //         navigate(state.pathname === 'login' ? '/' : state.pathname, {replace: true})
            //     } else {
            //         navigate('/');
            //     }
            //
            // }
        } catch (err) {
            console.log(err)

        }
    }
    return (
        <Wrapper>
            <Title>Add New Address</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Group>
                    <Box>
                        <Label>First Name</Label>
                        <Input type="text" {...register('firstName')} placeholder="Yura"/>
                    </Box>
                    <Box>
                        <Label>Last Name</Label>
                        <Input type="text" {...register('lastName')} placeholder="Sidorenko"/>
                    </Box>
                    <Box>
                        <Label>Phone</Label>
                        <Input type="text" {...register('phone')} placeholder="+380674433520"/>
                    </Box>
                </Group>
                <Group>
                <Box>
                <Label>Street Address</Label>
                <Input type="text" {...register('streetAddress')} placeholder="37 Some Street"/>
                </Box>
                <Box>
                    <Label>Apt Number</Label>
                    <Input type="number" {...register('aptNumber')} min="1" placeholder="30"/>
                </Box>
                </Group>
                <Group>
                    <Box>
                        <Label>Country</Label>
                        <Input list="countries" {...register('country')}/>
                        <Datalist id="countries">
                            {countryData.map(item=>
                                <Option key={item} value={item} />
                           )}
                        </Datalist>

                    </Box>
                    <Box>
                        <Label>City</Label>
                        <Input type="text" {...register('city')} placeholder="New York"/>
                    </Box>
                    <Box>
                        <Label>Zip</Label>
                        <Input type="text" {...register('zip')} placeholder="10011"/>
                    </Box>
                </Group>
                <Button disabled={!isValid}>Use This Address</Button>
                {errors.firstName && <Error>{errors.firstName.message}</Error>}
                {errors.lastName && <Error>{errors.lastName.message}</Error>}
                {errors.phone && <Error>{errors.phone.message}</Error>}
                {errors.streetAddress && <Error>{errors.streetAddress.message}</Error>}
                {errors.aptNumber && <Error>{errors.aptNumber.message}</Error>}
                {errors.city && <Error>{errors.city.message}</Error>}
                {errors.zip && <Error>{errors.zip.message}</Error>}
                {/*{error && <CustomizedSnackbarLogin setOpen={setOpen} open={open} error={error}/>}*/}
            </Form>

        </Wrapper>
    );
};

export default AddressDelivery;