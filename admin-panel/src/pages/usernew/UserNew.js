import React, {useEffect, useState} from 'react';
import './userNew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {DriveFolderUploadOutlined} from "@mui/icons-material";
import {userInputs} from '../../formSource';

import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {UserCreateValidator, UserValidator} from '../../validation';
import {userActions} from '../../redux/slices/userSlice';
import Error from '../../components/error/Error';
import {useNavigate} from "react-router-dom";

const formData = new FormData();
const UserNew = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const selectFile = e => {
        setFile(e.target.files[0]);
    }
    useEffect(() => {
        if (!file) {
            setPreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])
    const {register, handleSubmit, formState: {errors, isValid}} =
        useForm({resolver: joiResolver(UserCreateValidator), mode: 'onTouched'});
    // const [files, setFiles] = useState('');
    // const [info, setInfo] = useState({});
    // const [rooms, setRooms] = useState([]);
    // const {data, loading, error} = useFetch(`/rooms`);
    const onSubmit = async (data) => {
        try {
            if (file) {
                formData.append('avatar', file, file.name);
            }
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('status', data.status);
            formData.append('role', data.role);

            if (data.phone) {
                formData.append('phone', data.phone)
            }

            await dispatch(userActions.createUser(formData));

            // navigate('/users');

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
                    <h1>Add New User</h1>
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
                                    name="avatar"
                                    onChange={selectFile}
                                    style={{display: "none"}}
                                />
                            </div>
                            {userInputs.map(input => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} {...register(input.name)} placeholder={input.placeholder}/>
                                    {errors[input.name] && <Error>{errors[input.name].message}</Error>}
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Status</label>
                                <select id="status" {...register('status')} defaultValue={false}>
                                    <option value={false}>Pending</option>
                                    <option value={true}>Active</option>
                                </select>
                            </div>
                            <div className="formInput">
                                <label>Role</label>
                                <select id="role" {...register('role')} defaultValue={'USER'}>
                                    <option value={'USER'}>User</option>
                                    <option value={'ADMIN'}>Admin</option>
                                </select>
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

export default UserNew;