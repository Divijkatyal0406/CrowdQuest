// import {AuthValidation} from '../../src/login-signup-web3/utils/AuthValidation';
// const Moralis = require("moralis/node");

App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  //Added this 3 Aug 2022
  web3: null,

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
      //Added this 3 Aug 2022
      App.web3 = web3;
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

    //Loading authentication contract
    $.getJSON("Authentication.json", function (cq) {
      App.contracts.Authentication = TruffleContract(cq);
      App.contracts.Authentication.setProvider(App.web3Provider);
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
    console.log("here1");
    let submitDOM = document.querySelector(".submit");
    let url = document.querySelector("#imageUrlText").innerHTML.toString();
    console.log(url);

    // console.log(submitDOM);
    const Problem = {
      subject: "",
      topic: "",
      question: "",
      options: "",
      imgUrl:url,
      ans: 0,
      approve: false,
      isApproved: false,
    };

    // console.log(Problem);
    submitDOM.addEventListener("click", function (event) {
      event.preventDefault();
      subject();
      chapter();
      question();
      correctOption();
      options();
      // imgUrl();


      console.log(Problem);
      App.contracts.CrowdSource.deployed()
        .then(function (instance) {
          console.log("test");
          console.log("hh");
          console.log(url);
          const result = instance.addToBlockchain(
            Problem.subject,
            Problem.topic,
            Problem.question,
            Problem.options,
            Problem.imgUrl,
            Problem.ans,
            false,
            false,
            { from: App.account }
          );
          console.log("result", result);
          return result;
        })
        .then(function (result) {
          // bootoast({
          //   message: "Question added successfully",
          //   type: "success",
          //   position: "bottom-center",
          //   icon: null,
          //   timeout: null,
          //   animationDuration: 300,
          //   dismissible: true,
          // });
          window.alert("Question added successfully");
          window.location="http://localhost:3000/addQuestion.html";
          // if (
          //   window.history.state.prevUrl ==
          //   "http://localhost:3000/teacherDashboard.html"
          // ) {
          //   window.location = "http://localhost:3000/teacherDashboard.html";
          // } else {
          //   window.location = "http://localhost:3000/studentDashboard.html";
          // }
          console.log("result after alert", result);
          // Wait for votes to update
          // $("#content").hide();
          // $("#loader").show();
        })
        .catch(function (err) {
          // bootoast({
          //   message: "Unexpected error occured!!",
          //   type: "danger",
          //   position: "bottom-center",
          //   icon: null,
          //   timeout: null,
          //   animationDuration: 300,
          //   dismissible: true,
          // });
          console.error(err);
        });
    });

    //For subject
    const subject = () => {
      Problem.imgUrl=document.querySelector("#imageUrlText").innerHTML.toString();
      let subjectsDOM = document.querySelector("#subjects");
      let selectedSubject = subjectsDOM.options[subjectsDOM.selectedIndex].text;
      Problem.subject = selectedSubject;
    };

    const chapter = () => {
      let topicDOM = document.querySelector("#topic");
      let selectedTopic = topicDOM.options[topicDOM.selectedIndex].text;
      Problem.topic = selectedTopic;
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

    const imgUrl = () => {
      let url = document.querySelector("#imageUrlText");
      let imgurl = url.value;
      if(imgurl=="IPFS url"){
        console.log("i am here");
        Problem.imgUrl = "$";  
      }
      else{
        Problem.imgUrl = imgurl;
      }
    };

    // console.log(result);
    // window.alert("Question added successfully");
  },

  getAllQuestionsFromChain: function () {
    let problemCard1 = document.querySelector(".teacherDashboard");
    let problemCard2 = document.querySelector(".studentDashboard");

    console.log("here2");
    // console.log(App.contracts.CrowdSource);
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        console.log("here12");
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
            // crowdsourceInstance.getCountOfTopic(topic).then(function (tc) {
            //   console.log(
            //     "Number of question of topic " + topic + " " + tc.toNumber()
            //   );
            // });
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
  showGraph: function (subject) {
    // let graphBtn = document.querySelector("#graphBtn");
    App.contracts.CrowdSource.deployed().then(function (instance) {
      console.log(subject);
      crowdsourceInstance = instance;
      import("./public/javascript/subjectTopics.js")
        .then((_topics) => {
          var topics = _topics.default;
          var subjects = topics;
          return subjects[`${subject}`];
        })
        .then(function (topics) {
          var size = topics.length;
          // console.log(topics);
          // console.log(size);
          let xCord = topics,
            yCord = new Array(size);
          for (let idx = 0; idx < size; ++idx) {
            crowdsourceInstance
              .getCountOfTopic(xCord[idx])
              .then(function (count) {
                // console.log(count.toNumber());
                yCord[idx] = count.toNumber();
              });
          }
          myChart = null;
          if (myChart != null) {
            myChart.destroy();
          }
          return { xCord, yCord, subject, myChart };
        })
        .then(function ({ xCord, yCord, subject, myChart }) {
          console.log("xCord", xCord);
          console.log("yCord", yCord);
          const ctx = document.getElementById(`${subject}`).getContext("2d");
          myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: xCord,
              datasets: [
                {
                  label: "Total verified questions",
                  data: yCord,
                  backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                  borderColor: ["rgba(255, 159, 64, 1)"],
                  borderWidth: 4,
                },
              ],
            },
            options: {
              Elements: {
                point: {
                  radius: 0,
                },
              },

              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }).catch((error)=>{
          console.log(error);
        });
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

  //LOGIN-SIGNUP-STARTS

  loginDashboard: function () {
    let username_dom = document.querySelector("#username");
    let userText = username_dom.value;

    let password_dom = document.querySelector("#password");
    let passwordText = password_dom.value;

    let passcode_dom = document.querySelector("#passcode");
    let passcodeText = passcode_dom.value;

    App.contracts.Authentication.deployed()
      .then(function (instance) {
        let validated = await;
        AuthValidation(
          userText,
          App.account,
          passwordText,
          passcodeText,
          App.web3,
          instance
        );
        if (validated) {
          //login hogaya
        } else {
          // invalid login
        }
      })
      .then(function (result) {})
      .catch(function (err) {
        console.error(err);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
    App.addQuestion();
    App.getAllQuestionsFromChain();
    App.getAllSub();
  });
});
