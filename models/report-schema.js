// Defining schema model
let report_schema = new mongoose.Schema({
    type : String,
    text : String,
    unique_id : {
        type : String,
        default : randomBase32String()
    },
    created_date : {
        type : Date,
        default : new Date()
    },
    url : String,
    who : {
        type : 'ObjectId',
        ref : 'user'
    },
    remote_address : String,
});

// Defining model statics
report_schema.statics = {

    add : async (data)=>{

        let new_doc = new report_model(data);
        return await new_doc.save();

    },

};

// Exporting model schema
module.exports = report_model = mongoose.model('report', report_schema);
