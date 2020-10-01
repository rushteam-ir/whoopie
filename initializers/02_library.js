// App all custom functions
log = function (param){
    console.log(param);
};

isUndefined = function (obj){

    if(typeof obj == 'undefined'){
        return true;
    }
    else{
        return false;
    }

};

randomSha1String = function (){

    return `${sha1(new Date().getTime() + Math.random())}`

};

randomBase32String = function (){

    let date = new Date().getTime();
    let randomInt = Math.floor(Math.random()*10000000);
    let new_id_generated = (randomInt + date).toString(32);
    let result = '';

    for(let i of new_id_generated){

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

getRandomArray = function (arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return getRandomArray(arr, n - 1)
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// let test = 'rouzbehSbz_1';
// let regex = /^[\w.-]{5,20}$/;
// log(regex.test(test))
