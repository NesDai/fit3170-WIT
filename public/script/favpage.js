
let testData = ["","","","","",""];
let testTitle = ["title1","title2","title3","title4","title5","title6"];
let testDesc = ["desc1","desc2","desc3","desc4","desc5","desc6"];
//testData = [];

let tableArea = document.getElementById('favtable');
displayFav();

function displayFav(){
  output = tableArea.innerHTML;
  for (let i = 0; i<testData.length; i++){
    // output += `<tr><td>`+testTitle[i]+`</td><td><video width="520" height="390" controls>
    //           <source src=`+testData[i]+`</src></video></td><td>`+testDesc[i]+`</td></tr>`;
    output += `<tr><td>`+testTitle[i]+`<br><video width="520" height="390" controls>
              <source src=`+testData[i]+`</src></video><br>`+testDesc[i]+`</td></tr>`;
  }
  tableArea.innerHTML = output;
}
function getVideo(){

  // const preObject = document.getElementById('object');
  // const p1 = document.getElementById('p1');
  // const p2 = document.getElementById('p2');
  // const p3 = document.getElementById('p3');
  const dbRefObject = firebase.database().ref().child('users');
  var list = "";

  //dbRefObject.on('value', snap => console.log(snap.val()));

  dbRefObject.once('value', (data) => {
    list = data.val()
    // console.log(list);
    // console.log(list['+60172121893'])
    // console.log(list['+60172121893'])
    // console.log(list['+60172121893']['videoFavourite'])
    // console.log(list['+60172121893']['videoFavourite'].length)
    // p1.innerHTML = list['+60172121893']['videoFavourite'].length
    // p2.innerHTML = list['+60172121893']['videoFavourite']

  });
  //console.log(list);
}
