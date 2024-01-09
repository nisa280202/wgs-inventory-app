const { getAllTypesRepo, getTypeRepo, addTypeRepo, updateTypeRepo, deleteTypeRepo } = require('../repository/type')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getAllTypes = async (req, res) => { 
    const type = await getAllTypesRepo();
    if (!type) return failedGetResponse(res);

    return successGetResponse(res, type);
}

const getType = async (req, res) => { 
    const id = req.params.id;
    const type = await getTypeRepo(id);
    if (!type) return failedGetResponse(res);

    return successGetResponse(res, type);
}

const addType = async (req, res) => { 
    // const user_id = req.user.id
    const { name } = req.body;
    const type = { name: name };

    try {
        const data = await addTypeRepo(type);
        if (!data) {
            return failedResponse(res, 'Failed to add type'); // Mengirim pesan error ke klien
        }
        // await logActivity(user_id, 'create', name, 'Add type successfully');
        return successResponse(res);
    } catch (error) {
        console.error(error.message);
        // await logActivity(user_id, 'create', name, `Failed to add type. Error: ${error.message}`);
        return failedResponse(res, error.message); // Mengirim pesan error ke klien
    }
}

const updateType = async (req, res) => { 
    const id = req.params.id;
    const { name } = req.body;
    const type = {
        id: id,
        name: name
    };

    const data = await updateTypeRepo(type);
    if (!data) return failedResponse(res);

    return successResponse(res);
}

const deleteType = async (req, res) => { 
    const id = req.params.id;
    await deleteTypeRepo(id);

    return successResponse(res);
}

module.exports = {
    getAllTypes,
    getType,
    addType,
    updateType,
    deleteType
}