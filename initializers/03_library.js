// App all custom functions
log = function (param){
    console.log(param);
};

isUndefined = function (obj){

    return typeof obj == 'undefined';

};

randomSha1String = function (){

    return `${sha1(new Date().getTime() + Math.random())}`

};

randomUUID = function (){

    let generated_id = rsuid.get();
    let result = '';

    for(let i of generated_id){

        let chance = Math.round(Math.random());

        if(chance){
            result += i.toUpperCase();
        }
        else{
            result +=i.toLowerCase();
        }

    }

    return result;

};

isObjectId = function (id){

    return mongoose.Types.ObjectId.isValid(id);

}

getCurrentDate = function() {

    let jdate = new jalali_date;

    return(jdate.format('YYYY/MM/DD'));
};
