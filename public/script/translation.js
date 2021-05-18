

const LANGUAGE_KEY = "LANGUAGE"


window.onload = function(){
    let language = getUserLanguage()
    translateLanguage(language); //translate the page
}

function getUserLanguage(){
    return  localStorage.getItem(LANGUAGE_KEY)
}


function googleTranslateElementInit() {
            new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element');
}

function translateLanguage(lang) {

    if (lang == "Malay")
        language = "ms";
    else if (lang == "Chinese (Simplified)")
        language = "zh-CN";
    else if (lang == "Thai")
        language = "th"
    else
        language = "en"

    // save language for the user upon login
    localStorage.setItem(LANGUAGE_KEY, language);

    console.log("fgsuoibfgnoi")


    googleTranslateElementInit();
    var $frame = $('.goog-te-menu-frame:first');
    if (!$frame.size()) {
        alert("Error: Could not find Google translate frame.");
        return false;
    }
    $frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();

    return false;
}
