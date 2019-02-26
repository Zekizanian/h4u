$(document).ready(function(){
    var clientEmail = $('p.welcome').html().split('Olá')[1].split('.<em>')[0];
    $('#editar-perfil-conteudo').prependTo(".tabs__item--user-info");
    $('#editar-perfil-conteudo .form-contact-data-cellphone').after($('.tabs__item--user-info .form-contact-data-newsletter'));
    $.ajax({
        url:'/api/dataentities/CL/search?_fields=email,privacyPolicyAgreed,isNewsletterOptIn&_where=email=' + clientEmail ,
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
    $(document).on('click', '#profile-submit',function(){
        mudaPermicao(clientEmail ,$('label.radio .aceita').is(':checked'))
    });
});
function mudaPermicao(email, bool){
    $.ajax({
        url:"/api/dataentities/CL/documents",
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

