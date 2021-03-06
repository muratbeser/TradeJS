import * as express from 'express';

module.exports = app => {

	const router = express.Router();

	router.post('/login', async (req, res) => {
		console.log('feasdfsdfsdf', req.body);
		await app.controllers.config.set(req.body);
		let success = await app.controllers.broker.loadBrokerApi('oanda');

		res.sendStatus(success ? 200 : 401);
	});

// define the about route
	router.get('/logout', async (req, res) => {
		let success = await app.controllers.broker.disconnect();

		res.sendStatus(success ? 200 : 401);
	});

	return router;
};
