import {x,phy,chem,maths,bio} from '../javascript/unreviewedCount.js';

const emailBody = `<h3>Please find the dashboard details below</h3>
  <hr />
  <span><strong><mark>${x} question yet to be reviewed</mark><br/><br/>
  <span><strong>Physics: ${phy}<br/>
  <span><strong>Chemistry: ${chem} <br/>
  <span><strong>Mathematics: ${maths}<br/>
  <span><strong>Biology: ${bio}<br/><br/>
  <form action="http://localhost:3000/teacherLogin.html">
    <input type="submit" value="Review it now??" style="background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 11px 28px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;"/>
  </form><br/><br/>
  <span><strong><u><i>This email is send to you because you are the expert assigned by CBSE</i></u><br/><br/>
  <span>Thank you,</span><br />
  <span>CrowdQuest Team</span>`;
// if(x>0){
//   Email.send({
//     Host : "smtp.elasticemail.com",
//     Username : "sihcbse@proton.me",
//     Password : "C2A910A4F5B5D86449ABE02A8D824CD843E0",
//     To : 'sihcbse@proton.me',
//     From : "sihcbse@proton.me",
//     Subject : "Test email",
//     Body : emailBody,
//   }).then(
//     message => alert(message)
//   );
// }

// document.getElementById("count").innerHTML=x;



var data = JSON.stringify({
  "from": {
    "email": "divijkatyal@pepisandbox.com",
    "name": "Dashboard Update⚠️"
  },
  "subject": "New questions yet to be reviewed on the dashboard",
  "content": [
   {
      "type": "html",
      "value": emailBody
    }
  ],
   "personalizations": [
   {
      "to": [
        {
          "email": "divij.katyal2020@gmail.com",
          "name": "Divij Katyal"
      }
      ]
    }
   ]
  });
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
   if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
  });
  xhr.open("POST", "https://emailapi.netcorecloud.net/v5/mail/send");
  xhr.setRequestHeader("api_key", "af2155e22497691c4ea1a66af6bc86f4");
  xhr.setRequestHeader("content-type", "application/json");
  // xhr.setRequestHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
  // xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
  // xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  // xhr.setRequestHeader("Access-Control-Allow-Headers", '*');
  xhr.send(data);