window.onload = disableTranslateButton();

function changeLang(lang){
    console.log(window.location);
    localStorage.setItem(LANGUAGE_KEY, lang);
    disableTranslateButton()
}

function disableTranslateButton(){

    let lang = localStorage.getItem(LANGUAGE_KEY);
  
    if (lang == "Malay"){
        // change the title
        document.getElementById("select_language").innerHTML = "Pilih Bahasa";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "teruskan";
    }
    else if (lang == "Chinese (Simplified)"){
        // change the title
        document.getElementById("select_language").innerHTML = "选择语言";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "继续";
    }
    else if (lang == "Thai"){
        // change the title
        document.getElementById("select_language").innerHTML = "เลือกภาษา";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "ดำเนินต่อ";
    }
    else{
        // change the title
        document.getElementById("select_language").innerHTML = "Select Language";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "Continue";
    }
  }