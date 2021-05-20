

const LANGUAGE_KEY = "LANGUAGE"

// window.onload = execute();

// function execute(){
//     translateLanguage(localStorage.getItem("LANGUAGE"));
// }

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
    // reset();

    // if (lang == "Malay")
    //     language = "ms";
    // else if (lang == "Chinese (Simplified)")
    //     language = "zh-CN";
    // else if (lang == "Thai")
    //     language = "th"
    // else
    //     language = "en"

    // save language for the user upon login
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
