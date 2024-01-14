const query = require('../util/db');
const { logActivity } = require('../handler/log');

// Fungsi untuk mendapatkan semua pengguna kecuali super admin dari database
const getUsersRepo = async () => {
    try {
        const queryText = 'SELECT * FROM users WHERE type != 0 ORDER BY id DESC';
        const result = await query(queryText);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menambahkan pengguna baru ke database
const insertUserRepo = async (users) => {
    try {
        const queryText = 'INSERT INTO users (type, name, email, password, picture) VALUES ($1, $2, $3, $4, $5)';
        const values = [users.type, users.name, users.email, users.password, users.picture];
        const result = await query(queryText, values);

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

// Fungsi untuk memperbarui informasi pengguna berdasarkan ID
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
        if (users.picture) values.push(users.picture)
        values.push(users.id)

        console.log(values);
        const result = await query(updateQuery, values);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menghapus pengguna berdasarkan ID
const deleteUserRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM users WHERE id = $1';
        const result = await query(queryText, [id]);

        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk proses login pengguna
const loginRepo = async (email) => {
    try {
        const queryText = 'SELECT * FROM users WHERE email = $1';
        const result = await query(queryText, [email]);

        // Contoh penggunaan logActivity jika diperlukan
        await logActivity(result.rows[0].id, 'login', 'user', 'User logged in successfully');
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Ekspor fungsi-fungsi repository untuk digunakan dalam kode lain
module.exports = {
    getUsersRepo,
    insertUserRepo,
    updateUserRepo,
    deleteUserRepo,
    loginRepo
}
