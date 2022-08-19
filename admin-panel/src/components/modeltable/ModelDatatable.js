import "./modeldatatable.scss";
import {DataGrid} from "@mui/x-data-grid";
import {modelColumns, userColumns, userRows} from '../../datatablesource';
import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux/slices/userSlice";
import {RouterContext} from "../../context/previousUrlContext";
import {productActions} from "../../redux/slices/productSlice";

const ModelDatatable = () => {
    const dispatch = useDispatch();
    const models = useSelector(state => state.product.allModels);
    useEffect(() => {
        dispatch(productActions.model());

    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(productActions.delModelById(id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/models/${params.row.id}`} style={{textDecoration: "none"}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/models/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={models}
                columns={modelColumns.concat(actionColumn)}
                getRowId={row => row.id}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default ModelDatatable;