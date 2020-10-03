$('#show_AP03').click(function(){

    $('#show_AP03').parent().next().fadeToggle();

});

$('.fa-search').click(function(){

    let redirect_url = `${app_url}`;
    let search_input = $('.search_input').val();
    let category_input = $('.category_input option').attr('value');
    let location_input = $('.location_input option').attr('value');

    redirect_url += `?s=${search_input}`;
    if(category_input != ""){
        redirect_url += `&c=${category_input}`;
    }
    if(location_input != ""){
        redirect_url += `&l=${location_input}`;
    }

    window.location.href = redirect_url;

});
