/**
 * This file contains functions related to the Likert scale
 * @author Jia Yao
 */


/**
 * Constants for likert scale description
 * Hash map, based on language as key
 */

let hash = new Object();
hash[EN_INDEX] =
    [
        // Agree
        ["Strongly <br> Disagree", "Disagree", "Neutral", "Agree", "Strongly<br> Agree"],

        // Satisfy
        ["Not <br> Applicable", "Very <br>Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very<br> Satisfied"],

        // Confident
        ["Not <br> Applicable", "Not Confident <br> At All", "Somewhat <br> Not Confident", "Moderately <br>Confident" , "Somewhat <br>Confident", "Extremely <br>Confident"],

        // Interested
        ["Extremely <br>Not<br> Interested", "Not<br>Interested", "Neutral", "Interested", "Extremely<br> Interested"]

    ];

hash[ZH_CN_INDEX] =
    [
        // Agree
        ["非常不同意", "不同意", "中立", "同意", "非常同意"],

        // Satisfy
        ["不适用(N/A）", "非常不满意", "不满意", "中立", "满意", "非常满意"],

        // Confident
        ["不适用(N/A)", "极度不自信", "有点不自信", "适度自信" , "有点自信", "极度自信"],

        // Interested
        ["非常不感兴趣", "没兴趣", "中立", "感兴趣", "非常感兴趣"]

    ];

hash[MS_INDEX] =
    [
        // Agree
        ["Sangat <br> tidak <br>  setuju", "Tidak <br> setuju", "Neutral", "Setuju", "Sangat <br> setuju"],

        // Satisfy
        ["Tidak <br> berkenaan", "Sangat tidak<br> berpuas<br> hati", "Tidak <br> berpuas <br>hati", "Neutral", "Berpuas <br> hati", "Sangat <br> berpuas hati"],

        // Confident
        ["Tidak <br> berkenaan", "Tidak yakin <br> sama sekali", "Agak <br> tidak yakin", "Cukup <br> yakin" , "Agak <br> yakin", "Sangat <br> yakin"],

        // Interested
        ["Sangat <br> tidak <br> berminat", "Tidak <br> berminat", "Neutral", "Berminat", "Sangat <br> berminat"]

    ];

hash[TH_INDEX] =
    [
        // Agree
        ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย ", "กลางๆ", "เห็นด้วย ", "เห็นด้วยอย่างมาก"],

        // Satisfy
        ["ไม่เกี่ยวข้อง/ <br> ฉันไม่ได้ทำงาน", "ไม่พึงพอใจอย่างมาก", "ไม่พึงพอใจ ", "กลางๆ", "พอใจ", "พอใจมาก"],

        // Confident
        ["ไม่เกี่ยวข้อง ", "ไม่มีความมั่นใจเลย", "ไม่ค่อยมั่นใจ", "มั่นใจเล็กน้อย" , "ค่อนข้างมั่นใจ", "มั่นใจมาก"],

        // Interested
        ["ไม่มีความสนใจเป็นอย่างมาก", "ไม่สนใจ", "เฉยๆ", "สนใจ", "สนใจอย่างมาก"]

    ];

/**
 * General function to make likert scales
 * @language the language index
 */

function makeLikertScale(language, type) {
    // Get the scale
    let scaleString = "";
    switch (type){
        case "agree":
            scaleString = getScaleString(language, 0, [1, 2, 3, 4, 5]);
            break;
        case "satisfy":
            scaleString = getScaleString(language, 1, [0, 1, 2, 3, 4, 5]);
            break;
        case "confident":
            scaleString = getScaleString(language, 2, [0, 1, 2, 3, 4, 5]);
            break;
        case "interested":
            scaleString = getScaleString(language, 3, [1, 2, 3, 4, 5]);
            break;
        default:
            console.log("Invalid scale type provided @ likert-scale.js/makeLikertScale()");
    }

    document.getElementById('likert_scale').innerHTML = scaleString;
    componentHandler.upgradeDom();
}

function getScaleString(language, scaleIndex, options) {
    // Get the font size
    let fontSize = "";
    switch (language) {
        case EN_INDEX:
            fontSize = "calc(65% + 0.05vw)"
            break;
        case ZH_CN_INDEX:
            fontSize = "calc(80% + 0.08vw)"
            break;
        case MS_INDEX:
            fontSize = "calc(65% + 0.08vw)"
            break;
        case TH_INDEX:
            fontSize = "calc(75% + 0.08vw)"
            break;
    }

    let scaleString = "";

    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        if (option === 3) {
            scaleString += "<br>";
        }

        scaleString +=
            `<button 
             id = ${option}
             class="mdl-button mdl-js-button mdl-button--raised notranslate"
             style="margin-bottom: 1em;display: inline-block;width: 30%; border-radius: 12px; margin-left: 0; font-size: `+fontSize+`; height: 80px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(${option})'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>${option}<br> <br> `+hash[language][scaleIndex][i]+` </span>
             </button>`
    }

    return scaleString;
}