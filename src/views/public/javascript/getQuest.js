$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

function viewModal(arg) {
  if(arg == 'topics'){
    var sub = document.querySelector(".subject").value;
    document.querySelector(
      ".modal-title"
    ).innerText = `Select topics to be included : (${sub})`;
    createModal(sub);
  }else{
    let modalCard = document.querySelector(".modal-body");
    modalCard.innerHTML = `  
    <p>Sum of the inputs should be equal to total questions (preffered) else system will randomly assign questions of any difficulty.              
    <br><br>
    <label for="">Easy question count: </label>
    <input class="diff" type="number">
    
    <label for="">Medium question count: </label>
    <input class="diff" type="number">

    <label for="">Hard question count: </label>
    <input class="diff" type="number">`

    document.querySelector(".modal-footer").innerHTML = `<button
    type="button"
    class="btn btn-primary"
    data-dismiss="modal"
    onclick = "idgaf(); return false;"
  >
    Save changes 
  </button>`
  }
}

var easyQuestions;
var mediumQuestions;
var hardQuestions;

function idgaf(){
  console.log("inside func");
  var x = document.querySelectorAll(".diff");

  easyQuestions = parseInt(x[0].value) ; 
  mediumQuestions = parseInt(x[1].value) ; 
  hardQuestions = parseInt(x[2].value) ; 

  console.log(easyQuestions);
  console.log(mediumQuestions);
  console.log(hardQuestions);
}

function createModal(subject) {
  if (subject == "Mathematics") {
    var optionArray = [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Application of Derivatives",
      "Integrals",
      "Application of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three Dimensional Geometry",
      "Linear Programming",
      "Probability",
    ];
  } else if (subject == "Physics") {
    var optionArray = [
      "Electric Charges and Fields",
      "Electrostatic Potential and Capacitance",
      "Current Electricity",
      "Moving Charges and Magnetism",
      "Magnetism and Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics and Optical Instruments",
      "Wave Optics",
      "Dual Nature of Radiation and Matter",
      "Atoms",
      "Nuclei",
      "Semiconductor Electronics",
    ];
  } else if (subject == "Chemistry") {
    var optionArray = [
      "The Solid State",
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "Surface Chemistry",
      "General Principles and Processes of Isolation of Elements",
      "The p-Block Elements",
      "The d- and f- Block Elements",
      "Coordination Compounds",
      "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones and Carboxylic Acids",
      "Amines",
      "Biomolecules",
      "Polymers",
      "Chemistry in Everyday Life",
    ];
  } else {
    var optionArray = [
      "Reproduction in Organisms",
      "Sexual Reproduction in Flowering Plants",
      "Human Reproduction",
      "Reproductive Health",
      "Principle of Inheritance and Variation",
      "Molecular Basis of Inheritance",
      "Evolution",
      "Human Health and Diseases",
      "Strategies for Enhancement in Food Production",
      "Microbes in Human Welfare",
      "Biotechnology: Principles and Processes",
      "Biotechnology and its Applications",
      "Organisms and Populations",
      "Ecosystem",
      "Biodiversity and Conservation",
      "Environmental Issues",
    ];
  }
  let modalCard = document.querySelector(".modal-body");
  let optionData = "";
  for (var i = 0; i < optionArray.length; i++) {
    let option = `<div class="pretty p-icon p-round p-smooth">
        <input class="excluded-topics" value="${i}" type="checkbox" />
        <div class="state p-success">
          <i class="icon mdi mdi-check" aria-hidden="true"></i>
          <label>${optionArray[i]}</label>
        </div>
      </div><br>`;
    optionData += option;
    modalCard.innerHTML = optionData;
  }
  document.querySelector(".modal-footer").innerHTML = `<button
  type="button"
  class="btn btn-primary"
  data-dismiss="modal"
>
  Save Changes
</button>`
}

document.querySelector("#download").style.visibility = "hidden";

// set max and min of the inputs:

var remainingQuestions;

function setWeightage() {
  var total_question =  document.querySelector(".questionCount").value;
  var subject = document.querySelector(".subject").value;

  //Get checkbox inputs
  var excludedTopics = [];
  var checkboxes = document.querySelectorAll(".excluded-topics");
  for (var checkbox of checkboxes) {
    if (checkbox.checked == true) {
      excludedTopics.push(checkbox.value);
    } else {
      excludedTopics.push(-1);
    }
  }

   var chapterCount = 0;
   for(var i of excludedTopics){
    if(i == -1){
    chapterCount++;
    }
   }

  var max_weightage = Math.floor(total_question / chapterCount);

 
  if(max_weightage == 0){
    swal(
        `Invalid Input: ${total_question}`,
        "Chapters to be included is greater than total number of questions.",
        "error"
      );
  }

  var weightage_input = document.querySelector(".weightage").value;

  if (weightage_input > max_weightage) {
    swal(
      "Question Statistics:",
      `
    Total number of questions: ${total_question}

    Number of questions from each chapter should be less than or equal to ${max_weightage}.
    
    System will automatically generate remaining questions if any: (${total_question - (max_weightage * chapterCount)} question)`,
      "warning"
    );


    
    
    document.querySelector(".weightage").value = max_weightage;
  }else if(weightage_input <= max_weightage && weightage_input >= 1){
    swal(
      "Question Statistics:",
      `
      Total number of questions: ${total_question}
      
      Number of questions from each chapter should be less than or equal to ${max_weightage}.
      
      System will automatically generate remaining questions if any: (${total_question - (weightage_input * chapterCount)} question)`,
      "success"
      );
    }

    remainingQuestions = total_question - (max_weightage * chapterCount);
}


// translate
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