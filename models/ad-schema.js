// Defining schema model
let ad_schema = new mongoose.Schema({
    unique_id : String,
    created_date : Date,
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

// Defining model virtuals
ad_schema.virtual('search').get(()=>{

    let result = `${this.title},${this.describe},${this.tags.toString()},${this.author.title}`
    return result;

});

// Defining model statics
ad_schema.statics = {

    add : async (data)=>{

        data.created_date = new Date();
        data.unique_id = randomBase32String();

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

    search : async(data)=>{

        await ad_model.find()

    }

};

// Exporting model schema
module.exports = ad_model = mongoose.model('ad', ad_schema);
