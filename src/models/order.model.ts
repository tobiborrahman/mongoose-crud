import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
	productName: string;
	price: number;
	quantity: number;
}

export const orderSchema: Schema<IOrder> = new Schema({
	productName: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
