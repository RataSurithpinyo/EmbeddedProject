 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"; 

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyA-L6Ux5y1wRgTQeGZR0rmkurYtw1GLQO8",
   authDomain: "esp-firebase-demo-b70bb.firebaseapp.com",
   databaseURL: "https://esp-firebase-demo-b70bb-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "esp-firebase-demo-b70bb",
   storageBucket: "esp-firebase-demo-b70bb.appspot.com",
   messagingSenderId: "983701602250",
   appId: "1:983701602250:web:3ce7a73e4500cb11d3d933"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);

 //==============distance====================
const distref = ref(db,'test/Dist');
var distance;
onValue(distref, (snapshot) => {
  distance = snapshot.val();
  updateWater(distance);
});

function tempAlert(msg,duration){
    var el = document.createElement("div");
    el.setAttribute("style","position:flex;margin-top:18px;margin-left:400px; color:'black'");
    el.innerHTML = msg;
    setTimeout(function(){
      el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}

/*function showDis(d){
  if (d < 2000){
    //tempAlert("WARNING",50000);
  } else {}
}*/

 //==============brightness====================
const lightref = ref(db,'test/Light');
var brightness;
onValue(lightref, (snapshot) => {
  brightness = snapshot.val();
  document.getElementById("light").innerHTML = "LDR : " + brightness;
  showDay(brightness);
  console.log("light : " + brightness);
});

function showDay(light){
    if (light < 0) return;
    if (light >= 2500){
      document.body.style.backgroundColor = "#F9FFEA";
      document.getElementById('head').style.color = "#000000";
      document.getElementById('name').style.color = "#000000";
      document.getElementById('daypic').src="./pics/sun.png";
      //=============day===============
      document.getElementById('day').style.backgroundColor = '#FFECDA';
      document.getElementById('day').style.borderColor = '#D4A5A5';
      document.getElementById('day').style.boxShadow = "0px 5px 15px 0px gray";
      //=============water=============
      document.getElementById('water').style.backgroundColor = '#FFECDA';
      document.getElementById('water').style.borderColor = '#D4A5A5';
      document.getElementById('water').style.boxShadow = "0px 5px 15px 0px gray";
    }
    if (light < 1300) { //night
      document.body.style.backgroundColor = "#141E27";
      document.getElementById('head').style.color = "#EEEDDE";
      document.getElementById('name').style.color = "#EEEDDE";
      document.getElementById('daypic').src="./pics/moon.png";
      document.getElementById('daypic').style.width="110px";
      //=============day=============
      document.getElementById('day').style.backgroundColor = '#F1EEE9';
      document.getElementById('day').style.borderColor = '#73777B';
      document.getElementById('day').style.boxShadow = "0px 5px 15px 0px #F1EEE9";
      //=============water=============
      document.getElementById('water').style.backgroundColor = '#F1EEE9';
      document.getElementById('water').style.borderColor = '#73777B';
      document.getElementById('water').style.boxShadow = "0px 5px 15px 0px #F1EEE9";

    }
}

var blink = false;
var blink_speed = 500; // every 1000 == 1 second, adjust to suit
var t = setInterval(function () {
  var ele = document.getElementById('distance');  
  if (blink) {
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
    document.getElementById('water').style.backgroundColor = '#F24A72';
    document.getElementById('water').style.borderColor = '#B22727';
      //document.getElementById("distance").color = '#EAEA7F';
  } else {
    ele.style.visibility = '';
  }

}, blink_speed);

const threshold = 15;
function setWater(dist) {
    const distance = dist/10; //to cm
    var depth = 60 - distance;
    if (distance > 60) depth = 0;
    console.log(depth);
    document.getElementById('water').style.backgroundColor = '#FFECDA';
    document.getElementById('water').style.borderColor = '#D4A5A5';
    document.getElementById("distance").color = '#EAEA7F';
    document.getElementById("distance").innerHTML = depth.toFixed(1) + " cm";
    document.getElementById("wave").style.top = dist + "px";

    if (distance <= threshold) {
      //document.getElementById('water').style.backgroundColor = '#F24A72';
      //document.getElementById('water').style.borderColor = '#B22727';
      //document.getElementById("distance").color = '#EAEA7F';
      blink = true;
    }
    if (distance > threshold + 5) blink = false;
}
  
var rising = true;
var current = 10000;

function updateWater(dist) {
  console.log("distance : " + distance);
  if (rising ^ (dist < current)) {
    rising = !rising;
  } else {
    setWater(dist);
    current = dist;
  }
}

/*async function testcase() {
  console.log('this works');
}
window.testcase = testcase;
*/
//showDay(brightness);

 