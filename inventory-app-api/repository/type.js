const query = require('../util/db')
// const logActivityRepo = require('./log')

const getAllTypesRepo = async () => {
    try {
        const queryText = 'SELECT * FROM types ORDER BY id DESC'
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getTypeRepo = async (id) => {
    try {
        const queryText = 'SELECT * FROM types WHERE id = $1'
        const result = await query(queryText, [id])
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

const addTypeRepo = async (type) => {
    try {
        const queryText = 'INSERT INTO types(name) VALUES ($1)'
        const value = [type.name]
        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

// const addTypeRepo = async (type) => {
//     try {
//         // Validasi apakah nama jenis sudah ada sebelumnya
//         const isTypeExist = await isTypeExistRepo(type.name);
//         if (isTypeExist) {
//             throw new Error('Type name must be unique');
//         }

//         // Jika nama jenis belum ada, lakukan penambahan
//         const queryText = 'INSERT INTO types(name) VALUES ($1)';
//         const value = [type.name];
//         const result = await query(queryText, value);

//         // await logActivityRepo(userId, 'create', 'type', `Type ID: ${insertedType.id}, Name: ${insertedType.name}`);

//         return result.rows;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }

const updateTypeRepo = async (type) => {
    try {
        const queryText = 'UPDATE types SET name = $1 WHERE id = $2'
        const value = [type.name, type.id]
        const result = await query(queryText, value)

        // await logActivityRepo(userId, 'update', 'type', `Type ID: ${type.id}, Name: ${type.name}`);

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteTypeRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM types WHERE id = $1'
        const result = await query(queryText, [id])

        // await logActivityRepo(userId, 'delete', 'type', `Type ID: ${deletedType.id}, Name: ${deletedType.name}`);

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = { 
    getAllTypesRepo,
    getTypeRepo,
    addTypeRepo,
    updateTypeRepo,
    deleteTypeRepo
}