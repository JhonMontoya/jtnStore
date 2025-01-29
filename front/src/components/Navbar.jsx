import { useState } from "react";
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar, Tooltip, Container, IconButton, Typography, Avatar, Menu, MenuItem, Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logo from "../assets/LogoMenu.svg";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from 'react-router-dom';

export default function Navbar() {

  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem('token');
  const User = token ? jwtDecode(token) : null;
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.removeItem('token');
    navigate('/', {replace: true});
    window.location.reload();
  };

  const handleClose = () =>{
    setAnchorEl(null);
  };

  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0.01 }}>
            <img src={Logo} alt="Logo" width="50" height="50" />
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Store
            </Typography>
          </Box>

          {User == null ? (
            <Box sx={{flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
              <Button 
              variant="contained"
              color="primary"
              href="/login"
              endIcon={<AccountBoxIcon/>}
              >
              Ingresar
              </Button>
            </Box>
          ):(
            <>
            <Box sx={{ display: "flex", flexGrow: 0 }}>
              <Button
                  key="products"
                  href="/products"
                  sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'underline' }}
              >
                Productos
              </Button>
              
            </Box>
            <Box sx={{flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
              <Tooltip title = "setting user">
                <IconButton sx={{p:0}} onClick={(e) => setAnchorEl(e.currentTarget)}>
                  {User.profileImageUrl  ? (
                    <Avatar src={User.profileImageUrl} alt={User.name} />
                  ):(
                    <Avatar {...stringAvatar(User.name)} alt={User.name} sx={{bgcolor: deepOrange[500]}}/>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-user"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                <MenuItem onClick={handleLogin}>Salir</MenuItem>
              </Menu>
            </Box>
            </>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  User: PropTypes.shape({
    name: PropTypes.string,
    profileImageURL: PropTypes.string,
  }),
};


function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  const nameParts = name.split(' ');
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${nameParts[0][0]}${nameParts[1] ? nameParts[1][0] : ''}`,
  };
}