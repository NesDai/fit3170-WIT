preferenceList = [];

function addToPreferences(id){
    let element = document.getElementById(id);
    let elementTxt = element.value;
    console.log(elementTxt);
    
    if(!preferenceList.includes(elementTxt)){
        preferenceList.push(elementTxt);
    }

}

function confirmPreference(){
    if(preferenceList.length === 0){
        alert("No topics were selected");
    }
    else{
        if(confirm("Confirm selected topics?")){
            location.href = "recommenderUi.html";
        }
        else{
            alert("Action cancelled");
        }
    }
}