import { useState } from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  
export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    return (
        <ThemeProvider theme={theme}>
        <Box sx={{
            display: 'flex',
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
                    Bienvenido
                    </Typography>
                <TextField 
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={handleEmail}
                />
                <TextField 
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={handlePassword}
                />
                <Button variant="contained" color="primary" size='large' startIcon={<LockOpenIcon sx={{mr: 2}} />} >
                    Iniciar sesión
                </Button>
                <Typography variant="body2" sx={{
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '20px',
                  fontFamily: 'Roboto',
                }}>
                ¿No tienes cuenta? <Link to="/register" style={{color: 'white', textDecoration: 'underline'}}>Regístrate</Link>
            </Typography>
            </Box>
        </Box>
        </ThemeProvider>
    );
}