// close modal when click on cross
$('.close_modal').click(function () {

    $('.modal_mode').fadeOut();
    $('.error_info').hide();
    $('body').css('overflow', 'auto');

});

// open login modal
$('.OLM').click(function () {

    $('#login_modal').fadeIn();
    $('body').css('overflow', 'hidden');

});

// open login modal
$('.ORM').click(function () {

    $('#regsiter_modal').fadeIn();
    $('body').css('overflow', 'hidden');

});