import Joi from 'joi';

// Define the validation schema for the user creation
export const userSchema = Joi.object({
	userId: Joi.number().required(),
	username: Joi.string().required(),
	password: Joi.string().required(),
	fullName: Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
	}).required(),
	age: Joi.number().required(),
	email: Joi.string().email().required(),
	isActive: Joi.boolean().required(),
	hobbies: Joi.array().items(Joi.string()).required(),
	address: Joi.object({
		street: Joi.string().required(),
		city: Joi.string().required(),
		country: Joi.string().required(),
	}).required(),
});

// Validation function for user creation
export const validateUser = (data: any) => {
	return userSchema.validate(data, { abortEarly: false });
};
