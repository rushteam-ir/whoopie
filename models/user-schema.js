// Defining schema model
let user_schema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
    },
    password : String,
    first_name : String,
    last_name : String,
});

// Defining model virtuals
// user_schema.virtuals('full_name').get(()=>{return `${this.first_name} ${this.last_name}`});

// Defining model statics
user_schema.statics = {

};

// Exporting model schema
module.exports = user_model = mongoose.model('user', user_schema);
