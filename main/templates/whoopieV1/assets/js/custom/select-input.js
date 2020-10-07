let children = $('.WCD_optopn').children();

for(let i = 0 ; i < children.length ; i ++){

    children.eq(i).click(function (){

        $(this).parent().next().attr('value', $(this).attr('value'))
    })

}
