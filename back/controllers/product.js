const Prduct = require('../models/product');

//Crear productos
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;
        const newProduct = new Prduct({ name, description, price, category, stock, imageUrl });
        await newProduct.save();
        res.status(201).json({ message: 'Producto creado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al crear el producto' });
    }

};

//Obtener productos

const getProducts = async (req, res) => {
    try {
        const products = await Prduct.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

//Obtener producto por id
const getProductById = async (req, res) => {
    try {
        const product = await Prduct.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

//Actualizar producto
const updateProduct = async (req, res) => { 
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;
        const updatedProduct = await Prduct.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, stock, imageUrl },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

//Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        await Prduct.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};