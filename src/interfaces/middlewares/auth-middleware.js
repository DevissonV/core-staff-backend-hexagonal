import jwt from 'jsonwebtoken';
import { envs } from '../../infrastructure/config/envs.js';
import { errorResponse } from '../../utils/response/response.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return errorResponse(res, 'Access denied. No token provided.', 401);
  }

  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    return errorResponse(res, 'Invalid token.', 400);
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return errorResponse(res, 'Access denied.', 403);
  }
  next();
};