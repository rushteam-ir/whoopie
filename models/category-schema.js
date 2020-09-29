// Defining schema model
let category_schema = new mongoose.Schema({
    title : String,
    created_date : Date,
    author : {
        type : 'objectId',
        ref : 'user'
    }
});

// Defining model statics
category_schema.statics = {

    getAll : async ()=>{

        return await category_model.find();

    }

};

// Exporting model schema
module.exports = category_model = mongoose.model('category', category_schema);
