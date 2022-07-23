const Problem = {
  subject: "",
  question: "",
  options: [],
  ans: undefined,
};

let submitDOM = document.querySelector(".submit");

console.log(Problem);
submitDOM.addEventListener("click", function (event) {
  event.preventDefault();
  subject();
  question();
  correctOption();
  options();
  console.log(Problem);
});

// string subject,
// string question,
// string[] options,
// string imgHash,
// uint256 ans,
// bool approve

//For subject
const subject = () => {
  let subjectsDOM = document.querySelector("#subjects");
  let selectedSubject = subjectsDOM.options[subjectsDOM.selectedIndex].text;
  Problem.subject = selectedSubject;
};

//For question
const question = () => {
  let questionDOM = document.querySelector(".addQuestionText");
  let questionText = questionDOM.value;
  Problem.question = questionText;
};

//For Correct Option
const correctOption = () => {
  let correctOption1 = document.querySelector(".correctOption1");
  let correctOption2 = document.querySelector(".correctOption2");
  let correctOption3 = document.querySelector(".correctOption3");
  let correctOption4 = document.querySelector(".correctOption4");
  if (correctOption1.checked == true) {
    Problem.ans = 0;
    return;
  } else if (correctOption2.checked == true) {
    Problem.ans = 1;
    return;
  } else if (correctOption3.checked == true) {
    Problem.ans = 2;
    return;
  } else if (correctOption4.checked == true) {
    Problem.ans = 3;
    return;
  }
};

//For Options
const options = () => {
  let option1 = document.querySelector("#option1");
  let option2 = document.querySelector("#option2");
  let option3 = document.querySelector("#option3");
  let option4 = document.querySelector("#option4");
  Problem.options.push(option1.value);
  Problem.options.push(option2.value);
  Problem.options.push(option3.value);
  Problem.options.push(option4.value);
};
