import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validar que exista el header Authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  // Validar que el header tenga formato "Bearer token"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validamos que el perfil sea admin (case insensitive)
    if (decoded.perfil?.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    console.log("✅ Usuario verificado como admin:", decoded);

    // Adjuntamos el usuario decodificado para que lo use el siguiente middleware o controlador
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
