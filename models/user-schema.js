// Defining schema model
let user_schema = new mongoose.Schema({
    username : {
        type : String,
        //unique : true,
    },
    email : {
        type : String,
        //unique : true,
    },
    confirm_profile : {
        type : Boolean,
        default : false
    },
    created_date : String,
    password : String,
    avatar : String,
    first_name : String,
    last_name : String,
    phone_number : {
        type : String,
        //unique : true,
    },
    sex : String,
    rep : {
        type : Number,
        default : 0,
    },
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

// Defining model statics
user_schema.statics = {

    register : async (data)=>{

        data.username = data.username.toLowerCase();
        data.email = data.email.toLowerCase();

        let find_user1 = await user_model.findOne({username : data.username});
        let find_user2 = await user_model.findOne({email : data.email});

        if(!find_user1 && !find_user2){

            let hash_result = await bcrypt.hash(data.password, 10);

            if(hash_result){
                data.password = hash_result;
                data.created_date = getCurrentDate();

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

        data.username_or_email = data.username_or_email.toLowerCase();

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

            let auth_result = await bcrypt.compare(data.current_password, find_user.password) ? find_user : null;

            if(auth_result){

                let hash_result = await bcrypt.hash(data.new_password, 10);

                if(hash_result){

                    return await user_model.findByIdAndUpdate(find_user._id, {$set : {password : hash_result}}, {new : true});

                }
                else{

                    return null;

                }

            }
            else{

                return null;

            }

        }
        else{

            return null;

        }

    },

    editProfile : async (user_data, data)=>{

        data.username = data.username.toLowerCase();
        data.email = data.email.toLowerCase();

        let find_user = await user_model.findOne({username : user_data.username});

        if(find_user){

            let auth_result = user_data.password == find_user.password ? true : false;

            if(auth_result){

                let check_username = await user_model.findOne({username : data.username});
                let check_email = await user_model.findOne({email : data.email});
                let check_phone = await user_model.findOne({phone_number : data.phone_number});

                if(check_username){

                    if(check_username._id != user_data._id){
                        return 'نام کاربری وارد شده تکراری می باشد.'
                    }

                }
                else if(check_email){

                    if(check_email._id != user_data._id){
                        return 'پست الکترونیکی وارد شده تکراری می باشد.'
                    }

                }
                else if(check_phone){

                    if(check_phone._id != user_data._id){
                        return 'شماره تلفن وارد شده تکراری می باشد.'
                    }

                }

                return await user_model.findByIdAndUpdate(find_user._id, {$set : data}, {new : true});

            }
            else{

                return 'خطا';

            }

        }
        else{

            return 'خطا';

        }

    },

    getById : async (data)=>{

        let find_user = await user_model.findById(data._id);

        if(find_user){

            return find_user;

        }
        else{

            return null;

        }

    },

    changeAvatar : async (user_data, data)=>{

        let find_user = await user_model.findOne({username : user_data.username.toLowerCase()});

        if(find_user){

            let auth_result = user_data.password == find_user.password ? true : false;

            if(auth_result){

                return await user_model.findByIdAndUpdate(find_user._id, {$set : data}, {new : true});

            }
            else{

                return null;

            }

        }
        else{

            return null;

        }

    },

    getByUserName : async (data)=>{

        let find_user = await user_model.findOne({username : data});

        if(find_user){

            return find_user;

        }
        else{

            return null;

        }

    }

};

// Exporting model schema
module.exports = user_model = mongoose.model('user', user_schema);
