$(document).ready(function(){
    checkUserLoggedIn();
})
function checkUserLoggedIn() {

    var user = '';
    var user_info;

    $.get("/no-cache/profileSystem/getProfile", function(data){

        user_info = data;

        if(user_info.IsUserDefined) {

        	// $('.header .sing-in a.header-login').attr('title', 'Minha Conta');
            // $('.header .sing-in .head-loginitens .head-loginsepara').hide();
            // $('.header .sing-in .head-loginitens ul li.head-loginentrar a, .menu-mobile-account .link-login a').attr({
            // 	id: 'sair',
			//     href: '/no-cache/user/logout/',
			//     title: 'Sair'
			// });
            // $('.header .sing-in .head-loginitens ul li.head-loginentrar a').addClass('sing-out').text('Sair');
            // $('.menu-mobile-account .link-login a').addClass('sing-out');
            // $('.menu-mobile-account .link-login a .user-text-mobile').text('Sair')
            
            if( user_info.FirstName ) {
                user = user_info.FirstName;
            } else {
            	var email = user_info.Email.split('@');
                user = email[0];
            }
            $('.navigation__login-link').first().css('visibility', 'visible');
            $('.mobile-only p.welcome').html('<span>Olá '+user+'!</span><a href="/no-cache/user/logout/"> TERMINAR SESSÃO</a>');
        }else{
            $('.mobile-only p.welcome').html('<span>Bem-vindo à HEALTH FOR YOU!</span><a href="/login"> INICIAR SESSÃO</a>');
        }

    });

}