// Contiene la lógica de negocio y coordina la comunicación entre el Controller y el Repositorys
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
    buscarUsuarioPorCorreoRepository,
    crearUsuarioRepository,
} from '../repositories/auth.repository.js';

export const registrarUsuarioService = async ({
    nombre,
    correo,
    password,
}) => {

    const existe = await buscarUsuarioPorCorreoRepository(correo);

    if (existe) {
        throw new Error('El correo ya está registrado');
    }

    //se convierte la contraseña en un Hash, con 10 numero de rondas de cifrado
    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await crearUsuarioRepository({
        nombre,
        correo,
        password: passwordHash,
    });

    return {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
    };
};

export const loginService = async ({ correo, password }) => {

    const usuario = await buscarUsuarioPorCorreoRepository(correo);

    if (!usuario) {
        throw new Error('Credenciales inválidas');
    }

    const coincide = await bcrypt.compare(
        password,
        usuario.password
    );

    if (!coincide) {
        throw new Error('Credenciales inválidas');
    }

    // Crea un JSON web token cuando el usuario inicia sesion correctamente
    const token = jwt.sign(
        {
            id: usuario.id, // Payload información que se guarda dentro del Token
            correo: usuario.correo,
        },
        process.env.JWT_SECRET, // clave para firmar el token
        {
            expiresIn: '1h', // parametros adicionales
        },
    );

    return token;
};