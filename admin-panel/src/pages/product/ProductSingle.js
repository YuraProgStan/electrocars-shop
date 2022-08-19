import React, {useEffect, useMemo, useState} from 'react';
import './productsingle.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from "../../components/chart/Chart";
import OrderTable from "../../components/ordertable/OrderTable";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PublishIcon from '@mui/icons-material/Publish';
import {userService} from "../../services/user.service";
import {orderService} from "../../services/order.service";


const ProductSingle = () => {
    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const [pStats, setPStats] = useState([]);
    const MONTH = useMemo(
        () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ], []);
    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await orderService.getIncome(productId);
                console.log(res.data);
                const sortList = res.data.sort((a,b) => a._id - b._id);
                sortList.map(item => {
                    setPStats(prev => [
                        ...prev,
                        {name: MONTH[item._id - 1], 'Total': item.total}
                    ])
                })
            } catch (err) {

            }
        }
        getStats();
    }, [MONTH]);
console.log('pStats = ',pStats);
    const product = useSelector(state =>
        state.product.products.find(product => product._id === productId));
    return (
        <div className='single'>
            <Sidebar/>
            <div className={'singleContainer'}>
                <Navbar/>
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src={product.img} alt="" className="itemImg"/>
                            <div className="details">
                                <h1 className="itemTitle">{product.title}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Id: </span>
                                    <span className="itemValue">{product._id} </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Sales: </span>
                                    <span className="itemValue">5123 </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">in stock: </span>
                                    <span className="itemValue">{product.inStock}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} data={pStats} title={'Sales Performance'}/>
                    </div>
                </div>
                <div className="bottom">
                    <form className="productForm">
                        <div className="productFormLeft">
                            <label>Product Name</label>
                            <input type="text" placeholder={product.title}/>
                            <label>Product Description</label>
                            <input type="text" placeholder={product.desc}/>
                            <label>Price</label>
                            <input type="text" placeholder={product.price}/>
                            <label>In Stock</label>
                            <select name="insStock" id="idStock">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="productFormRight">
                            <div className="productUpload">
                                <img
                                    src={product.img}
                                    alt=""
                                    className="productUploadImg"
                                />
                                <label htmlFor="file">
                                    <PublishIcon/>
                                </label>
                                <input type="file" id="file" style={{display: "none"}}/>
                            </div>
                            <button className="productButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductSingle;