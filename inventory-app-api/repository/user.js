const query = require('../util/db')
const { logActivity } = require('../handler/log')

const getUsersRepo = async () => {
    try {
        const queryText = 'SELECT * FROM users ORDER BY id DESC'
        const result = await query(queryText)
        
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

// const insertUserRepo = async (users) => {
//     try {
//         const queryText = 'INSERT INTO users (type, name, email, password, picture) VALUES ($1, $2, $3, $4, $5)'
//         const value = [users.type, users.name, users.email, users.password, users.picture]
//         const result = await query(queryText, value)

//         return result.rows
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }

const insertUserRepo = async (users) => {
    try {
        const queryText = 'INSERT INTO users (type, name, email, password, picture) VALUES ($1, $2, $3, $4, $5)'
        const values = [users.type, users.name, users.email, users.password, users.picture]
        const result = await query(queryText, values)

        if (result.rowCount > 0) {
            console.log('User inserted successfully');
            return result.rows;  // or return any other relevant data
        } else {
            throw new Error('User insertion failed');
        }
    } catch (error) {
        console.error(error);
        throw error;  // Re-throw the error to handle it in the calling function
    }
}

const updateUserRepo = async (users) => {
    try {
        let updateQuery = 'UPDATE users SET';
        let index = 1; // Start index for parameter placeholders

        if (users.type) {
            updateQuery += ` type = $${index}`;
            index++;
        }
        if (users.name) {
            updateQuery += `${index > 1 ? ',' : ''} name = $${index}`;
            index++;
        }
        if (users.email) {
            updateQuery += `${index > 1 ? ',' : ''} email = $${index}`;
            index++;
        }
        // if (users.password) {
        //     updateQuery += `${index > 1 ? ',' : ''} password = $${index}`;
        //     index++;
        // }
        if (users.picture) {
            updateQuery += `${index > 1 ? ',' : ''} picture = $${index}`;
            index++;
        }

        updateQuery += ` WHERE id = $${index}`;
        console.log(updateQuery);

        const values = []
        if (users.type) values.push(users.type)
        if (users.name) values.push(users.name)
        if (users.email) values.push(users.email)
        // if (users.password) values.push(users.password)
        if (users.picture) values.push(users.picture)
        values.push(users.id)

        console.log(values);
        const result = await query(updateQuery, values);
        // console.log(result)
        // await logActivityRepo(userId, 'update', 'user', `User ID: ${users.id}, Name: ${users.name}, Email: ${users.email}`);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteUserRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM users WHERE id = $1'
        const result = await query(queryText, [id])

        // await logActivityRepo(userId, 'delete', 'user', `User ID: ${deletedUser.id}, Name: ${deletedUser.name}, Email: ${deletedUser.email}`);
        
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

const loginRepo = async (email) => {
    try {
        const queryText = 'SELECT * FROM users WHERE email = $1'
        const result = await query(queryText, [email])
        // console.log(result)
        await logActivity(result.rows[0].id, 'login', 'user', 'User logged in successfully')
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getUsersRepo,
    insertUserRepo,
    updateUserRepo,
    deleteUserRepo,
    loginRepo
}