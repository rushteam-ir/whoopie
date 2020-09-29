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
},{
    toObject: { virtuals: true},
    toJSON: { virtuals: true }
});

// Defining model virtuals
ad_schema.virtual('search').get(()=>{

    return `${this.title},${this.describe},${this.tags.toString()},${this.author.full_name}`;

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

    getBySearch : async(search_inp, data)=>{

        let docs = await ad_model.find(data.category ? {category : data.category} : {}).populate('category').populate('author');
        let search_list = [];

        for(let doc of docs){

            if(data.city){

                if(doc.search.toLowerCase().includes(search_inp.toLowerCase()) && doc.author.city == data.city){

                    search_list.push(doc);

                }

            }
            else{

                if(doc.search.toLowerCase().includes(search_inp.toLowerCase())){

                    search_list.push(doc);

                }

            }

        }

        return getRandomArray(search_list, 3);

    }

};

// Exporting model schema
module.exports = ad_model = mongoose.model('ad', ad_schema);
