const successGetResponse = (res, data) => {
    res.status(200).json({
        'Status': 200,
        'Message': 'Success',
        'Data': data
    })
}

const failedGetResponse = (res) => {
    res.status(400).json({
        'Status': 400,
        'Message': 'Failed'
    })
}

const successResponse = (res) => {
    res.status(200).json({
        'Status': 200,
        'Message': 'Success'
    })
}

const failedResponse = (res) => {
    res.status(400).json({
        'Status': 400,
        'Message': 'Failed'
    })
}

module.exports = {
    successGetResponse,
    failedGetResponse,
    successResponse,
    failedResponse
}