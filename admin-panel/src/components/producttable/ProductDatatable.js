import "./productdatatable.scss";
import {DataGrid} from "@mui/x-data-grid";
import {productColumns, userRows} from '../../datatablesource';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteProduct, getProducts} from "../../redux/api.calls";
import {useDispatch, useSelector} from "react-redux";

const ProductDatatable = () => {
    const [data, setData] = useState(userRows);
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products)
    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch])
    const handleDelete = (id) => {

        // setData(data.filter((item) => item.id !== id));
        deleteProduct(id,dispatch)
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/products/${params.row._id}`} style={{textDecoration: "none"}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
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
                <Link to="/products/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={products}
                columns={productColumns.concat(actionColumn)}
                getRowId={row => row._id}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default ProductDatatable;