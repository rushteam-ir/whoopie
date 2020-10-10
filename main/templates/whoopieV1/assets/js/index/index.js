// open register modal 


$('#openRM').click(function () {

    $('#register_modal').fadeIn();
    $('body').css('overflow' , 'hidden');

    $('#close_rm').click(function () {

        $('#register_modal').fadeOut();
        $('body').css('overflow' , 'auto');

    });

})

// open login modal 

$('#openLM').click(function () {

    $('#login_modal').fadeIn();
    $('body').css('overflow' , 'hidden');

    $('#close_Lm').click(function () {

        $('#login_modal').fadeOut();
        $('body').css('overflow' , 'auto');

    });

})