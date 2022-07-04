import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components';

const StyledMenuIcon = styled(MenuIcon)`
  cursor: pointer;
  color: ${props => props.theme.colors.buttonBlue};
`;
export default function TemporaryDrawer({cat}) {
const navigate = useNavigate()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {cat.map(item => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton onClick={() => navigate(`/${item.name.toLowerCase()}`)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                        <StyledMenuIcon onClick={toggleDrawer(anchor, true)}/>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    );
}