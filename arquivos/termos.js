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
    autorizaNewsletter($('#aceito-termos'),$('.newsletter-button-ok'));
})
$(document).on('change', '#aceito-termos', function(){
    console.log('fora da autoriza news');
    console.log($('.newsletter fieldset'));
    autorizaNewsletter($('#aceito-termos'),$('.newsletter-button-ok'));
});

function autorizaNewsletter(idCheck,idBotao) {
    var fonte = idBotao.parent();
    if(idCheck.is(':checked') == false){
        idBotao.prop('disabled', true)
        .css('pointer-events', 'none');
        $('#chk-error').show();
        fonte.off('click');
        fonte.on('click', function(e){
            console.log('click!!!');
        })
        fonte.children().off('click');
        fonte.children().on('click', function(e){
            e.stopPropagation();
        })
    }else{
        idBotao.prop('disabled', false)
        .removeAttr('style');
        $('#chk-error').hide();
        
        fonte.off('click');
        fonte.children().off('click');
    }
} 



