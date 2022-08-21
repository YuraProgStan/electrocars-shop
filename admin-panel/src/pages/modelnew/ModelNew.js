import React, {useEffect, useState} from 'react';
import './modelNew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {DriveFolderUploadOutlined} from "@mui/icons-material";
import {modelInputs, } from '../../formSource';

import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {ModelCreateValidator} from '../../validation';
import Error from '../../components/error/Error';
import {productActions} from "../../redux/slices/productSlice";
import Editor from "../../components/editor/Editor";
import {useNavigate} from "react-router-dom";
import EditorFr from "../../components/editorfroala/EditorFr";


const a = 5;
const formData = new FormData();

function EditorFR() {
    return null;
}

const ModelNew = () => {
    const dispatch = useDispatch();
    const {allBrands: brands, loading} = useSelector(state => state.product);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {

        dispatch(productActions.brand());

    }, [dispatch]);

    useEffect(() => {
        if (!file) {
            setPreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);

    }, [file])
    const {register, handleSubmit, formState: {errors, isValid}} =
        useForm({resolver: joiResolver(ModelCreateValidator), mode: 'onTouched'});


    const onSubmit = async (data) => {
        try {
            // if (file) {
            //     formData.append('image', file, file.name);
            // }
            // formData.append('username', data.username);
            // formData.append('email', data.email);
            // formData.append('password', data.password);
            // formData.append('status', data.status);
            // formData.append('role', data.role);
            //
            // if (data.phone) {
            //     formData.append('phone', data.phone)
            // }

            // await dispatch(userActions.createUser(formData));

            // navigate('/users');

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='new'>
            <Sidebar/>
            <div className="newContainerModel">
                <Navbar/>
                <div className="top">
                    <h1>Add New Model</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={preview
                            ? preview
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        } alt=""/>
                    </div>
                    <div className="right">
                        <form className="productForm"
                              onSubmit={handleSubmit(onSubmit)}>
                            <div className="formInput">
                                Image: <label htmlFor={'file'}><DriveFolderUploadOutlined className={'icon'}/></label>
                                <input
                                    type="file"
                                    id="file"
                                    name="image"
                                    onChange={selectFile}
                                    style={{display: "none"}}
                                />
                            </div>
                            <div className="formInput">
                                <label>Choose a brand</label>
                                <select id="brandId" {...register('brandId')} defaultValue={false}>
                                    {loading
                                        ? "loading"
                                        : brands &&
                                        brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                </select>
                            </div>
                            {modelInputs.map(input => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    {!input.step
                                        ? <input type={input.type} {...register(input.name)}
                                                 placeholder={input.placeholder}

                                        />
                                        : <input type={input.type} {...register(input.name)}
                                                 placeholder={input.placeholder}
                                                 step={input.step} min={0.1}
                                        />
                                    }

                                    {errors[input.name] && <Error>{errors[input.name].message}</Error>}
                                </div>
                            ))}

                            {/*<div className="formInput">*/}
                            {/*    <label>Role</label>*/}
                            {/*    <select id="role" {...register('role')} defaultValue={'USER'}>*/}
                            {/*        <option value={'USER'}>User</option>*/}
                            {/*        <option value={'ADMIN'}>Admin</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                            <div className="textArea">
                                <label>Description</label>
                                {/*<Editor />*/}
                                <EditorFr/>
                            </div>
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

export default ModelNew;