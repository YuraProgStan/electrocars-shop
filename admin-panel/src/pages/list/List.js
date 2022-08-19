import React from 'react';
import  './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import UserDatatable from "../../components/usertable/UserDatatable";
import BrandDatatable from "../../components/brandtable/BrandDatatable";
import ModelDatatable from "../../components/modeltable/ModelDatatable";
// import ProductDatatable from '../../components/productdatatable/ProcuctDatatable';

const List = ({type}) => {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                {/*{type === "products" && <ProductDatatable />}*/}
                {type === "users" && <UserDatatable />}
                {type === "brands" && <BrandDatatable />}
                {type === "models" && <ModelDatatable />}
            </div>
        </div>
    );
};

export default List;