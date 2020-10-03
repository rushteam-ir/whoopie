// get elements
let title = $('.WCD_title');
let option = $('.WCD_optopn span');
let option_parent = $('.WCD_optopn');

// when click on title of select open it
// when click op option , select that option

for (let j = 0; j < title.length; j++) {

    title.eq(j).click(function () {

        let thisTitle = $(this);
        let ThisOptionParent = $(this).next();
        let thisOption = $(this).next().children();

        ThisOptionParent.fadeToggle(100);

        // when option is selected , select is closed
        thisOption.click(function () {

            option_parent.fadeOut(100);

        });

        // when user chose option , select that option 
        for (let i = 0; i < thisOption.length; i++) {

            thisOption.eq(i).click(function () {

                thisOption.attr('selected' , false)
                $(this).attr('selected' , true);

                thisTitle.text($(this).text());

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

        }
    
    });

});