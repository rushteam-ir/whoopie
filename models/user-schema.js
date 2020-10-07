// Defining schema model
let user_schema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
    },
    email : {
        type : String,
        unique : true,
    },
    created_date : Date,
    password : String,
    first_name : String,
    last_name : String,
    phone_number : {
        type : String,
        unique : true,
    },
    sex : String,
    military_status : String,
    marital_status : String,
    city : String,
    biography: String,
    birth_day : String,
    birth_month : String,
    birth_year : String,
    contact_phone : Boolean,
    contact_email : Boolean,
    contact_whatsapp : Boolean,
    contact_instagram : Boolean,
    contact_telegram : Boolean,
    contact_telegram_type : String,
    contact_telegram_id : String,
    contact_instagram_id : String,
});

// Defining model virtuals
user_schema.virtual('full_name').get(()=>{return `${this.first_name} ${this.last_name}`});

// Defining model statics
user_schema.statics = {

    register : async (data)=>{

        let find_user1 = await user_model.findOne({username : data.username});
        let find_user2 = await user_model.findOne({email : data.email});

        if(!find_user1 && !find_user2){

            let hash_result = await bcrypt.hash(data.password, 10);

            if(hash_result){
                data.password = hash_result;
                data.created_date = new Date();

                let new_doc = new user_model(data);
                return await new_doc.save();
            }
            else{
                return null;
            }

        }
        else{

            return null;

        }

    },

    login : async (data)=>{

        let find_user1 = await user_model.findOne({username : data.username_or_email});
        let find_user2 = await user_model.findOne({email : data.username_or_email});

        if(find_user1){

            return await bcrypt.compare(data.password, find_user1.password) ? find_user1 : null;

        }
        else if(find_user2){

            return await bcrypt.compare(data.password, find_user2.password) ? find_user2 : null;
        }
        else{

            return null;

        }

    },

    changePassword : async (user_data, data)=>{

        let find_user = await user_model.findOne({username : user_data.username});

        if(find_user){

            await bcrypt.compare(user_data.password, find_user.password, async(err, result)=>{

                if(result){

                    await bcrypt.hash(data.password, 10, (err, hash)=>{

                        data.password = hash;

                    })

                    return await user_model.findByIdAndUpdate(find_user._id, {$set : data}, {new : true});

                }
                else{

                    return null;

                }

            });

        }
        else{

            return null;

        }

    },

    editProfile : async (user_data, data)=>{

        let find_user = await user_model.findOne({username : user_data.username});

        if(find_user){

            return await bcrypt.compare(user_data.password, find_user.password) ? await user_model.findByIdAndUpdate(find_user._id, {$set : data}, {new : true}) : null;

        }
        else{

            return null;

        }

    },

    getById : async (data)=>{

        let find_user = await user_model.findById(data._id);

        if(find_user){

            find_user.birth_date = find_user.birth_date;

            return find_user;

        }
        else{

            return null;

        }

    },

    getByUserName : async (data)=>{

        let find_user = await user_model.findOne({username : data});

        if(find_user){

            find_user.birth_date = find_user.birth_date;

            return find_user;

        }
        else{

            return null;

        }

    }

};

// Exporting model schema
module.exports = user_model = mongoose.model('user', user_schema);
