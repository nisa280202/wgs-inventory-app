const query = require('../util/db')

const getCategoriesRepo = async () => {
    try {
        const queryText = 'SELECT * FROM categories ORDER BY id DESC'
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCategoryRepo = async (id) => {
    try {
        const queryText = 'SELECT * FROM categories WHERE id = $1'
        const result = await query(queryText, [id])
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

const addCategoryRepo = async (category) => {
    try {
        const queryText = 'INSERT INTO categories(name) VALUES ($1)'
        const value = [category.name]
        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const updateCategoryRepo = async (category) => {
    try {
        const queryText = 'UPDATE categories SET name = $1 WHERE id = $2'
        const value = [category.name, category.id]
        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteCategoryRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM categories WHERE id = $1'
        const result = await query(queryText, [id])
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = { 
    getCategoriesRepo,
    getCategoryRepo,
    addCategoryRepo,
    updateCategoryRepo,
    deleteCategoryRepo
}