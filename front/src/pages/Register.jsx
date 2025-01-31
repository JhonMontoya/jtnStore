import { useState } from "react";
import {Box, Button, IconButton, TextField, Typography, InputAdornment} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          },
        },
      },
    },
  });
  

export default function Register() {
    const [data, setData] = useState({name: '', email: '', password: '', profileImageUrl: ""});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handleData(e) {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleRegister = () => {
      axios.post('http://localhost:3000/usuarios/register', data)
      .then((response) => {
        alert(response.data.message);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error);
        } else {
            alert('Error al registrar el usuario');
        }
    });
    }

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                padding: '0',
                margin: '0',
                background: 'radial-gradient(circle,rgb(26, 34, 141) 10%,rgb(24, 21, 19) 80%)',
            }}>
                <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                }}>
                    <Typography variant="h4" sx={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontFamily: 'Comic Sans MS',
                    }}>
                        <Link to="/" >
                          <IconButton arial-label="Inicio" size="Large" sx={{marginRight: '10px'}}>
                            <HomeIcon sx={{color: 'white'}} />  
                          </IconButton>
                        </Link>
                        Registro de usuario
                    </Typography>
                    <TextField required
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        value={data.name}
                        onChange={handleData}
                    />
                    <TextField required
                        id="email"
                        label="Correo"
                        variant="outlined"
                        value={data.email}
                        onChange={handleData}
                    />
                    <TextField required
                        id="password"
                        label="Contraseña"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={data.password}
                        onChange={handleData}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  sx={{color: 'white'}}
                                  edge="end"
                                  size="small"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                    />
                    <TextField
                        id="profileImageUrl"
                        label="URL de imagen de perfil"
                        variant="outlined"
                        value={data.profileImageUrl}
                        onChange={handleData}
                    />
                    <Button 
                      variant="contained"
                      color = "primary"
                      endIcon = {<PersonAddIcon sx= {{ml: 2}}/>}
                      fullWidth
                      onClick = {handleRegister}
                      >
                        Registrarse
                      </Button>
                    <Typography variant="body2" sx={{
                        color: 'white',
                        textAlign: 'center',
                        marginTop: '20px',
                        fontFamily: 'Roboto',
                    }}>
                        ¿Ya tienes una cuenta? <Link to="/login" style={{color: 'white', textDecoration: 'underline'}}>Inciar sesión</Link>
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
};