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
    downloads : {
        type : Array,
        default : []
    },
    watched : {
        type : Array,
        default : []
    }
});

// Defining model statics
ad_schema.statics = {

    add : async (author_id, data)=>{

        data.created_date = getCurrentDate();
        data.unique_id = randomUUID();

        let user_ad_list = await ad_model.getByQuery({author : author_id});
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

    delete : async (data)=>{

        return await ad_model.findOneAndDelete({unique_id : data});

    },

    getByQuery : async (data)=>{

        let find_ad = await ad_model.find(data).populate('category').populate('author');

        if(find_ad){

            return find_ad;

        }
        else{

            return null;

        }

    },

    addRepByDownload : async(ad_id, file_name, token_id)=>{

      let find_ad = await ad_model.findOne({unique_id : ad_id, portfolio : file_name});

      if(find_ad){

          if(!find_ad.downloads.includes(token_id)){
              await ad_model.findByIdAndUpdate(find_ad._id, {$push : {downloads : token_id}});
              await user_model.findByIdAndUpdate(find_ad.author, {$inc : {rep : 2}});
          }

          return find_ad;

      }
      else{

          return null;

      }

    },

    addRepByWatch : async(ad_id, token_id)=>{

        let find_ad = await ad_model.findOne({unique_id : ad_id});

        if(find_ad){

            if(!find_ad.watched.includes(token_id)){
                await ad_model.findByIdAndUpdate(find_ad._id, {$push : {watched : token_id}});
                await user_model.findByIdAndUpdate(find_ad.author, {$inc : {rep : 1}});
            }

        }

    },

    getBySearch : async(search_inp, filters)=>{

        let category_filter = {}
        if(filters.category){
            category_filter.category = filters.category
        }

        let filter_list = await ad_model.find(category_filter).populate('author').populate('category');

        let final_list = [];

        for(let doc of filter_list){

            if(doc.author.city === filters.city || doc.author.city === '0' || filters.city === '0'){

                let index_for_search = `${doc.title} ${doc.describe} ${doc.summary}
                                ${doc.author.first_name} ${doc.author.last_name} `;

                if(doc.tags){

                    index_for_search += doc.tags.toString();

                }

                doc.rate = string_similarity.compareTwoStrings(search_inp.toLowerCase(), index_for_search.toLowerCase());

                if(doc.rate >= 0.03){
                    doc.rate += doc.author.rep
                    final_list.push(doc);
                }
                if(search_inp === ""){
                    final_list.push(doc);
                }

            }

        }

        return final_list.sort((a, b)=>{return b - a}).slice((filters.page - 1) * 3, filters.page * 3);

    }

};

// Exporting model schema
module.exports = ad_model = mongoose.model('ad', ad_schema);
