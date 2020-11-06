Fingerprint2.getV18({}, function (result, com) {

    $.post(`${app_url}api/v1/analyse`, {
        token_inp : result
    }, function (data, status){

        console.log('token sent')

    })

});