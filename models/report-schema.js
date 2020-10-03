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

    addGeneral : async (data)=>{

        data.created_date = new Date();

        let new_doc = new report_model(data);
        return await new_doc.save();

    },

    addAd : async (ad_inp, data)=>{

        data.created_date = new Date();

        let new_doc = new report_model(data);
        let report_saved = await new_doc.save();
        if(report_saved){

            return await report_model.findOneAndUpdate({_id: ad_inp}, {$push: {reports: report_saved._id}});

        }
        else{

            return null;

        }

    }

};

// Exporting model schema
module.exports = report_model = mongoose.model('report', report_schema);
