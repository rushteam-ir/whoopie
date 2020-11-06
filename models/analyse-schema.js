// Defining schema model
let analyse_schema = new mongoose.Schema({
    token : {
        type : String,
        unique : true
    },
    user_agent : String,
    remote_address : String,
    created_date : {
        type : String,
        default : getCurrentDate()
    }
});

// Defining model statics
analyse_schema.statics = {

    add : async (token_model)=>{

        try{
            let new_doc = new analyse_model(token_model);
            return await new_doc.save();
        }
        catch (error){
            return null;
        }

    }

};

// Exporting model schema
module.exports = analyse_model = mongoose.model('analyse', analyse_schema);
