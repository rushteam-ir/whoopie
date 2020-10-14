// create tag with clicl on tik btn
$('.add_tags').click(function () {

    createTag();

});

// create tag with press enter key
$('#tags_field').keypress(function (e) {

    let key = e.which;

    if (key == 13) {

        createTag();
        e.preventDefault();

    }

});

// create tag function

let flag = 0;
function createTag(){

    let tag = $('#tags_field').val();

    if(flag < 5){

        if (tag !== '') {

            let tag_container = '<div class="tags_lable mr-2"><p>' + tag + '</p><i class="fas fa-times remove_tag"></i><input type="hidden" name="tags_inp[]" value="'+ tag +'"></div>';
    
            $('.tags_lable_field').append(tag_container);
            $('#tags_field').val('');
    
            // remove tags affter add tags
            $('.remove_tag').click(function () {
    
                $(this).parent().remove();
            
            });
    
            flag++;
    
        }

    }

}

// remove tags in article list
$('.remove_tag').click(function () {

    $(this).parent().remove();

});