const {Router} = require('express');
const loanController = require('../controllers/loan');
const isAdmin = require('../helpers/is-admin');
const router = Router();

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

router.get('/', async (req, res) => {
	const {user} = req;

	try {
		let result;
		if (isAdmin(user)) {
			result = await loanController.getAllLoans();
		} else {
			result = await loanController.getUserLoans(user.user);
		}

		if (!result.error) {
			return res.json(result);
		}

		return res.status(404).json(result);
	} catch (e) {
		return res.status(500).json({
			error: true,
			message: e.message,
		});
	}
});

router.post('/', async (req, res) => {
	const {
		body: {days, ...loan},
	} = req;

	const date = new Date().addDays(days);

	loan.expiredOn = date;

	try {
		const result = await loanController.createLoan(loan);

		if (!result.error) {
			return res.json(result);
		}

		return res.status(400).json(result);
	} catch (e) {
		console.error('error occurred', error);
		return res.status(500).json({
			error: true,
			message: e.message,
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const result = await loanController.completeLoan(req.params.id);

		if (!result.error) {
			return res.json(result);
		}

		return res.status(400).json(result);
	} catch (e) {
		console.error('error occurred', error);
		return res.status(500).json({
			error: true,
			message: e.message,
		});
	}
});

module.exports = router;
