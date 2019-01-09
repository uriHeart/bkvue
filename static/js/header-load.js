 $(document).ready(function () {
    $.ajax({
                url: '/user/login_chk',
                type: 'POST',
                dataType:'json',
                data: JSON.stringify({
                 }),
                contentType: "application/json",
                cache: false,
                success: function(responseJson) {
                    is_login = responseJson.is_login;
                    user_id = responseJson.id

                    if(is_login) {
                        $('#btn_login').html('\
                            <li><a href="/static/sub/api.html">API</a></li>\
                            <li class="log_btn" class="login"><a href="#" class="login">'+responseJson.id+' 님</a></li>\
                            <li class="log_btn" class="login"><a href="/user/logout" class="login">Logout</a></li>\
                        ')
                    } else {
                        $('#btn_login').html('\
                            <li><a href="/static/sub/api.html">API</a></li>\
                            <li><a href="/static/home/join.html">Sign Up</a></li>\
                            <li class="log_btn"><a href="/static/home/login.html">Login</a></li>\
                        ')
                    }
                 }
            }); })

 // $(document).ajaxComplete(function( event, xhr, settings ) {
 //    if ( settings.url === "/static/home/header.html" ) {
 //
 //
 //        }
 //    });