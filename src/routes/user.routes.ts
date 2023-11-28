import express, { Request, Response } from 'express';
import { IUser, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { validateUser } from '../validators/user.validator';

const router = express.Router();

router.post('/api/users', async (req: Request, res: Response) => {
	try {
		// Validate the request body
		const validationResult = validateUser(req.body);
		if (validationResult.error) {
			return res.status(400).json({
				success: false,
				message: 'Invalid request data',
				error: validationResult.error.details.map(
					(detail) => detail.message
				),
			});
		}

		// Destructure request body
		const {
			userId,
			username,
			password,
			fullName,
			age,
			email,
			isActive,
			hobbies,
			address,
		}: IUser = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: 'Username is already taken',
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = await User.create({
			userId,
			username,
			password: hashedPassword,
			fullName,
			age,
			email,
			isActive,
			hobbies,
			address,
		});

		// Exclude password from the response data
		const responseData = {
			userId: newUser.userId,
			username: newUser.username,
			fullName: newUser.fullName,
			age: newUser.age,
			email: newUser.email,
			isActive: newUser.isActive,
			hobbies: newUser.hobbies,
			address: newUser.address,
		};

		// Send the response
		res.status(201).json({
			success: true,
			message: 'User created successfully!',
			data: responseData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
});

export default router;
