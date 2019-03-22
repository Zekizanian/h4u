$(document).ready(function(){
    var clientEmail =''
    $.get("/no-cache/profileSystem/getProfile", function(data){
        clientEmail = data.Email;
        if(data.IsUserDefined) {
            $.ajax({
                url:'/api/dataentities/CL/search?_fields=privacyPolicyAgreed,isNewsletterOptIn&_where=email=' + data.Email ,
                type:'GET'
            }).success(function(response){
                console.log(response);
                if(response[0].privacyPolicyAgreed){
                    $('label.radio .aceita').prop('checked', true);
                    $('label.radio .naoaceita').prop('checked', false);
                }else{
                    $('label.radio .naoaceita').prop('checked', true);
                    $('label.radio .aceita').prop('checked', false);
                }
            });

        }else{
            $('.mobile-only p.welcome').html('<span>Bem-vindo à HEALTH FOR YOU!</span><a href="/login"> INICIAR SESSÃO</a>');
        }
    });
    
    $(document).on('change', '.form-contact-data-newsletter input',function(){
        mudaPermicao(clientEmail ,$('label.radio .aceita').is(':checked'))
    });

    if($('body').hasClass('account')){
        $(document).on('click','a[data-toggle="modal"]', function(){
            $('.modal.hide.fade').addClass('show');
        });
        $('#editar-perfil-conteudo').prependTo('.tabs__item--user-info');
        $('.form-contact-data-newsletter').appendTo('.profile-detail-form-contact-data');
        $('#address-edit, #address-remove').removeClass('fade');
        $('.address-display-block').removeClass('span-6');
    }
});

function mudaPermicao(email, bool){
    $.ajax({
        
        url:"http://api.vtex.com/edolportugal/dataentities/CL/documents",
        type: "PATCH",
        //"timeout": 0,
        accept: 'application/vnd.vtex.ds.v10+json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            email:email,
            isNewsletterOptIn:bool
        })
    });
}