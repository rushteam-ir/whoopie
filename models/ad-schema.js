// Defining schema model
let ad_schema = new mongoose.Schema({
    unique_id : String,
    created_date : String,
    title : String,
    summary : String,
    category : {
        type : 'ObjectId',
        ref : 'category'
    },
    describe : String,
    tags : {
        type : [String],
        default: null
    },
    portfolio : {
        type : String,
        default : ''
    },
    author : {
        type: 'ObjectId',
        ref: 'user'
    },
    type : String,
    reports : [Object]
});

// Defining model statics
ad_schema.statics = {

    add : async (author, data)=>{

        data.created_date = getCurrentDate();
        data.unique_id = randomUUID();

        let user_ad_list = await ad_model.getAll(author);
        if(user_ad_list.length < 4){

            let new_doc = new ad_model(data);
            return await new_doc.save();

        }
        else{

            return null;

        }

    },

    edit : async (ad_id, data)=>{

        data.created_date = getCurrentDate();
        return await ad_model.findOneAndUpdate({unique_id : ad_id}, {$set : data}, {new : true});

    },

    getById : async (data)=>{

        let find_ad = await ad_model.findOne(data).populate('category').populate('author');

        if(find_ad){

            return find_ad;

        }
        else{

            return null;

        }

    },

    getByUserName : async (data)=>{

        let find_ad = await ad_model.find(data).populate('category').populate('author');

        if(find_ad){

            return find_ad;

        }
        else{

            return null;

        }

    },

    getAll : async (data)=>{

        return await ad_model.find({author : data._id}).populate('category').populate('author');

    },

    delete : async (data)=>{

        return await ad_model.findOneAndDelete({unique_id : data});

    },

    getBySearch : async(search_inp, filters)=>{

        let query_filter = {};
        if(filters.category){
            query_filter.category = filters.category
        }
        if(filters.city != '0'){
            query_filter.city = filters.city
        }

        let filter_list = await ad_model.find(query_filter).populate('author').populate('category');
        let final_list = [];

        for(let doc of filter_list){

            let index_for_search = `${doc.title} ${doc.describe} ${doc.summary}
                                ${doc.author.first_name} ${doc.author.last_name} `;

            if(doc.tags){

                index_for_search += doc.tags.toString();

            }

            doc.rate = string_similarity.compareTwoStrings(search_inp.toLowerCase(), index_for_search.toLowerCase());

            if(doc.rate >= 0.03){
                final_list.push(doc)
            }

        }

        return final_list.sort((a, b)=>{return b.rate-a.rate}).slice((filters.page - 1) * 3, filters.page * 3);

    }

};

// Exporting model schema
module.exports = ad_model = mongoose.model('ad', ad_schema);
