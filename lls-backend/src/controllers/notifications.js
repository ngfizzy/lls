const { Notification } = require('../models');

module.exports = {
    async getMyNotifications(userId) {
        console.log('where USER ID ', userId)
        try {
           const notifications =  await Notification.findAll({ where: { userId }});

           return {
                error: false,
                message: 'notifications fetched successfully',
                notifications 
            }
        } catch(e) {
            return {error: true, message: 'could not fetch notifications'}
        }
    },

    async createNotifications(notification) {
        console.log('notification>>>>>>>>>>>>>>>>>>>>>>>>>>>', notification)
        try {
            const created =  new Notification({...notification});
            await created.save();
 
            return {
                 error: false,
                 message: 'notifications fetched successfully',
                 notification: created
             }
         } catch(e) {
             return {
                 error: true,
                message: 'could not fetch notifications'
            }
         }
    }
}