// report bug modal 
$('#ads_bug_open').click(function () {

    $('#ads_bug').fadeIn();
    $('body').css('overflow' , 'hidden');

    $('#close_AB').click(function () {

        $('#ads_bug').fadeOut();
        $('body').css('overflow' , 'auto');

    })

});