App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
      }
    });
    return App.initContract();
  },
  initContract: function () {
    $.getJSON("CrowdSource.json", function (cq) {
      App.contracts.CrowdSource = TruffleContract(cq);
      App.contracts.CrowdSource.setProvider(App.web3Provider);
      App.getAllQuestionsFromChain();
      // App.listenForEvents();

      // return App.render();
    });
  },

  listenForEvents: function () {
    App.contracts.CrowdSource.deployed().then(function (instance) {
      instance
        .SubmitQuestion(
          {},
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        )
        .watch(function (error, event) {
          console.log("event triggered", event);
          App.render();
        });
    });
  },

  addQuestion: function () {
    console.log("here");
    let submitDOM = document.querySelector(".submit");
    // console.log(submitDOM);
    const Problem = {
      subject: "",
      topic: "testTopic",
      question: "",
      options: "",
      ans: 0,
      approve: false,
      isApproved: false,
    };

    // console.log(Problem);
    submitDOM.addEventListener("click", function (event) {
      event.preventDefault();
      subject();
      question();
      correctOption();
      options();
      console.log(Problem);
      App.contracts.CrowdSource.deployed()
        .then(function (instance) {
          console.log("test");
          const result = instance.addToBlockchain(
            Problem.subject,
            Problem.topic,
            Problem.question,
            Problem.options,
            "IPFS Image hash",
            Problem.ans,
            false,
            false,
            { from: App.account }
          );
          console.log("result", result);
          return result;
        })
        .then(function (result) {
          bootoast({
            message: "Question added successfully",
            type: "success",
            position: "bottom-center",
            icon: null,
            timeout: null,
            animationDuration: 300,
            dismissible: true,
          });
          // window.alert("Question added successfully");
          if (
            window.history.state.prevUrl ==
            "http://localhost:3000/teacherDashboard.html"
          ) {
            window.location = "http://localhost:3000/teacherDashboard.html";
          } else {
            window.location = "http://localhost:3000/studentDashboard.html";
          }
          console.log("result after alert", result);
          // Wait for votes to update
          // $("#content").hide();
          // $("#loader").show();
        })
        .catch(function (err) {
          bootoast({
            message: "Unexpected error occured!!",
            type: "danger",
            position: "bottom-center",
            icon: null,
            timeout: null,
            animationDuration: 300,
            dismissible: true,
          });
          console.error(err);
        });
    });

    // //For subject
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
        Problem.ans = 1;
        return;
      } else if (correctOption2.checked == true) {
        Problem.ans = 2;
        return;
      } else if (correctOption3.checked == true) {
        Problem.ans = 3;
        return;
      } else if (correctOption4.checked == true) {
        Problem.ans = 4;
        return;
      }
    };

    //For Options
    const options = () => {
      let option1 = document.querySelector("#option1");
      let option2 = document.querySelector("#option2");
      let option3 = document.querySelector("#option3");
      let option4 = document.querySelector("#option4");
      Problem.options = option1.value;
      Problem.options += "$" + option2.value;
      Problem.options += "$" + option3.value;
      Problem.options += "$" + option4.value;
    };
    // console.log(result);
    // window.alert("Question added successfully");
  },

  getAllQuestionsFromChain: function () {
    let problemCard1 = document.querySelector(".teacherDashboard");
    let problemCard2 = document.querySelector(".studentDashboard");

    console.log("here");
    // console.log(App.contracts.CrowdSource);
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        console.log("here1");
        return crowdsourceInstance.problemCount();
      })

      .then(function (problemCount) {
        let quesData1 = "";
        let quesData2 = "";
        var count = 0;
        var displayProblemCount = 0;
        var displayProblemCount1 = 0;
        for (var i = 1; i <= problemCount; i++) {
          crowdsourceInstance.problems(i).then(function (p) {
            console.log(p);
            let subject = p[0];
            let topic = p[1];
            let question = p[2];
            let options = App.getOptions(p[3]);
            let imgHash = p[4];
            let ans = p[5].toNumber();
            let approve = p[6];
            let isApprove = p[7];
            let correctAnswer = p[ans + 1];
            count++;
            crowdsourceInstance.getCountOfTopic(topic).then(function (tc) {
              console.log("Number of question of topic " + topic +  " " +tc.toNumber());
            });
            if (approve == false && isApprove == false) {
              displayProblemCount++;
              let ques = `<div class="container questionCard">
          <div class="unitQuestion">
              <div class="stud_question">
                <div class="subject">
                   Subject : ${subject}
                </div>
                  <div class="question">
                    Ques ${displayProblemCount}.  ${question}
                  </div>
                  <div class="options">
                      <button class="option">
                          <div class="option_text">A.</div>
                          &nbsp;
                          <div class="option_text">
                            ${options[0]}
                          </div>
                      </button>
                      <button class="option">
                          <div class="option_text">B.</div>
                          &nbsp;
                          <div class="option_text">
                          ${options[1]}
                          </div>
                      </button>
                      <button class="option">
                          <div class="option_text">C.</div>
                          &nbsp;
                          <div class="option_text">
                          ${options[2]}
                          </div>
                      </button>
                      <button class="option">
                          <div class="option_text">D.</div>
                          &nbsp;
                          <div class="option_text">
                          ${options[3]}
                          </div>
                      </button>
                  </div>
              </div>
          </div>
          <div class="question-info">
              <div class="question-standard">Correct Answer : ${
                options[ans - 1]
              }</div>
              <button onClick="App.questionAccept(${count})" type="button" class="btn btn-outline-success approve-btn">Accept</button>
              <button onClick="App.questionReject(${count})" type="button" class="btn btn-outline-danger approve-btn">Reject</button>
          </div>
      </div>`;
              quesData1 += ques;
              problemCard1.innerHTML = quesData1;
            } else if (approve == true && isApprove == true) {
              displayProblemCount1++;
              let ques = `<div class="container questionCard">
              <div class="unitQuestion">
                  <div class="stud_question">
                      <div class="subject">
                          Subject : ${subject}
                      </div>
                      <div class="question">
                      Ques ${displayProblemCount1}.  ${question}
                      </div>
                      <div class="options">
                          <button class="option">
                              <div class="option_text">A</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[0]}
                              </div>
                          </button>
                          <button class="option">
                              <div class="option_text">B</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[1]}
                              </div>
                          </button>
                          <button class="option">
                              <div class="option_text">C</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[2]}
                              </div>
                          </button>
                          <button class="option">
                              <div class="option_text">D</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[3]}
                              </div>
                          </button>
                      </div>
                  </div>
                  <div class="question-info">
                      <div class="question-standard">Correct Answer : ${
                        options[ans - 1]
                      }
                      </div>
                  </div>
              </div>
          </div>`;
              quesData2 += ques;
              problemCard2.innerHTML = quesData2;
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  getAllSub: function (subject) {
    let problemCard = document.querySelector(".studentDashboard");

    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        return crowdsourceInstance.problemCount();
      })

      .then(function (problemCount) {
        let quesData = "";

        var displayProblemCount1 = 0;
        for (var i = 1; i <= problemCount; i++) {
          crowdsourceInstance.problems(i).then(function (p) {
            console.log(p);
            let currSubject = p[0];
            let topic = p[1];
            let question = p[2];
            let options = App.getOptions(p[3]);
            let imgHash = p[4];
            let ans = p[5].toNumber();
            let approve = p[6];
            let isApprove = p[7];
            if (
              approve == true &&
              isApprove == true &&
              currSubject == subject
            ) {
              displayProblemCount1++;
              let ques = `<div class="container questionCard">
              <div class="unitQuestion">
                  <div class="stud_question">
                      <div class="subject">
                          Subject : ${subject}
                      </div>
                      <div class="question">
                      Ques ${displayProblemCount1}.  ${question}
                      </div>
                      <div class="options">
                          <button class="option">
                              <div class="option_text">A</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[0]}
                              </div>
                          </button>
                          <button class="option">
                              <div class="option_text">B</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[1]}
                              </div>
                          </button>
                          <button class="option">
                              <div class="option_text">C</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[2]}
                              </div>
                          </button>
                          <button class="option">
                              <div class="option_text">D</div>
                              &nbsp;
                              <div class="option_text">
                              ${options[3]}
                              </div>
                          </button>
                      </div>
                  </div>
                  <div class="question-info">
                      <div class="question-standard">Correct Answer : ${
                        options[ans - 1]
                      } 
                      </div>
                  </div>
              </div>
          </div>`;
              quesData += ques;
              problemCard.innerHTML = quesData;
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  generateQuestions: function () {
    // let problemCard = document.querySelector("#Main");
    // var date = document.querySelector(".date").value;
    // var sub = document.querySelector(".subject").value;
    // var numOfQues =parseInt(document.querySelector(".questionCount").value);
    // console.log(date);
    // console.log(sub);
    // console.log(numOfQues);
    // document.querySelector(".date").value = "";
    // document.querySelector(".subject").value = "";
    // document.querySelector(".questionCount").value = "";
    // App.contracts.CrowdSource.deployed()
    //   .then(function (instance) {
    //     crowdsourceInstance = instance;
    //     return crowdsourceInstance.problemCount();
    //   })
    //   .then(function (problemCount) {
    //     let quesData = `<center>
    //     <p contenteditable="true" id="date">Date: ${date}</p>
    //     <img
    //     id="cbse-logo"
    //     src="https://www.deccanherald.com/sites/dh/files/articleimages/2021/04/13/file6yjgpmr0fvkucdewa6a-973637-1618257667.jpg"
    //     alt=""
    //     />
    //     <h4>Central Board of Secondary Education</h4>
    //     </center>
    //     <div class="container h-50 my-5" data-aos="fade-right">
    //     <p id="note" contenteditable="true">
    //       Note: Each question consists of 3 marks. All questions are compulsory.
    //       Lorem Ipsum has been the industry's standard dummy text ever since the
    //       1500s, when an unknown printer took a galley of type and scrambled it
    //       to make a type specimen book.
    //     </p></div>`;
    //     var displayProblemCount = 0;
    //     for (var i = 1; i <= problemCount; i++) {
    //       crowdsourceInstance.problems(i).then(function (p) {
    //         console.log(p);
    //         let subject = p[0];
    //         let topic = p[1];
    //         let question = p[2];
    //         let options = App.getOptions(p[3]);
    //         let imgHash = p[4];
    //         let ans = p[5].toNumber();
    //         let approve = p[6];
    //         let isApprove = p[7];
    //         if (approve == true && isApprove == true && subject==sub) {
    //           displayProblemCount++;
    //           let ques = `
    //           <div class="card">
    //             <div style="background-color: rgb(221, 221, 221)" class="card-header">
    //               <p class="ques">
    //                 Ques${displayProblemCount}. ${question} :
    //               </p>
    //             </div>
    //             <div class="card-body">
    //               <table>
    //                 <tr>
    //                   <td>A. ${options[0]}</td>
    //                   <td>B. ${options[1]}</td>
    //                 </tr>
    //                 <tr>
    //                   <td class="right-opt">C. ${options[2]}</td>
    //                   <td class="right-opt">D. ${options[3]}</td>
    //                 </tr>
    //               </table>
    //             </div>
    //           </div>
    //         <br>`;
    //           quesData += ques;
    //           problemCard.innerHTML = quesData + `	<button type="button" class="btn btn-primary">Download</button>`;
    //         }
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },
  questionAccept: function (index) {
    console.log("Accept");
    console.log("index", index);
    App.init();
    console.log(App.contracts.CrowdSource);
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        crowdsourceInstance
          .problems(index)
          .then(function (p) {
            const accept = crowdsourceInstance.questionAcceptReject(
              index, //_problemCount
              p[0], //_subject
              p[1], //_topic
              p[2], //_question
              p[3], //_options
              p[4], //_imgHash
              p[5], //_ans
              true,
              true,
              { from: App.account }
            );
            return accept;
          })
          .then(function (accept) {
            bootoast({
              message: "Question accepted successfully",
              type: "success",
              position: "bottom-center",
              icon: null,
              timeout: null,
              animationDuration: 300,
              dismissible: true,
            });
            // window.alert("Question accepted successfully");
            console.log("Rejected promise ", accept);
            window.location = "http://localhost:3000/teacherDashboard.html";
          });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  questionReject: function (index) {
    console.log("Rejected");
    console.log("index", index);
    App.init();
    console.log(App.contracts.CrowdSource);
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        crowdsourceInstance
          .problems(index)
          .then(function (p) {
            const rejected = crowdsourceInstance.questionAcceptReject(
              index,
              p[0],
              p[1],
              p[2],
              p[3],
              p[4],
              p[5],
              false,
              true,
              { from: App.account }
            );
            return rejected;
          })
          .then(function (rejected) {
            bootoast({
              message: "Question rejected successfully",
              type: "danger",
              position: "bottom-center",
              icon: null,
              timeout: null,
              animationDuration: 300,
              dismissible: true,
            });
            // window.alert("Question rejected successfully");
            console.log("Rejected promise ", rejected);
            window.location = "http://localhost:3000/teacherDashboard.html";
          });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  getOptions: function (options) {
    let optArr = [];
    let currOpt = "";
    for (let i = 0; i < options.length; ++i) {
      if (options[i] == "$") {
        optArr.push(currOpt);
        currOpt = "";
        continue;
      }
      currOpt += options[i];
    }
    optArr.push(currOpt);
    return optArr;
  },
};

$(function () {
  $(window).load(function () {
    App.init();
    App.addQuestion();
    App.getAllQuestionsFromChain();
    App.getAllSub();
    App.generateQuestions();
  });
});
