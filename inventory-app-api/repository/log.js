const query = require('../util/db');

// const logActivityRepo = async (userId, activityType, target, details) => {
//     try {
//         const queryText = 'INSERT INTO activity_log(user_id, activity_type, target, details) VALUES ($1, $2, $3, $4)';
//         const values = [userId, activityType, target, details];
//         const result = await query(queryText, values);
//         return result.rows;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

const logActivityRepo = async (userId, activityType, target, details) => {
    try {
        const queryText = 'INSERT INTO activity_log (user_id, activity_type, target, details) VALUES ($1, $2, $3, $4)'
        await query(queryText, [userId, activityType, target, details])
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    logActivityRepo,
};