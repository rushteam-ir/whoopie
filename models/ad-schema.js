// Defining schema model
let ad_schema = new mongoose.Schema({
    unique_id : {
        type : String,
        default : randomBase32String()
    },
    created_date : {
        type : Date,
        default: new Date()
    },
    title : String,
    describe : String,
    category : {
        type : 'objectId',
        ref : 'category'
    },
    other_describe : String,
    tags : Array,
    portfolio : [String],
    author : {
        type : 'objectId',
        ref : 'user'
    }
});

// Defining model statics
ad_schema.statics = {

    add : async (data)=>{

        let new_doc = new ad_model(data);
        return await new_doc.save();

    },

    getById : async (data)=>{

        let find_ad = await ad_model.findOne(data);

        if(find_ad){

            return find_ad;

        }
        else{

            return null;

        }

    },

    getAll : async (data)=>{

        return await ad_model.find({author : data._id});

    },

};

// Exporting model schema
module.exports = ad_model = mongoose.model('ad', ad_schema);