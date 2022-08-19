import React, {useCallback, useContext, useEffect, useState} from 'react';
import './brand.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from "../../components/chart/Chart";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import PublishIcon from '@mui/icons-material/Publish';
import {useDispatch, useSelector} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {userActions} from '../../redux/slices/userSlice';
import {BrandValidator, UserUpdateValidator} from "../../validation";
import Error from "../../components/error/Error";
import {productActions} from "../../redux/slices/productSlice";
import srcBrand from '../../images/brand.png'

const formData = new FormData();

const Brand = () => {
    // const [firstRender, setFirstRender] = useState(false);
    const params = useParams();
    const {brandId} = params
    const dispatch = useDispatch();
    const brands = useSelector(state => state.product.allBrands);

    const findBrand = brands?.find(item => item.id === Number(brandId));
    const [brand, setBrand] = useState(findBrand);



    const {register, handleSubmit, formState: {errors, isValid}} =
        useForm({resolver: joiResolver(BrandValidator), mode: 'onTouched'});

    const onSubmit = async (data) => {
        try {
         const brand =   await dispatch(productActions.updateBrandById({id: brandId, data}));
            setBrand(brand.payload);

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='single'>
            <Sidebar/>
            {brand && <div className={'singleContainer'}>
                <Navbar/>
                <div className="top">
                    <div className="left">
                        {/*<div className="editButton">Edit</div>*/}
                        <h1 className="title">Brand</h1>
                        <div className="item">
                            <img
                                src={srcBrand}
                                className="itemImg" alt={brand.name}/>
                            <div className="details">
                                <h1 className="itemTitle">{brand.name}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Id: </span>
                                    <span className="itemValue">{brand.id}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title={'Brand Spending (Last 6 Month)'}/>
                    </div>
                </div>
                <div className="bottom">
                    <form className="productForm"
                          onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="productFormLeft">
                            <label>Name</label>
                            <input type="text" {...register('name')} placeholder={brand.name}
                                   defaultValue={brand.name}/>
                            {errors.name && <Error>{errors.name.message}</Error>}

                        </div>
                        <div className="userFormRight">
                            <button disabled={!isValid} className={'brandButton'}>Update</button>

                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
};

export default Brand;