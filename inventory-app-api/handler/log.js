const { logActivityRepo } = require('../repository/log')

const logActivity = async (userId, activityType, target, details) => {
    try {
        await logActivityRepo(userId, activityType, target, details)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    logActivity
};
