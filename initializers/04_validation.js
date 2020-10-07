module.exports = Validation = class {

    constructor(inputs) {

        this.inputs = inputs;

    }

    check() {

        let validation_result = null;

        for(let i = 0; i < this.inputs.length;  i++){

            let input = this.inputs[i];
            validation_result = this.checkInitiate(input);

            if(validation_result){

                break;

            }

        }

        return validation_result;

    }

    checkInitiate(input){

        if(input.type != 'array' && (Array.isArray(input.value))){

            return 'ورودی های وارد شده معتبر نمی باشد';

        }

        if(input.type){

            switch(input.type){

                case 'name':
                {

                    if(input.value == ''){
                        return 'لطفا نام و نام خانوادگی خود را وارد کنید'
                    }
                    if(input.value.length < 2 || input.value.length > 20){

                        return "نام و نام خانوادگی نباید بیشتر از 20 حرف باشد."

                    }

                    break;

                }

                case 'biography':
                {

                    if(input.value.length > 310){

                        return "قسمت درباره من از مجاز بیشتر شده است."

                    }

                    break;

                }

                case 'username':
                {

                    if(input.value == ''){
                        return 'لطفا نام کاربری خود را وارد کنید'
                    }
                    let regex = /^[\w.-]{4,25}$/;
                    if(!regex.test(input.value)){

                        return "نام کاربری نباید شامل حروف غیر مجاز باشد."

                    }

                    break;

                }

                case 'password':
                {

                    if(input.value == ''){
                        return 'لطفا رمز عبور خود را وارد کنید'
                    }
                    if(input.value.length < 8) {

                        return 'رمز عبور باید بیشتر از 8 حرف باشد.';

                    }

                    break;

                }

                case 'email':
                {

                    if(input.value == ''){
                        return 'لطفا پست الکترونیکی خود را وارد کنید'
                    }
                    let email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    if(!email_regexp.test(input.value)){

                        return 'پست الکترونیکی وارد شده معتبر نمی باشد.';

                    }

                    break;

                }

                case 'phone':
                {

                    if(input.value == ''){
                        return 'لطفا شماره تلفن خود را وارد کنید'
                    }
                    if(input.value.length != 11 || !input.value.startsWith('09')){

                        return 'شماره تلفن معتبر نمی باشد.';

                    }

                    break;

                }

                case 'number':
                {

                    if(input.value == ''){
                        return 'لطفا تمام ورودی ها را وارد کنید'
                    }
                    if(isNaN(parseInt(input.value))){

                        return 'ورودی وارد شده باید به صورت عدد باشد.';

                    }

                    break;

                }

                case 'date':
                {

                    let date = input.value.split('/');
                    let day = parseInt(date[2]);
                    let month = parseInt(date[1]);
                    let year = parseInt(date[0]);

                    if(isNaN(day) || isNaN(month) || isNaN(year)){

                        return 'تاریخ وارد شده معتبر نمی باشد.'

                    }

                    if(day < 0 || day > 31){
                        return 'تاریخ وارد شده معتبر نمی باشد.'
                    }
                    else if(month < 0 || month > 12){
                        return 'تاریخ وارد شده معتبر نمی باشد.'
                    }
                    else if(year < 1300){
                        return 'تاریخ وارد شده معتبر نمی باشد.'
                    }

                    break;

                }

                case 'telegram':
                {

                    if(input.value == ''){
                        return 'لطفا آی دی تلگرام خود را وارد کنید'
                    }
                    let regex = /^[\w_]{5,32}$/;
                    if(!regex.test(input.value)){

                        return "آی دی تلگرام نباید شامل حروف غیر مجاز باشد."

                    }

                    break;

                }

                case 'instagram':
                {

                    if(input.value == ''){
                        return 'لطفا آی دی اینستاگرام خود را وارد کنید'
                    }
                    let regex = /^[\w.-]{4,25}$/;
                    if(!regex.test(input.value)){

                        return "آی دی اینستاگرام نباید شامل حروف غیر مجاز باشد."

                    }

                    break;

                }

            }

        }

        return null;

    }

}
