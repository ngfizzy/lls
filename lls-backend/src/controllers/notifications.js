const { Notification } = requires('../models');

module.exports = {
    async getMyNotifications(userId) {
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

    async createNotifications(notification, userId) {
        try {
            const created =  await Notification.create({...notification, userId});
 
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