import React, {useCallback, useContext, useEffect, useState} from 'react';
import './user.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from "../../components/chart/Chart";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import PublishIcon from '@mui/icons-material/Publish';
import {useDispatch, useSelector} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {userActions} from '../../redux/slices/userSlice';
import {UserUpdateValidator} from "../../validation";
import Error from "../../components/error/Error";

const formData = new FormData();

const User = () => {
    // const [firstRender, setFirstRender] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    // if (!firstRender) {
    //     dispatch(userActions.clearCurrentUser());
    //     setFirstRender(true);
    // }
    const [file, setFile] = useState(null);
    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const findUser = useSelector(state => state.user.allUsers.find(user => user.id === Number(params.userId)));
    const [user, setUser] = useState(findUser);
    // const user = useSelector(state => state.user.currentUser);
    const [preview, setPreview] = useState(null);

    console.log('preview =', preview);

    // useEffect(() => {
    //     dispatch(userActions.setCurrentUser(Number(params.userId)));
    // }, [])

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
    const {register, handleSubmit, watch, reset, formState: {errors, isValid}} =
        useForm({resolver: joiResolver(UserUpdateValidator), mode: 'onTouched'});
    const watchShowChangePassword = watch('changePassword', false); // you can supply default value as second argument
    // const values = watch();
    const onSubmit = async (data) => {
        if (Array.from(formData.keys()).length) {
            for (let key of formData.keys()) {
                formData.delete(key)
            }
        }
        try {
            if (file) {
                formData.append('avatar', file, file.name)
            }
            if (user.username !== data.username) {
                formData.append('username', data.username)
            }
            if (user.email !== data.email) {
                formData.append('email', data.email)
            }
            if (user.status !== data.status) {
                formData.append('status', data.status)
            }
            if (user.role !== data.role) {
                formData.append('role', data.role)
            }
            if (data.password) {
                formData.append('password', data.password)
            }
            if (data.phone && user.phone !== data.phone) {
                formData.append('phone', data.phone)
            }
            console.log(formData.get('username'))
            console.log(formData.get('email'))
            console.log(formData.get('phone'))
            console.log(formData.get('status'))
            console.log(formData.get('password'))

            const updateUser = await dispatch(userActions.updateUserById({id: user.id, formData}));
            reset({
                changePassword: false
            })
            console.log(updateUser.payload);
            setUser(updateUser.payload)


        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='single'>
            <Sidebar/>
            {user && <div className={'singleContainer'}>
                <Navbar/>
                <div className="top">
                    <div className="left">
                        {/*<div className="editButton">Edit</div>*/}
                        <h1 className="title">User</h1>
                        <div className="item">
                            {/*<img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" className="itemImg"/>*/}
                            <img
                                src={user.avatar ? `${process.env.REACT_APP_API}/avatars/${user.avatar} ` : "https://www.kindpng.com/picc/m/22-223887_no-avatar-png-cartoon-boy-no-face-transparent.png"}
                                className="itemImg" alt={user.username}/>
                            <div className="details">
                                <h1 className="itemTitle">{user.username}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Id: </span>
                                    <span className="itemValue">{user.id}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email: </span>
                                    <span className="itemValue">{user.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Status: </span>
                                    <span className="itemValue">{!user.status ? 'Pending' : 'Active'}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Role: </span>
                                    <span className="itemValue">{user.role}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title={'User Spending (Last 6 Month)'}/>
                    </div>
                </div>
                <div className="bottom">
                    <form className="productForm"
                          onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="productFormLeft">
                            <label>User Name</label>
                            <input type="text" {...register('username')} placeholder={user.username}
                                   defaultValue={user.username}/>
                            {errors.username && <Error>{errors.username.message}</Error>}
                            <label>Email</label>
                            <input type="text" {...register('email')} placeholder={user.email}
                                   defaultValue={user.email}/>
                            {errors.email && <Error>{errors.email.message}</Error>}
                            <label>Phone</label>
                            <input type="text" {...register('phone')}
                                   placeholder={user.phone ? user.phone : "+380673845421"}
                                   defaultValue={user.phone ? user.phone : ""}/>
                            {errors.phone && <Error>{errors.phone.message}</Error>}
                            <label>Status allowed email</label>
                            <select   {...register('status')} defaultValue={user.status}>
                                <option value="true">Active</option>
                                <option value="false">Pending</option>
                            </select>
                            <label>Role</label>
                            <select  {...register('role')} defaultValue={user.role}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                            {errors.status && <Error>{errors.status.message}</Error>}
                            {/* {errors &&  <Error>Errors:{JSON.stringify(errors)}</Error>}*/}
                            {/*<Error>IsValid: {JSON.stringify(isValid)}</Error>*/}
                            {/*<Error>Form value: {JSON.stringify(values)}</Error>*/}
                            <label>Change password<input name='change-password' id="change-password" type="checkbox"
                                                         placeholder="Change Password" {...register("changePassword")} /></label>
                            {watchShowChangePassword && <> <label>Password</label>
                                <input type="password" {...register('password')} placeholder="some password"/>
                                {errors.password && <Error>{errors.password.message}</Error>}
                                <label>Confirm Password</label>
                                <input type="password" {...register('confirmPassword')} placeholder="confirm password"/>
                                {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
                            </>}
                        </div>
                        <div className="userFormRight">
                            <div className="userUpload">
                                <img
                                    src={preview || (user.avatar && `${process.env.REACT_APP_API}/avatars/` + user.avatar) || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                    alt=""
                                    className="userUploadImg"
                                />

                                <label htmlFor="file">
                                    <PublishIcon/>
                                </label>
                                <input type="file" id="file" name="avatar" onChange={selectFile}
                                       style={{display: "none"}}/>
                            </div>
                            <button disabled={!isValid} className="userButton">Update</button>

                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
};

export default User;