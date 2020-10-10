$('.fa-search').click(function () {

    let redirect_url = `${app_url}`;
    let search_input = $('.search_input').val();
    let category_input = $(".category_input span[selected='selected']").attr('value');
    let location_input = $(".location_input span[selected='selected']").attr('value');

    redirect_url += `?s=${search_input}`;
    if (category_input != "") {

        redirect_url += `&c=${category_input}`;

    }
    if (location_input != "") {

        redirect_url += `&l=${location_input}`;

    }

    redirect(redirect_url);

});

function redirect(url) {

    location.href = url

}

// show profile
$('#show_AP03').click(function () {

    $('#show_AP03').parent().next().fadeToggle(100);

});

// when click out of the profile select , profile select closed
$(window).click(function (e) {

    if ($('#show_AP03').attr('id') !== $(e.target).attr('id')) {

        $('#show_AP03').parent().next().fadeOut(100);

    }

});

// report bug modal 
$('#report_bug').click(function (e) {

    e.preventDefault();
    $('#bug_modal').fadeIn();
    $('body').css('overflow' , 'hidden');

    $('#close_BM').click(function () {

        $('#bug_modal').fadeOut();
        $('body').css('overflow' , 'auto');

    })

});