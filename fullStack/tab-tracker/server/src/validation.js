// 验证
const Joi = require('@hapi/joi');

const registerValidation = data => {


    const schema = Joi.object({ 
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() 
    });

     // const validation = schema.validate(req.body);
    return schema.validate(data);

};

const loginValidation = data => {


    const schema = Joi.object({ 
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() 
    });

     // const validation = schema.validate(req.body);
    return schema.validate(data);

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;