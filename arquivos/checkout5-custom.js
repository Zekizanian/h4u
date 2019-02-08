$(document).ajaxSuccess(function(event,xhr,settings){
    if($('p.newsletter').length > 0 && $('#termos').length == 0){
        $('p.newsletter').before('<div id="termos">'+
                                    '<input type="checkbox" id="aceito-termos" name="aceito-termos" value="aceito-termos"> '+
                                    '<label for="aceito-termos"></label>'+
                                    '<span>'+
                                    '    Li e aceito as <a href="/sobre-a-health-for-you#condicoes-gerais">Condições Gerais</a> e a <a href="/sobre-a-health-for-you#politica-privacidade">Política de Privacidade.</a> '+
                                    '</span>'+
                                '</div>')
    }
})
