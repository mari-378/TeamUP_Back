import {body} from 'express-validator';

export const userValidation = [
  body("nome").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("O email deve ser válido"),
  body("senha").isLength({min: 8}).withMessage("A senha deve ter no mínimo 8 caracteres"),
];