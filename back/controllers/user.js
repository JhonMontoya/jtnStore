const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

// Registro de usuario
const register = async (req, res) => {
    try {
        let { name, email, password, profileImageUrl } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Por favor, ingrese un nombre de usuario' });
        }
        const passwordError = validation.password(password);
        const emailError = validation.email(email);
        if (passwordError) {
            return res.status(400).json({ error: passwordError });
        }
        if (emailError) {
            return res.status(400).json({ error: emailError });
        }
        if(await User.findOne({ email })){
            return res.status(400).json({ error: 'El correo ya se encuentra registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, profileImageUrl });
        await newUser.save();
        const token = jwt.sign({name: newUser.name, email: newUser.email, profileImageUrl: newUser.profileImageUrl}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Usuario registrado correctamente', token });
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al registrar el usuario'});
    }
};

// Login de usuario
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailError = validation.email(email);
        const passwordError = validation.password(password);
        if (emailError) {
            return res.status(400).json({ error: emailError });
        }
        if (passwordError) {
            return res.status(400).json({ error: passwordError });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'La contraseña o el correo ingresado no es válido' });
        }
        const token = jwt.sign({name: user.name, email: user.email, profileImageUrl: user.profileImageUrl}, process.env.JWT_SECRET, { expiresIn: '1h' });
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
        res.json({ message: 'Usuario actualizado correctamente', name });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminación de usuario
const deleteUser = async (req, res) => {
    try {
        const emailError = validation.email(req.body.email);
        if (emailError) {
            return res.status(400).json({ error: emailError });
        }
        await User.findByOneAndDelete(req.body.email);        
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'El usuario no pudo ser eliminado' });
    }
};

// Validación de datos
class validation {
    static password(password) {
        if(!password)
            return 'Por favor, ingrese una contraseña';
        if (password.length < 8) 
            return 'La contraseña debe tener al menos 8 caracteres';
        if (typeof password !== 'string')
            return 'La contraseña debe contener caracteres';
        return undefined;
    }
    static email(email) {
        if(!email)
            return 'Por favor, ingrese un correo';
        if (typeof email !== 'string' || !email.includes('@'))
            return 'Por favor, ingrese un correo válido';
        return undefined;
    }
}

module.exports = {
    register,
    login,
    update,
    deleteUser,
};