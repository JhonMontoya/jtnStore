import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const URL_API = "http://localhost:3000/productos";

const categorias = ["Tecnología", "Hogar", "Deportes", "Moda", "Juguetes", "Libros", "Electrodomésticos", "Mascotas", "Otros"];

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

export default function RegProductos() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!token) {
      alert('No tienes permisos para acceder a esta página');
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const handleData = (e) => {
    const { id, value } = e.target;
    setProducts({ ...products, [id]: value });
  };
  const handleSelectData = (e) => {
    setProducts({ ...products, category: e.target.value });
    };  

  const handleCreateProduct = () => {
    axios.post(URL_API, products, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        alert(response.data.message);
        navigate('/');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        }
      });
  };

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            padding: '0',
            margin: '0',
            background:"rgba(0, 0, 0, 0.97)",
          }}
        >
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
            marginTop: '80px', 
            marginBottom: '80px', 
          }}>
            <Typography 
              variant="h4" 
              color="white"
              textAlign="center"
              fontFamily='Comic Sans MS'
              fontWeight='bold'
            >
              Añade tu Producto
            </Typography>
            <TextField required
              id="name"
              label="Nombre"
              variant="outlined"
              type='text'
              value={products.name}
              onChange={handleData}
            />
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <TextField required
                id="price"
                label="Precio"
                variant="outlined"
                type='number'
                value={products.price}
                onChange={handleData}
                sx={{ flex: 1 }}
              />
              <TextField required
                id="stock"
                label="Stock"
                variant="outlined"
                type='number'
                value={products.stock}
                onChange={handleData}
                sx={{ flex: 1 }}
              />
            </Box>
            <TextField required
              id="description"
              label="Descripción"
              variant="outlined"
              type='text'
              multiline
              rows={4}
              value={products.description}
              onChange={handleData}
            />
            <TextField required
              select
              id="category"
              label="Categoría"
              variant="outlined"
              value={products.category}
              onChange={handleSelectData}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              InputProps={{
                style: { color: 'white' },
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      backgroundColor: 'rgba(0, 0, 0, 0.89)',
                      color: 'white',
                    },
                  },
                },
              }}
            >
              {categorias.map((categoria, index) => (
                <MenuItem key={index} value={categoria} style={{ color: 'white' }}>
                  {categoria}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="imageUrl"
              label="URL de la imagen"
              variant="outlined"
              type='text'
              value={products.imageUrl}
              onChange={handleData}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProduct}
            >
              Crear Producto
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
      <Footer />
    </div>
  );
}
