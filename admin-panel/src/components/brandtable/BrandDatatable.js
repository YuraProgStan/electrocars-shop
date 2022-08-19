import "./branddatatable.scss";
import {DataGrid} from "@mui/x-data-grid";
import {Link} from 'react-router-dom';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../redux/slices/productSlice";
import {brandColumns} from "../../datatablesource";

const BrandDatatable = () => {
    const dispatch = useDispatch();
    const brands = useSelector(state => state.product.allBrands);

    useEffect(() => {

        dispatch(productActions.brand());

    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(productActions.delBrandById(id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/brands/${params.row.id}`} style={{textDecoration: "none"}}>
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
                Add New Brand
                <Link to="/brands/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={brands}
                columns={brandColumns.concat(actionColumn)}
                getRowId={row => row.id}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default BrandDatatable;