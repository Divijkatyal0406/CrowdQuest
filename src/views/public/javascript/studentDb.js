document.querySelector(".sub1").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub2").classList.remove("active");
    document.querySelector(".sub3").classList.remove("active");
    document.querySelector(".sub4").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});

document.querySelector(".sub2").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub1").classList.remove("active");
    document.querySelector(".sub3").classList.remove("active");
    document.querySelector(".sub4").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});

document.querySelector(".sub3").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub2").classList.remove("active");
    document.querySelector(".sub1").classList.remove("active");
    document.querySelector(".sub4").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});

document.querySelector(".sub4").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub2").classList.remove("active");
    document.querySelector(".sub3").classList.remove("active");
    document.querySelector(".sub1").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});

document.querySelector(".allQues").addEventListener("click", function(){
    document.querySelector(".dashboard-btn").classList.add("active");
    document.querySelector(".sub2").classList.remove("active");
    document.querySelector(".sub3").classList.remove("active");
    document.querySelector(".sub1").classList.remove("active");
    document.querySelector(".sub4").classList.remove("active");
});


// Read question
function readQuest(cl){

    var x = cl.toString();
    var name = "p"+x;
    var ques = document.getElementsByClassName(name);
    var message = (ques[0]).innerHTML; 


    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

    speech.text = message;

    // Start Speaking
    window.speechSynthesis.speak(speech);

    //window.speechSynthesis.cancel();
}

//translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }

  const languageChanger = () => {
      var language = document.getElementById("google_translate_element").value;
      
      var selectField = document.querySelector("#google_translate_element select");
      for(var i=0; i<selectField.children.length; i++){
          var option = selectField.children[i];
          if(option.value == language) {
              selectField.selectedIndex = i;
              selectField.dispatchEvent(new Event('change'));
          }
      }
  }