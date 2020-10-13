
// when user chose telegram check box , field of id and phone for telegram showed
$('#TAC').change(function(){

    if ($('#TAC').is(":checked")){

        $('.telegram_checked').show();
        if($('#id_TAC').is(':checked')){

            $('.T_id').show();
        
        }

    }else{

        $('.telegram_checked').hide();
        $('.T_id').hide();

    }
});

// when user chose id for telegram , input for enter id show to him 
$('#id_TAC').change(function(){

    if ($('#id_TAC').is(":checked")){

        $('.T_id').show();

    }

});

// when user chose phone for telegram , close id input
$('#phone_TAC').change(function(){

    if($('#phone_TAC').is(":checked")){

        $('.T_id').hide();

    }

});

// if user chose instagram check box , show id input for user
$('#IAC').change(function(){

    if ($('#IAC').is(":checked")){

        $('.I_id').show()

    }else{

        $('.I_id').hide()

    }

});

// if page loaded and user checked instageram check box , instagram id input show
if($('#IAC').is(':checked')){

    $('.I_id').show();

}

// if user chose telegram for contact to him , open check box for chose phone or id
if($('#TAC').is(':checked')){

    $('.telegram_checked').show();

    if($('#id_TAC').is(':checked')){

        $('.T_id').show();
    
    }

}

// when user chose man on the sex select , show militeries select
$('#sex_select').next().children().children().click(function(){

    if($(this).text() == 'مرد'){

        $('.militeries_select').addClass('show');

    }else{

        $('.militeries_select').removeClass('show');

    }

});

// if when page load and sex select ,selected man , show militeries select 

let sex_type = $('#sex_select').next().children().children('span[selected]').text();

if(sex_type == "مرد"){

    $('.militeries_select').addClass('show');

}

// upload custom

(function () {

    $('.input-file-custom').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
    });

})();

$(document).ready(function () {

    // show img when browse
    $(".input-file-custom").change(function () {

        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="' + e.target.result + '"><div class="remove_img_icon remove"></div></div>';
                $(input).prev().append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]);
        }

    });

});

$(document).on('click', '.remove', function (e) {

    $(this).parents('.img-show').next().val('');
    $(this).parent('.remove_parent').remove();

});

$('.avatar_del').click(function (){

    redirect(`${app_url}user/profile/delete-avatar`);

})
