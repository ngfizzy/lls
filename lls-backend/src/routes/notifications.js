const { Router } = require('express');
const notificationController = require('../controllers/notifications')

const router = Router();


router.get('/me', async (req, res) => {
    const { user } = req.user;

    try {
        const result = await notificationController.getMyNotifications(user.id);

        return res.status(200).json(result)
    } catch(error) {
        return res.status(500)
            .json({error: true, message: 'something went wrong'})
    }
});


router.post('/:userId', (res, res) => {
    const userId = req.param.userId;

    try {
        const result = await notificationController.createNotifications(notification, userId);

        return res.status(200).json(result)
    } catch(error) {
        return res.status(500)
            .json({error: true, message: 'something went wrong'})
    }
});

module.exports - router;