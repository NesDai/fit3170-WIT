/**
 * This file contains functions related to the Likert scale
 * @author Jia Yao
 */

/**
 * Generates agree likert scale buttons to the div likert_scale in chatbot.html
 */
function makeAgreeLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px; margin-left: 0; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Strongly <br> Disagree </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br><br> Disagree </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br><br><br> Neutral </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br><br><br>Agree </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br><br> Strongly<br> Agree </span>
         </button>`;

    componentHandler.upgradeDom();
}

/**
 * Generates satisfy likert scale buttons to the div likert_scale in chatbot.html
 */
function makeSatisfyLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px; margin-left: 0; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Very <br> Dissatisfied </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br><br> Dissatisfied </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br><br><br> Neutral </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br><br><br>Satisfied </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br><br> Very<br> Satisfied </span>
         </button>`;

    componentHandler.upgradeDom();
}

/**
 * Generates confident likert scale buttons to the div likert_scale in chatbot.html
 */
function makeConfidentLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 13%; border-radius: 12px; margin-left: 0; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Not Confident <br> At All </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br> Somewhat <br> Not Confident </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br> <br> Moderately <br>Confident </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br> <br> Somewhat <br>Confident </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br> <br> Extremely <br>Confident </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>6<br> <br> Not <br>Applicable </span>
         </button>`;

    componentHandler.upgradeDom();
}

/**
 * Generates interested likert scale buttons to the div likert_scale in chatbot.html
 */
function makeInterestedLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px; margin-left: 0; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Extremely <br>Not<br> Interested </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br>Not<br>Interested </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br><br><br> Neutral </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br><br><br>Interested </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br><br> Extremely<br> Interested </span>
         </button>`;

    componentHandler.upgradeDom();
}