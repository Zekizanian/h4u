$(document).ready(function(){
    //termos login
    if($('body').hasClass('login')){
        $(document).on('click','#loginWithUserAndPasswordBtn',function(){
            if($('.vtexid-password-requirements #termos').length == 0){
                $('.vtexid-password-requirements').append('<div id="termos">'+
                                                            '<input type="checkbox" id="aceito-termos-2" name="aceito-termos-2" value="aceito-termos"> '+
                                                            '<label for="aceito-termos-2"></label>'+
                                                            '<span>'+
                                                            '    Li e aceito as <a href="/sobre-a-health-for-you#condicoes-gerais">Condições Gerais</a> e a <a href="/sobre-a-health-for-you#politica-privacidade">Política de Privacidade.</a> '+
                                                            '</span>'+
                                                        '</div>'+
                                                        '<div id="newsletter-check">'+
                                                            '<input type="checkbox" id="aceito-newsletter" name="aceito-newsletter" value="aceito-newsletter"> '+
                                                            '<label for="aceito-newsletter"></label>'+
                                                            '<span>'+
                                                            '    Desejo receber todas as novidades e descontos por email.'+
                                                            '</span>'+
                                                        '</div>'+
                                                        '<div id="chk-error">'+
                                                            '<span>Por favor leia e aceite as Condições Gerais e a Política '+
                                                            'de Privacidade da Health For You antes de avançar.</span>'+
                                                        '</div>');
                
                    autorizaNewsletter($('#aceito-termos-2'),$('#tryChangePswdBtn'));
            }
            $(document).on('change','#aceito-termos-2',function(){
                autorizaNewsletter($('#aceito-termos-2'),$('#tryChangePswdBtn'));
            })
        })
    }
    //termos newsletter
    autorizaNewsletter($('input[id^=aceito-termos]'),$('.newsletter-button-ok'));
})
$(document).on('change', 'input[id^=aceito-termos]', function(){
    autorizaNewsletter($('input[id^=aceito-termos]'),$('.newsletter-button-ok'));
});
$(document).ajaxSuccess(function(event,xhr,options){
    var clientEmail = $('#appendedInputButton[type="email"]').val();
    if(options.url.indexOf('https://edolportugal.myvtex.com/api/vtexid/pub/authentication/classic/setpassword') != -1){
        xhr.success(function(response){
            if(response.authStatus == "Success"){
                $.ajax({
                    url:"/api/dataentities/CL/documents",
                    type: "PUT",
                    //"timeout": 0,
                    accept: 'application/vnd.vtex.ds.v10+json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        email: clientEmail,
                        privacyPolicyAgreed:true
                    })
                })
            }
        });
    }
})
function autorizaNewsletter(idCheck,idBotao) {
    function localidade(fonte){
        if(fonte[0].localName == "fieldset"){
            fonte.find('p')
            .first()
            .hide();
            if ($('#chk-error').length==0){
                fonte.prepend('<div id="chk-error">'+
                '<span> Por favor leia e aceite a Política '+
                'de Privacidade da Health For You antes de avançar.</span>'+
                '</div>')
            }
        }else if(fonte[0].localName == "div"){
            if ($('#chk-error').length == 0){
                $('#newsletter-check').append('<div id="chk-error">'+
                '<span> Por favor leia e aceite as Condições Gerais e a Política '+
                'de Privacidade da Health For You antes de avançar.</span>'+
                '</div>')
            }
        }
    }
    var fonte = idBotao.parent();
    if(idCheck.is(':checked') == false){
        idBotao.prop('disabled', true)
        .css('pointer-events', 'none');
        $('#chk-error').show();
        fonte.off('click');
        fonte.on('click', function(e){
            localidade(fonte);
        })
        fonte.children().not('.vtexIdUI-back-link').off('click');
        fonte.children().on('click', function(e){
            e.stopPropagation();
        })
    }else{
        idBotao.prop('disabled', false)
        .removeAttr('style');
        $('#chk-error').hide();
        $('#chk-error').remove();
        fonte.find('p').show();
        fonte.off('click');
        fonte.children().not('.vtexIdUI-back-link').off('click');
    }
    
} 



