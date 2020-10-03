$('#show_AP03').click(function(){
    
    let profileClicked = $(this);

    profileClicked.next().fadeToggle(100);


});

$('.fa-search').click(function(){

    let redirect_url = `${app_url}`;
    let search_input = $('.search_input').val();
    let category_input = $('.category_input span:selected').attr('value');
    let location_input = $('.location_input option:selected').attr('value');

    redirect_url += `?s=${search_input}`;
    if(category_input != ""){
        redirect_url += `&c=${category_input}`;
    }
    if(location_input != ""){
        redirect_url += `&l=${location_input}`;
    }

    redirect(redirect_url);

});

function redirect(url) {
    location.href = url
}
