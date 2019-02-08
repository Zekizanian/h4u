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
                                                    '</div>')
        }
    })
}