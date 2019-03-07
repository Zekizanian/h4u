$(document).ajaxSuccess(function(event,xhr,settings){
    if($('p.newsletter').length > 0 && $('#termos').length == 0){
        $('p.newsletter').before('<div id="termos">'+
                                    '<input type="checkbox" id="aceito-termos" name="aceito-termos" value="aceito-termos"> '+
                                    '<label for="aceito-termos"></label>'+
                                    '<span>'+
                                    '    Li e aceito as <a href="/sobre-a-health-for-you#condicoes-gerais">Condições Gerais</a> e a <a href="/sobre-a-health-for-you#politica-privacidade">Política de Privacidade.</a> '+
                                    '</span>'+
                                '</div>');
        $('p.newsletter').after('<div id="chk-error" style="display:none">'+
                                        '<span>Por favor leia e aceite as Condições Gerais e a Política '+
                                        'de Privacidade da Health For You antes de avançar.</span>'+
                                    '</div>')
        autorizaNewsletter($("#aceito-termos"),$('#go-to-shipping, #go-to-payment'));
        
    }
    $('span.newsletter-text').text(' Desejo receber todas as novidades e desconto por email');
    if($('.newsletter-label > span.newsletter-text').length > 0){
        $('.newsletter-label > span.newsletter-text').insertAfter($('.newsletter-label'))
    }
    if($('.newsletter-label > input').length > 0){
        $('.newsletter-label').attr('for', 'opt-in-newsletter');
        $('.newsletter-label > input').insertBefore($('.newsletter-label'));
    }
    
    
});
$(document).on('click', '#go-to-shipping, #go-to-payment', function(){
    if($("#aceito-termos").is(':checked')){
        var clientEmail = $('p.client-profile-email span.email').text();
        $.ajax({
            url:"/api/dataentities/CL/documents",
            type: "PATCH",
            //"timeout": 0,
            accept: 'application/vnd.vtex.ds.v10+json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                email: clientEmail,
                privacyPolicyAgreed:true
            })
        })
    }
})
$(document).on('change', '#aceito-termos', function(){
    autorizaNewsletter($(this),$('#go-to-shipping, #go-to-payment'));
})
function autorizaNewsletter(idCheck,idBotao) {
    var fonte = idBotao.parent();
    if(idCheck.is(':checked') == false){
        console.log(idBotao);
        idBotao.prop('disabled', true)
        .css('pointer-events', 'none');
        // $('#chk-error').show();
        fonte.off('click');
        fonte.on('click', function(e){
            $('#chk-error').show();
        })
        fonte.children().off('click');
        fonte.children().on('click', function(e){
            e.stopPropagation();
        })
    }else{
        idBotao.prop('disabled', false);
        idBotao.css( 'pointer-events','all' );
        $('#chk-error').hide();
        fonte.off('click');
        fonte.children().off('click');
    }
} 
