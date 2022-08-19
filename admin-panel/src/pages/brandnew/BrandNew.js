import React, {useEffect, useState} from 'react';
import './brandNew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {DriveFolderUploadOutlined} from "@mui/icons-material";
import {brandInputs, userInputs} from '../../formSource';

import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {BrandValidator, UserCreateValidator, UserValidator} from '../../validation';
import {userActions} from '../../redux/slices/userSlice';
import Error from '../../components/error/Error';
import {useNavigate} from "react-router-dom";
import {productActions} from "../../redux/slices/productSlice";

const BrandNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {register, handleSubmit, formState: {errors, isValid}} =
        useForm({resolver: joiResolver(BrandValidator), mode: 'onTouched'});

    const onSubmit = async (data) => {
        try{
            await dispatch(productActions.createBrand(data));

            navigate('/brands');

        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div className='new'>
            <Sidebar/>
            <div className="newContainer">
                <Navbar/>
                <div className="top">
                    <h1>Add New Brand</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form className="productForm"
                              onSubmit={handleSubmit(onSubmit)}>
                            {brandInputs.map(input => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} {...register(input.name)} placeholder={input.placeholder}/>
                                    {errors[input.name] && <Error>{errors[input.name].message}</Error>}
                                </div>
                            ))}
                            <div className="formInput">
                            <button disabled={!isValid} className="userButton">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandNew;