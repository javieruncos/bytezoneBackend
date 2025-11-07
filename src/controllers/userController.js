import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, confirmPassword ,perfil} = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const userFound = await User.findOne({ email });
    //verificamos si el usuario ya esta registrado
    if (userFound) {
      return res.status(400).json({ message: "El usuario ya esta registrado" });
    }

    //creamos el usuario
    const newUser = new User({
      username,
      email,
      password,
      perfil
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //verificamos si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    //creamos el token
    const token = jwt.sign(
      { id: user._id, username: user.username, perfil: user.perfil },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Usuario logueado", token });
  } catch (error) {
    res.status(500).json({ message: "Error al loguear el usuario", error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // id que viene del token decodificado
    const user = await User.findById(userId).select("-password"); // excluimos la contraseña

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
  }
};


export const createUserByAdmin = async (req, res) => {
  try {
    const { username, email, password, perfil } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Para evitar que perfil venga vacío o inválido, podemos hacer:
    const userPerfil = perfil === "admin" ? "admin" : "usuario";

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      perfil: userPerfil,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario creado por admin" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // trae todos los usuarios
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};