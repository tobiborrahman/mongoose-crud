import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './order.model';

export interface IUser extends Document {
	userId: number;
	username: string;
	password: string;
	fullName: {
		firstName: string;
		lastName: string;
	};
	age: number;
	email: string;
	isActive: boolean;
	hobbies: string[];
	address: {
		street: string;
		city: string;
		country: string;
	};
	orders: IOrder[];
}

export const userSchema: Schema<IUser> = new Schema({
	userId: { type: Number, unique: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	fullName: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
	},
	age: { type: Number },
	email: { type: String, required: true },
	isActive: { type: Boolean, default: true },
	hobbies: { type: [String] },
	address: {
		street: { type: String },
		city: { type: String },
		country: { type: String },
	},
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

export const User = mongoose.model<IUser>('User', userSchema);
