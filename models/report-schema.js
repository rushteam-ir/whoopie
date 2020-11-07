// Defining schema model
let report_schema = new mongoose.Schema({
    type : String,
    text : String,
    created_date : {
        type : String,
        default : getCurrentDate()
    },
    token : {
        type : 'String',
        ref : 'analyse'
    },
    model_id : String,
    url : String,
});

// Defining model statics
report_schema.statics = {

    add : async (data)=>{

        try{

            let new_doc = new report_model(data);
            return await new_doc.save();

        }
        catch(err){

            log(err)
            return null;

        }

    },

};

// Exporting model schema
module.exports = report_model = mongoose.model('report', report_schema);
