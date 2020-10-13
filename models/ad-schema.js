// Defining schema model
let ad_schema = new mongoose.Schema({
    unique_id : String,
    created_date : Date,
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
    reports : [{
        type : 'ObjectId',
        ref : 'report'
    }]
});

// Defining model statics
ad_schema.statics = {

    add : async (data)=>{

        data.created_date = new Date();
        data.unique_id = randomUUID();

        let new_doc = new ad_model(data);
        return await new_doc.save();

    },

    edit : async (ad_id, data)=>{

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

    getAll : async (data)=>{

        return await ad_model.find({author : data._id}).populate('category').populate('author');

    },

    delete : async (data)=>{

        return await ad_model.findOneAndDelete({unique_id : data});

    },

    getBySearch : async(search_inp, filters)=>{

        let category_filter_list = await ad_model.find(filters.category ? {category : filters.category} : null).populate('author').populate('category');
        let city_filter_list = [];
        let final_list = [];
        let search_query = search_inp.split(' ');

        for(let doc of category_filter_list){

            if(filters.city != '0'){

                if(doc.author.city === filters.city) {

                    city_filter_list.push(doc);

                }

            }
            else{

                city_filter_list.push(doc);

            }

        }

        for(let doc of city_filter_list){

            let index_for_search = `${doc.title} ${doc.describe} ${doc.summary}
                                ${doc.author.first_name} ${doc.author.last_name} `;

            if(doc.tags){

                index_for_search += doc.tags.toString;

            }

            doc.index_for_search = index_for_search.toLowerCase();

            for(let query of search_query){

                if(doc.index_for_search.includes(query.toLowerCase())){

                    final_list.push(doc);
                    break;

                }

            }

        }

        return final_list;


    }

};

// Exporting model schema
module.exports = ad_model = mongoose.model('ad', ad_schema);
