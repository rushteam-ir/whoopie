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
    avatar : String,
    city : String,
    birth_date : Date,
});

// Defining model virtuals
// user_schema.virtuals('full_name').get(()=>{return `${this.first_name} ${this.last_name}`});

// Defining model statics
user_schema.statics = {

    register : async (data)=>{

        let find_user1 = await user_model.findOne({username : data.username});
        let find_user2 = await user_model.findOne({email : data.email});

        if(!find_user1 && !find_user2){

            await bcrypt.hash(data.password, 10, (err, hash)=>{

                data.password = hash;

            })

            data.created_date = new Date();

            let new_doc = new user_model(data);
            return await new_doc.save();

        }
        else{

            return null;

        }

    },

    login : async (data)=>{

        let find_user = await user_model.findOne({username : data.username});

        if(find_user){

            await bcrypt.compare(data.password, find_user.password, (err, result)=>{

                if(result){

                    return find_user;

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

            await bcrypt.compare(user_data.password, find_user.password, async(err, result)=>{

                if(result){

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

    getById : async (data)=>{

        let find_user = await user_model.findById(data._id);

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
