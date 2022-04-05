function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; ++i) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

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
                document.cookie = 'username='+login_data.username+';token='+data.token+'path=/;';
                window.location.href = "app.html";
            }
            else {
                $('.log-error').remove()
                $('.auth-form').prepend('<p class="log-error">'+data.message+'</p>');
            }
        })
    });
})