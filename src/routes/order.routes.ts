import express, { Request, Response } from 'express';
import { IOrder, Order } from '../models/order.model';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
	try {
		const order: IOrder = req.body;
		const newOrder = await Order.create(order);
		res.json(newOrder);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Add more routes as needed

export default router;
