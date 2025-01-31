import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {Box,Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Avatar, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/productos';

const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        alert(error.response.data.error);
        return [];
    }
}

export default function Cards() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const User = token ? jwtDecode(token) : null;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            const newProducts = products.filter((product) => product._id !== id);
            setProducts(newProducts);
            alert('Producto eliminado correctamente');
            window.location.reload();
        } catch (error) {
            alert(error.response.data.error);
        }
    };
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <Box 
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
                padding: '0',
                margin: '0',
                marginTop: '0px',
                background:"rgba(7, 0, 71, 0.7)",
            }}
        >
            {!products ? (
                <Typography 
                variant="h2" align="center"
                >
                    No hay productos
                </Typography>
            ):(
            <Grid container spacing={2} justifyContent="center">
                {products.map((product, index) =>(
                    <Grid item key={index}>
                        <Card sx={{maxWidth: 345}}>
                            <CardHeader
                                avatar={
                                    User!=null ? (
                                    User.profileImageUrl  ? (
                                        <Avatar src={User.profileImageUrl} alt={User.name} />
                                      ):(
                                        <Avatar {...stringAvatar(User.name)} alt={User.name} sx={{bgcolor: deepOrange[500]}}/>
                                      )
                                    ) : (
                                        <Avatar src='https://thumbs.dreamstime.com/b/s%C3%ADmbolo-de-icono-plano-usuario-con-bloqueo-raster-bloqueado-estilo-imagen-aislado-sencillo-221619001.jpg'/>
                                    )
                                }
                                title={product.name}
                                subheader={product.price}
                                sx={{textAlign: 'center'}}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={product.imageUrl}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </CardContent>
                            {token && (
                                <CardActions disableSpacing sx={{justifyContent: 'flex-end'}}>
                                    <IconButton aria-label="Eliminar">
                                        <DeleteIcon 
                                        onClick={() => handleDelete(product._id)}
                                        />
                                    </IconButton>
                                    <IconButton aria-label="Editar">
                                        <EditIcon onClick={() => handleEdit(product._id)} />
                                    </IconButton>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
            )}
        </Box>
    )
}

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