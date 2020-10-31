$('.search_button_1').click(function () {

    let redirect_url = `${app_url}`;
    let search_input = $('.search_input_1').val();
    let category_input = $(".search_category_input_1").val() ? $(".search_category_input_1").val() : '0';
    let location_input = $(".search_city_input_1").val() ? $(".search_city_input_1").val() : '0';

    redirect_url += `?s=${search_input}`;
    if (category_input != "") {

        redirect_url += `&c=${category_input}`;

    }
    if (location_input != "") {

        redirect_url += `&l=${location_input}`;

    }

    redirect(redirect_url);

});

$('.search_button_2').click(function () {

    let redirect_url = `${app_url}`;
    let search_input = $('.search_input_2').val();
    let category_input = $(".search_category_input_2").val() ? $(".search_category_input_2").val() : '0';
    let location_input = $(".search_city_input_2").val() ? $(".search_city_input_2").val() : '0';

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
for (let h = 0; h < $('.report_bug').length; h++) {

    $('.report_bug').eq(h).click(function (e) {

        e.preventDefault();
        $('#bug_modal').fadeIn();
        $('body').css('overflow', 'hidden');

        $('#close_BM').click(function () {

            $('#bug_modal').fadeOut();
            $('body').css('overflow', 'auto');

            if ($(window).width() < 1000) {

                $('body').css('overflow', 'hidden');

            }

        });

    });

}

// search in sandich nav bar custom js , when click on search text , open search inp and selects
let nav_search = $('#SV_S');
let test = $('.search_option')[0].scrollHeight + 'px';

nav_search.click(function () {

    let search_op = $(this).next();
    if (search_op.css('max-height') !== '0px') {

        search_op.css('max-height', '0px');
        search_op.css('overflow', 'hidden');
        $(this).removeClass('change_background')

    } else {

        search_op.css('max-height', test);
        $(this).addClass('change_background');

        setTimeout(function () {

            search_op.css('overflow', 'unset');

        }, 200);

    }

});

// when click on triple line in nav bar open sandwich nav bar for mobile and tablet
$('.sandwich_nav').click(function () {

    let nav_field = $(this).next();
    nav_field.addClass('show_SN');
    $('.SN_layout').addClass('show_layer');
    $('body').css('overflow', 'hidden');

    // if user resize browser , close sadwich navbar when window width bigger than 1000
    $(window).resize(function () {

        if ($(window).width() > 1000) {

            nav_field.removeClass('show_SN');
            $('.SN_layout').removeClass('show_layer');

        }

    });

    // close sadwich nav bar when click on close icon
    $('#close_navmenu').click(function () {

        nav_field.removeClass('show_SN');
        $('.SN_layout').removeClass('show_layer');
        $('body').css('overflow', 'auto');

    })

    // close sandwich navbar when click on out side of navbar
    $('.SN_layout').click(function () {

        nav_field.removeClass('show_SN');
        $('.SN_layout').removeClass('show_layer');
        $('body').css('overflow', 'auto');

    })

});

// fix modal and navbar overflos bugs
$(window).resize(function () {

    if ($(this).width() > 1000) {

        $('body').css('overflow', 'auto');

    }
    if ($('#bug_modal').css('display') == 'block') {

        $('body').css('overflow', 'hidden');

    }
    if ($('#register_modal').css('display') == 'block') {

        $('body').css('overflow', 'hidden');

    }
    if ($('#login_modal').css('display') == 'block') {

        $('body').css('overflow', 'hidden');

    }

})
