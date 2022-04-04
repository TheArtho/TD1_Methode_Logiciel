$(() => {
    console.log("Ready!");

    $('#connect').click(function() {
        console.log("Connecting...");

        let login_data = {
            username: $('#user_username').val(),
            password: $('#user_password').val()
        }

        $.ajax({
            type: 'POST',
            url: 'login',
            data: login_data,
            dataType: 'json'
        }).done(function (data) {

            if (data.success) {
                window.location.href = "app.html";
            }
            else {
                $('.log-error').remove()
                $('.auth-form').prepend('<p class="log-error">'+data.message+'</p>');
            }
        })
    });
})