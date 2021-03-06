// report bug modal

$(document).on('click', '.ads_bug_open', function() {

    $("input[name=ad_id_inp]").attr('value', $(this).attr('name'))

    $('#ads_bug').fadeIn();
    $('body').css('overflow' , 'hidden');

    $('#close_AB').click(function () {

        $('#ads_bug').fadeOut();
        $('body').css('overflow' , 'auto');

    })

});

$(window).scroll(function() {

    console.log({
        top : $(window).scrollTop(),
        menha : $(document).height() - $(window).height(),
    })

    if($(window).scrollTop() + 2 >= $(document).height() - $(window).height()) {

        page_query = (parseInt(page_query) + 1).toString();

        $.post(`${app_url}api/v1/search/load`,
        {
            s: search_query,
            c: category_query,
            l: location_query,
            p: page_query
        },
        function(data, status){

            let city_list = data.city_list;
            let sex_list = data.sex_list;

            for(let i = 0; i < data.ad_list.length; i++){

                let ad_info = data.ad_list[i];
                let ad_card_html = `
                
                    <div class="ads_card_field mb-4">
                        <div class="right_card_box">
                            <div class="RS_field">
                                <button class="btn ads_bug_open">
                                    <i class="fas fa-exclamation-circle" ></i>
                                </button>
                                <button class="btn">
                                    <i class="fas fa-share-alt"></i>
                                </button>
                            </div>
                            <div class="ads_profile_info">
                                    <img src="${ad_info.author.avatar == null ? 'img/AP03.png' : 'media/avatars/' + ad_info.author.avatar}" alt="">
                                <div>
                                    <p>${ad_info.author.first_name} ${ad_info.author.last_name}</p>
                                    <p>
                                        ${city_list[ad_info.author.city]}
                                        <span class="mx-1"> | </span>
                                        تاریخ ایجاد : ${ad_info.created_date}
                                    </p>
                                </div>
                            </div>
                                <div class="ads_card_info">
                                    <div>
                                        <p>${ad_info.title}</p>
                                        <span>#${ad_info.category.title}</span>
                                    </div>
                                    <p class="ads_summary">${ad_info.summary}</p>
                                </div>
                        </div>
                        <div class="left_card_box">
                            <p><span> جنسیت :  </span>
                                ${sex_list[ad_info.author.sex]}
                            </p>
                            <p><span> نوع همکاری : </span>
                                ${ad_info.type == '0' ? 'حضوری' : 'غیر حضوری'}
                            </p>
                            <a href="${app_url}?w=${ad_info.unique_id}" class="btn">مشاهده</a>
                        </div>
                    </div>
                
                `;

                $('.ads_card_list').append(ad_card_html)

            }

        });

    }
});