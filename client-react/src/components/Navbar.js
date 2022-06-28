import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Badge from '@mui/material/Badge';
import {Search, ShoppingCartOutlined} from "@mui/icons-material";
import {theme} from "../theme";
import TemporaryDrawer from "./TemporaryDrawer";
import {data} from "../data";
const Container = styled.div`
  height: 60px;
  position: fixed;
  width: 100%;
  background-color: ${props => props.theme.colors.light};
  z-index: 200;
  `;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const SearchContainer = styled.span`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 4px;
`
const Input = styled.input`
  border: none;
  background-color: ${props => props.theme.colors.light};
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled(Link)`
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  color: teal;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: ${props => props.theme.colors.main};
  &:hover{
    text-decoration: underline;
  }

`
const LinkStyled = styled(Link)`
    text-decoration: none;
  color: ${props => props.theme.colors.main}; 
  &:hover{
    text-decoration: underline;
  }
  `
const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
        color: `${theme.colors.light}`,
        backgroundColor: `${theme.colors.main}`
    }
});
const Navbar = () => {
    const cat = data.category;
    const quantity = 4
    return (
        <Container>
            <Wrapper>
                <Left>
                   <TemporaryDrawer text={'Menu'} cat={cat} />
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <Search style={{color: 'gray', fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center><Logo to={'/'}>Electrocars</Logo></Center>
                <Right>
                    <MenuItem><LinkStyled to = {'/register'}>REGISTER</LinkStyled></MenuItem>
                    <MenuItem><LinkStyled to = {'/login'}>SignIn</LinkStyled></MenuItem>
                    <MenuItem>Logout</MenuItem>
                    <Link to={'/cart'}>
                        <MenuItem>
                            <StyledBadge badgeContent={quantity}>
                                <ShoppingCartOutlined sx={{color: theme.colors.main}}/>
                            </StyledBadge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;