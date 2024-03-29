import React, {useContext} from 'react';
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";
import {DarkModeContext} from "../../context/darkModeContext";
import {ElectricCar, ElectricCarOutlined} from "@mui/icons-material";

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext);
    return (
        <div className={'sidebar'}>
            <div className="top">
                <Link to={'/'} style={{textDecoration: 'none'}}><span className="logo">My admin</span></Link>

            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className={'icon'}/>
                        <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>
                    <Link to={'/users'} style={{textDecoration: 'none'}}>
                        <li>
                            <PersonOutlineIcon className={'icon'}/>
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to={'/brands'} style={{textDecoration: 'none'}}>
                        <li>
                            <ElectricCar className={'icon'}/>
                            <span>Brands</span>
                        </li>
                    </Link>
                    <Link to={'/models'} style={{textDecoration: 'none'}}>
                        <li>
                            <ElectricCarOutlined className={'icon'}/>
                            <span>Models</span>
                        </li>
                    </Link>
                    <Link to={'/products'} style={{textDecoration: 'none'}}>
                        <li>
                            <AddBusinessIcon className={'icon'}/>
                            <span>Products</span>
                        </li>
                    </Link>
                    <li>
                        <LocalShippingIcon className={'icon'}/>
                        <span>Delivery</span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                        <BarChartIcon className={'icon'}/>
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className={'icon'}/>
                        <span>Notifications</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamIcon className={'icon'}/>
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyIcon className={'icon'}/>
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsIcon className={'icon'}/>
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <AccountBoxIcon className={'icon'}/>
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutIcon className={'icon'}/>
                        <span>Logout</span>
                    </li>

                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({type: 'LIGHT'})}></div>
                <div className="colorOption"  onClick={() => dispatch({type: 'DARK'})}></div>
            </div>
        </div>
    );
};

export default Sidebar;