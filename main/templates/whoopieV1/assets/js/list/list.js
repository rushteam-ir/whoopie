$('.ad_delete').click(function (){

    let ad_id = $(this).attr('name');

    Swal.fire({
        title: 'مطمئنی میخوای حذف کنی ؟',
        text: "دیگه نمیتونی به این آگهی دسترسی داشته باشی بعد از حذف کردنش پس فکراتو بکن",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '! آره پاک کن',
        cancelButtonText: 'نه'
    }).then((result) => {
        if(result.value){
            redirect(`${app_url}list/delete-ad/?ad_id=${ad_id}`)
        }
    })

})
