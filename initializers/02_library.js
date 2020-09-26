// App all custom functions
log = function (param){
    console.log(param);
}

isUndefined = function (obj) {

    if(typeof obj == 'undefined'){
        return true;
    }
    else{
        return false;
    }

};

randomSha1String = function () {

    return `${sha1(new Date().getTime() + Math.random())}`

}
