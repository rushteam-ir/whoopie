// Defining schema model
let report_schema = new mongoose.Schema({
    type : String,
    text : String,
    created_date : Date,
    url : String,
    who : Object,
    user_agent : String,
    remote_address : String,
});

// Defining model statics
report_schema.statics = {

    add : async (data)=>{

        data.created_date = new Date();

        let new_doc = new report_model(data);
        return await new_doc.save();

    },

};

// Exporting model schema
module.exports = report_model = mongoose.model('report', report_schema);
