function newsletterNew(element) {
	var emailNews = $(element).find("#newsletterClientEmail").val()
	var emailValido=validaEmail(emailNews);
	if(!emailValido){
        alert('Por favor, insira um email válido');
    }else if ($('input[id^="aceito-termos"').is(':checked')==false){
        alert('Por favor leia e aceite as plíticas de privacidade');
	}else{
		$(element).find('#newsletterClientEmail, #newsletterButtonOK').hide();
		$(element).find('#newsletterLoading').show();
		var ajaxData = {
			email:emailNews.toString(),
            isNewsletterOptIn:true,
            privacyPolicyAgreed:true
		}
		var settings = {
			url:"/api/dataentities/CL/documents",
			type: "PATCH",
			//"timeout": 0,
			accept: 'application/vnd.vtex.ds.v10+json',
        	contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(ajaxData)
		}
		$.ajax(settings).success(function(data, textStatus, jqXHR){
			$(element).find('#newsletterLoading').hide();
			$(element).find('#newsletterSuccess').show();
			$(element).find('#newsletterSuccess2').show();
		}).fail(function(response, rr, ttt){
			$(element).find('#newsletterLoading').hide();
			$(element).find('#newsletterError').show();
		});
	}
}
function validaEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}