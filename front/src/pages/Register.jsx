import { useState } from "react";
import {Box, Button, TextField, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Link} from 'react-router-dom';

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
    const [data, setData] = useState({name: '', email: '', password: '', profileImageURL: ''});

    function handleData(e) {
        setData({ ...data, name: e.target.value });
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
                        Registro de usuario
                    </Typography>
                    <TextField
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        value={data.name}
                        onChange={handleData}
                    />
                    <TextField
                        id="email"
                        label="Correo"
                        variant="outlined"
                        value={data.email}
                        onChange={handleData}
                    />
                    <TextField
                        id="password"
                        label="Contraseña"
                        variant="outlined"
                        value={data.password}
                        onChange={handleData}
                    />
                    <TextField
                        id="profileImageURL"
                        label="URL de imagen de perfil"
                        variant="outlined"
                        value={data.profileImageURL}
                        onChange={handleData}
                    />
                    <Button variant="contained" color = "primary" endIcon = {<PersonAddIcon sx= {{ml: 2}}/>} fullWidth>Registrarse</Button>
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