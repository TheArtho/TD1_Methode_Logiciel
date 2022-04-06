function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(",");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}

document.cookie = 'path=/,';

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
                document.cookie = 'username='+login_data.username+',token='+data.value+',path=/';
                window.location.href = "app.html";
            }
            else {
                $('.log-error').remove()
                $('.auth-form').prepend('<p class="log-error">'+data.message+'</p>');
            }
        })
    });

    $('#signup').click(function() {
        console.log("Connecting...");

        let login_data = {
            username: $('#user_username').val(),
            password: $('#user_password').val()
        }

        $.ajax({
            type: 'POST',
            url: 'signup',
            data: login_data,
            dataType: 'json'
        }).done(function (data) {
            
            if (data.success) {
                window.location.href = "./";
            }
            else {
                $('.log-error').remove()
                $('.auth-form').prepend('<p class="log-error">'+data.message+'</p>');
            }
        })
    });
})