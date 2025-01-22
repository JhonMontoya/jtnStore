const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();


const router = express.Router();

// Registro de usuario
const register = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, profileImageUrl });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado correctamente'});
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al registrar el usuario'});
    }
};

// Login de usuario
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'La contraseña o el correo ingresado no es válido' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sección' });
    }
};

// Modificación de usuario
const update = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password: hashedPassword, profileImageUrl },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminación de usuario
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'El usuario no pudo ser eliminado' });
    }
};

module.exports = {
    register,
    login,
    update,
    deleteUser,
};