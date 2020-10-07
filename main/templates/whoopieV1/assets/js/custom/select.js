// get elements
let title = $('.select_click');
let option_parent = $('.WCD_optopn');

// when click on title of select open it
// when click op option , select that option

for (let j = 0; j < title.length; j++) {

    title.eq(j).click(function () {

        $(this).parent().toggleClass('up_up');
        
        let ThisOptionParent = $(this).next();
        let thisOption = $(this).next().children().children();

        ThisOptionParent.fadeToggle(100);

        // when option is selected , select is closed
        thisOption.click(function () {

            option_parent.fadeOut(100);

        });

        // when user chose option , select that option 
        for (let i = 0; i < thisOption.length; i++) {

            thisOption.eq(i).click(function () {

                thisOption.attr('selected' , false);
                $(this).attr('selected' , true);

                $(this).parent().parent().prev().prev().children('p').text($(this).text());

            });

        }

    });

}

// when click out of the title of select , close the select
title.click(function(){

    let titleClicked = $(this);

    $(window).click(function(e){

        if(titleClicked.attr('id') !== $(e.target).attr('id')){
            
            titleClicked.next().fadeOut(100);
            titleClicked.parent().removeClass('up_up');

        }
    
    });

});
