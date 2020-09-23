// Defining schema model
let user_schema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
    },
    password : String,
    first_name : String,
    last_name : String,
});

// Defining model virtuals
// user_schema.virtuals('full_name').get(()=>{return `${this.first_name} ${this.last_name}`});

// Defining model statics
user_schema.statics = {

    register : async (data)=>{

        let find_user = await user_model.findOne({username : data.username});

        if(!find_user){

            await bcrypt.hash(data.password, 10, (err, hash)=>{

                data.password = hash;

            })

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

    }

};

// Exporting model schema
module.exports = user_model = mongoose.model('user', user_schema);
