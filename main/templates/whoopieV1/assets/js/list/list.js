Swal.fire({
    title: 'مطمئنی میخوای حذف کنی ؟',
    text: "دیگه نمیتونی به این آگهی دسترسی داشته باشی بعد از حذفش !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    }
})
