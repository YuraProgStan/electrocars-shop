import "./userdatatable.scss";
import {DataGrid} from "@mui/x-data-grid";
import {userColumns, userRows} from '../../datatablesource';
import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux/slices/userSlice";
import {RouterContext} from "../../context/previousUrlContext";

const UserDatatable = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.allUsers);
    // console.log('========')
    // const route = useContext(RouterContext)
    // console.log(route.from, route.to);
    // console.log('========')
    useEffect(() => {
        dispatch(userActions.allUsers());

    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(userActions.delUserById(id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/users/${params.row.id}`} style={{textDecoration: "none"}}>
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
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={users}
                columns={userColumns.concat(actionColumn)}
                getRowId={row => row.id}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default UserDatatable;