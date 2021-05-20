

const LANGUAGE_KEY = "LANGUAGE"

window.onload = disableTranslateButton();

function disableTranslateButton(){

    let lang = localStorage.getItem(LANGUAGE_KEY);

    if (lang == "Malay")
        document.getElementById("lang_butt_id_m").disabled = true;
    else if (lang == "Chinese (Simplified)")
        document.getElementById("lang_butt_id_c").disabled = true;
    else if (lang == "Thai")
        document.getElementById("lang_butt_id_t").disabled = true;
    else
        document.getElementById("lang_butt_id_e").disabled = true;

}



function getUserLanguage(){
    return  localStorage.getItem(LANGUAGE_KEY)
}

function changeLang(lang){


    translateLanguage(lang)
    setTimeout(function() {
        window.location.reload(false) 
    }, 50);
}
    

    



function reset(){
    localStorage.setItem(LANGUAGE_KEY, "en");
    jQuery('#\\:2\\.container').contents().find('#\\:2\\.restore').click();
    setTimeout(function() {
        window.location.reload(false) 
    }, 50);
    // window.location.reload(false)

}


function googleTranslateElementInit() {
            new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element');
}

function translateLanguage(lang) {


    localStorage.setItem(LANGUAGE_KEY, lang);

    googleTranslateElementInit();
    var $frame = $('.goog-te-menu-frame:first');
    if (!$frame.size()) {
        alert("Error: Could not find Google translate frame.");
        return false;
    }
    $frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
    return false;
}
