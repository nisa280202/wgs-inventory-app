// Import modul untuk menjalankan query ke database
const query = require('../util/db');

// Fungsi untuk mendapatkan semua barang dengan informasi tambahan
const getAllGoodsRepo = async () => {
    try {
        const queryText = `
            SELECT goods.*, types.name AS type_name, categories.name AS category_name
            FROM goods
            LEFT JOIN types ON goods.type_id = types.id
            LEFT JOIN categories ON goods.category_id = categories.id
            ORDER BY goods.id DESC
        `;
        const result = await query(queryText);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk mendapatkan detail barang berdasarkan ID
const getGoodsRepo = async (id) => {
    try {
        const queryText = `
            SELECT goods.*, types.name AS type_name, categories.name AS category_name
            FROM goods
            LEFT JOIN types ON goods.type_id = types.id
            LEFT JOIN categories ON goods.category_id = categories.id
            WHERE goods.id = $1
        `;
        const result = await query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menyisipkan barang baru ke dalam database
const insertGoodsRepo = async (goods) => {
    try {
        const queryText = 'INSERT INTO goods(type_id, name, category_id, picture, unit, price, stock) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        const value = [goods.type_id, goods.name, goods.category_id, goods.picture, goods.unit, goods.price, goods.stock]
        const result = await query(queryText, value)

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

// Fungsi untuk memperbarui informasi barang berdasarkan ID
const updateGoodsRepo = async (goods) => {
    try {
        let updateQuery = 'UPDATE goods SET';
        let index = 1;

        if (goods.type_id) {
            updateQuery += ` type_id = $${index}`;
            index++;
        }
        if (goods.name) {
            updateQuery += `${index > 1 ? ',' : ''} name = $${index}`;
            index++;
        }
        if (goods.category_id) {
            updateQuery += `${index > 1 ? ',' : ''} category_id = $${index}`;
            index++;
        }
        if (goods.picture) {
            updateQuery += `${index > 1 ? ',' : ''} picture = $${index}`;
            index++;
        }
        if (goods.unit) {
            updateQuery += `${index > 1 ? ',' : ''} unit = $${index}`;
            index++;
        }
        if (goods.price) {
            updateQuery += `${index > 1 ? ',' : ''} price = $${index}`;
            index++;
        }
        if (goods.stock) {
            updateQuery += `${index > 1 ? ',' : ''} stock = $${index}`;
            index++;
        }

        updateQuery += ` WHERE id = $${index}`;
        console.log(updateQuery);

        const values = []
        if (goods.type_id) values.push(goods.type_id)
        if (goods.name) values.push(goods.name)
        if (goods.category_id) values.push(goods.category_id)
        if (goods.picture) values.push(goods.picture)
        if (goods.unit) values.push(goods.unit)
        if (goods.price) values.push(goods.price)
        if (goods.stock) values.push(goods.stock)
        values.push(goods.id)

        console.log(values);
        const result = await query(updateQuery, values);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menghapus barang berdasarkan ID
const deleteGoodsRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM goods WHERE id = $1'
        const result = await query(queryText, [id])

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

// Fungsi untuk mencari barang berdasarkan kata kunci
const findGoodsRepo = async (keyword) => {
    try {
        const queryText = 'SELECT * FROM goods WHERE name ILIKE $1 OR category_id ILIKE $1'
        const result = await query(queryText, [`%${keyword}%`])

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

// Ekspor fungsi-fungsi repository untuk digunakan dalam kode lain
module.exports = {
    getAllGoodsRepo,
    getGoodsRepo,
    insertGoodsRepo,
    updateGoodsRepo,
    deleteGoodsRepo,
    findGoodsRepo
}
