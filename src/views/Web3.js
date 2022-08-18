// import {AuthValidation} from '../../src/login-signup-web3/utils/AuthValidation';
// const Moralis = require("moralis/node");

App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  //Added this 3 Aug 2022
  web3: null,
  x: [],

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
      // App.getAllContributions();
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

  addQuestion: function (addForFirstTime) {
    console.log("here1");
    console.log(addForFirstTime);
    let submitDOM = document.querySelector(".submit");
    let url = document.querySelector("#imageUrlText").innerHTML.toString();
    console.log(url);

    // console.log(submitDOM);
    const Problem = {
      subject: "",
      topic: "",
      question: "",
      options: "",
      imgUrl: url,
      ans: 0,
      approve: false,
      isApproved: false,
    };

    // console.log(Problem);
    const subject = () => {
      Problem.imgUrl = document
        .querySelector("#imageUrlText")
        .innerHTML.toString();
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
    if (addForFirstTime) {
      const imgUrl = () => {
        let url = document.querySelector("#imageUrlText");
        let imgurl = url.value;
        if (imgurl == "IPFS url") {
          console.log("i am here");
          Problem.imgUrl = "$";
        } else {
          Problem.imgUrl = imgurl;
        }
      };
    }
    subject();
    chapter();
    question();
    if (addForFirstTime) {
      correctOption();
    }
    options();
    // submitDOM.addEventListener("click", function (event) {
    console.log("bye");
    // event.preventDefault();
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
        // window.alert("Question added successfully");
        swal("","Question added successfully","success");
        window.location = "http://localhost:3000/addQuestion.html";
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

    //For subject

    // console.log(result);
    // window.alert("Question added successfully");
  },

  validateQuestion: function () {
    var inputQues = document.querySelector(".addQuestionText").value;
    document.querySelector(".addQuestionText").style.borderColor = "grey";
    inputQues = inputQues.toLowerCase();

    const arr1 = remove_stopwords(inputQues).split(" ");

    var similarityLimit = Math.floor(arr1.length * 0.8);

    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        return crowdsourceInstance.problemCount();
      })
      .then(function (problemCount) {
        loop1: for (var i = 1; i <= problemCount; i++) {
          crowdsourceInstance.problems(i).then(function (p) {
            console.log(p);
            var ques = p[2];
            ques = ques.toLowerCase();
            const arr2 = remove_stopwords(ques).split(" ");

            var count = 0;
            loop2: for (
              var j = 0;
              j < Math.min(arr1.length, arr2.length);
              j++
            ) {
              if (arr1[j] == arr2[j]) {
                count++;
                console.log("Count", count);
                console.log("Similarity", similarityLimit);
              }
              if (count >= similarityLimit && count != 0) {
                document.querySelector(".addQuestionText").style.borderColor =
                  "red";
    
                swal("", "Similar type of question Already exists!!", "error");
                break loop2;
              }
            }
          });
        }
      });
  },

  downloadQuestions: function () {
    let problemCard = document.querySelector(".question-area");

    var optionArrayMaths = [
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
    var mathsVisited = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var optionArrayPhy = [
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
    var phyVisited = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var optionArrayChem = [
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
    var chemVisited = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var optionArrayBio = [
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
    var bioVisited = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

    var date = document.querySelector(".date").value;
    var subject = document.querySelector(".subject").value;
    var totalQues = document.querySelector(".questionCount").value;
    var weightage = document.querySelector(".weightage").value;

    console.log(date);
    console.log(subject);
    console.log(totalQues);
    console.log(weightage);
    console.log(excludedTopics);
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        return crowdsourceInstance.problemCount();
      })
      .then(function (problemCount) {
        let quesData = "";
        for (var j = 0; j < totalQues; j++) {
          for (var i = 1; i <= problemCount; i++) {
            crowdsourceInstance.problems(i).then(function (p) {
              console.log(p);
              if (p[6] == true && p[7] == true) {
                console.log(p);

                let ques = `<br />
                <div class="card">
                  <div style="background-color: rgb(221, 221, 221)" class="card-header">
                    <p class="ques">
                      Ques1. This will be the format of each question (question here) :
                    </p>
                  </div>
                  <div class="card-body">
                    <table>
                      <tr>
                        <td>A. Option one here</td>
                        <td>B. Option two here</td>
                      </tr>
                      <tr>
                        <td class="right-opt">C. Option three here</td>
                        <td class="right-opt">D. Option four here</td>
                      </tr>
                    </table>
                  </div>
                </div>`;
                quesData += ques;
                problemCard.innerHTML = quesData;
              }
              document.querySelector("#download").style.visibility = "visible";
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  getAllQuestionsFromChain: function () {
    let problemCard1 = document.querySelector(".teacherDashboard");
    let problemCard2 = document.querySelector(".studentDashboard");
    console.log("here2");
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
        var poolCount = 0;
        var displayProblemCount1 = 0;
        for (var i = 1; i <= problemCount; i++) {
          crowdsourceInstance
            .pool(i)
            .then(function (pc) {
              poolCount = pc.toNumber();
              // console.log("poolCount", pc.toNumber());
            })
            .catch((error) => {
              console.log(error);
            });
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
            let currentProblemID = i;
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
                   Subject : <span id="subjects" spellcheck="false" class="contenteditableTeacherDashboard editSubject${count}" contenteditable="true">${subject}</span> | <span id="topic" spellcheck="false" class="contenteditableTeacherDashboard editTopic${count}" contenteditable="true">${topic}</span>
                </div>
                  <div class="question">
                    Ques ${displayProblemCount}.<span spellcheck="false" class="addQuestionText contenteditableTeacherDashboard editQuestion${count}" contenteditable="true">${question}</span>  
                    <br>
                    <img class="ques-img" src="${imgHash}" alt="">
                  </div>
                  <div class="options">
                      <button class="option">
                          <div class="option_text">A.</div>
                          &nbsp;
                          <div class="option_text">
                          <span id="option1" spellcheck="false" class="contenteditableTeacherDashboard editOptionsOne${count}" contenteditable="true">${
                options[0]
              }</span>
                          </div>
                      </button>
                      <button class="option">
                          <div class="option_text">B.</div>
                          &nbsp;
                          <div class="option_text">
                          <span id="option2" spellcheck="false" class="contenteditableTeacherDashboard editOptionsTwo${count}" contenteditable="true">${
                options[1]
              }</span>
                          </div>
                      </button>
                      <button class="option">
                          <div class="option_text">C.</div>
                          &nbsp;
                          <div class="option_text">
                          <span id="option3" spellcheck="false" class="contenteditableTeacherDashboard editOptionsThree${count}" contenteditable="true">${
                options[2]
              }</span>
                          </div>
                      </button>
                      <button class="option">
                          <div class="option_text">D.</div>
                          &nbsp;
                          <div class="option_text">
                          <span id="option4" spellcheck="false" class="contenteditableTeacherDashboard editOptionsFour${count}" contenteditable="true">${
                options[3]
              }</span>
                          </div>
                      </button>
                  </div>
              </div>
          </div>
          <div class="question-info">
              <div class="question-standard">Correct Answer :
              <span spellcheck="false" class="contenteditableTeacherDashboard editAnswer${count}" contenteditable="true" placeholder="Enter the correct Option(A/B/C/D)">${
                options[ans - 1]
              }</span>
               </div>
              <button onClick="App.editAndAccept(${count})" type="button" class="btn btn-info approve-btn">Edit and Accept</button>
              <button onClick="App.questionAccept(${count})" type="button" class="btn btn-outline-success approve-btn">Accept</button>
              <button onClick="App.questionReject(${count})" type="button" class="btn btn-outline-danger approve-btn">Reject</button>
          </div>
      </div>`;
              quesData1 += ques;
              problemCard1.innerHTML = quesData1;
            } else if (approve == true && isApprove == true) {
              displayProblemCount1++;

              var StrProblemCount = displayProblemCount1.toString();
              var UniqueClassName = "p" + StrProblemCount;

              let ques = `<div class="container questionCard">
              <div class="unitQuestion">
                  <div class="stud_question">
                      <div class="subject">
                          Subject : ${subject} | ${topic}
                      </div>
                      <div class="question">
                        
                        Ques ${displayProblemCount1}. <span class=${UniqueClassName}> ${question} </span> <button onclick="readQuest(${displayProblemCount1}); return false;" id="speak"><i class="fa fa-file-audio-o" aria-hidden="true"></i></button>
                        <br>
                        <img class="ques-img" src="${imgHash}" alt="">
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
                      <div class="reward">
                        <div class="upperReward">
                          <img style="height: 2vw;" src="assets/ethereum.svg" alt="ETH">
                          <button onClick="App.sendReward(${count})">
                          Send 1 ETH
                          </button>
                        </div>
                      <div>
                      </div class="lowerReward">
                      <p>Pool ${poolCount}:</p>
                      </div>
                      <button onClick="App.reportQuestion(${displayProblemCount1})">report</button>
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
  editAndAccept: function (count) {
    const Problem = {
      subject: "",
      topic: "",
      question: "",
      options: "",
      imgUrl: "",
      ans: 0,
      approve: false,
      isApproved: false,
    };
    function getNewSubject() {
      Problem.subject = document
        .querySelector(`.editSubject${count}`)
        .innerHTML.toString();
    }
    function getNewTopic() {
      Problem.topic = document
        .querySelector(`.editTopic${count}`)
        .innerHTML.toString();
    }
    function getNewQuestion() {
      Problem.question = document
        .querySelector(`.editQuestion${count}`)
        .innerHTML.toString();
    }
    function getNewOptions() {
      let options = document
        .querySelector(`.editOptionsOne${count}`)
        .innerHTML.toString();
      options +=
        "$" +
        document.querySelector(`.editOptionsTwo${count}`).innerHTML.toString();
      options +=
        "$" +
        document
          .querySelector(`.editOptionsThree${count}`)
          .innerHTML.toString();
      options +=
        "$" +
        document.querySelector(`.editOptionsFour${count}`).innerHTML.toString();
      Problem.options = options;
    }
    function getNewAns() {
      let ansText = document
        .querySelector(`.editAnswer${count}`)
        .innerHTML.toString();
      let options = App.getOptions(Problem.options);
      let foundAns = false;
      for (let i = 0; i < 4; ++i) {
        if (ansText === options[i]) {
          foundAns = true;
          Problem.ans = i + 1;
          break;
        }
      }
      if (foundAns == false) {
        swal("","Options didn't match with answer, Please check!!!", "info");
        Problem.ans = -1;
        return;
      }
    }
    getNewSubject();
    getNewTopic();
    getNewQuestion();
    getNewOptions();
    getNewAns();
    if (Problem.ans == -1) return;
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdsourceInstance = instance;
        crowdsourceInstance
          .problems(count)
          .then(function (p) {
            Problem.imgUrl = p[4];
            return Problem;
          })
          .then(function (Problem) {
            console.log("Edited Problems are:", Problem);
            const result = crowdsourceInstance.questionAcceptReject(
              count,
              Problem.subject,
              Problem.topic,
              Problem.question,
              Problem.options,
              Problem.imgUrl,
              Problem.ans,
              true,
              true,
              { from: App.account }
            );
            console.log("result", result);
            return result;
          })
          .then(function (result) {
            window.location = "http://localhost:3000/teacherDashboard.html";
          })
          .catch(function (err) {
            console.error(err);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  sendReward: function (index) {
    App.init();
    // console.log(index);
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        let contribution_amount = web3.utils.toWei("1", "Ether");
        console.log(index, contribution_amount);
        crowdsourceInstance = instance;
        // console.log(crowdsourceInstance);
        crowdsourceInstance
          .contribute(index, { from: App.account, value: contribution_amount })
          .then(function () {
            App.contracts.CrowdSource.deployed()
              .then(function (instance) {
                let result = instance.addAContribution(index, {
                  from: App.account,
                });
                return result;
              })
              .then(function (result) {
                window.location = "http://localhost:3000/studentDashboard.html";
              });

            // x=App.getAllContributions();
            // console.log(x);

            // App.contracts.CrowdSource.deployed().then(function(instance){
            //   console.log("byee");
            //     let contribuee=instance.getOwner(index,{from:App.account});
            //     console.log(contribuee);
            //     document.querySelector("#notification-user").innerHTML="Hellp";
            //     // const li=document.createElement('li');
            //     // li.innerHTML="Hello";
            //     // ulEle.appendChild(li);
            // });

            console.log("Contribute done");
          })
          .catch((error) => {
            console.log(error);
          });
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
        })
        .catch((error) => {
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
        var count = 0;
        var poolCount = 0;
        for (var i = 1; i <= problemCount; i++) {
          crowdsourceInstance
            .pool(i)
            .then(function (pc) {
              poolCount = pc.toNumber();
              // console.log("poolCount", pc.toNumber());
            })
            .catch((error) => {
              console.log(error);
            });
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
            count++;
            if (
              approve == true &&
              isApprove == true &&
              currSubject == subject
            ) {
              displayProblemCount1++;

              var StrProblemCount = displayProblemCount1.toString();
              var UniqueClassName = "p" + StrProblemCount;

              let ques = `<div class="container questionCard">
              <div class="unitQuestion">
                  <div class="stud_question">
                      <div class="subject">
                          Subject : ${subject} | ${topic}
                      </div>
                      <div class="question">
                      Ques ${displayProblemCount1}.  <span class=${UniqueClassName}> ${question} </span> <button onclick="readQuest(${displayProblemCount1});return false;" id="speak"><i class="fa fa-file-audio-o" aria-hidden="true"></i></button>
                      <br>
                      <img class="ques-img" src="${imgHash}" alt="">
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
                      <div class="reward">
                        <div class="upperReward">
                          <img style="height: 2vw;" src="assets/ethereum.svg" alt="ETH">
                          <button onClick="App.sendReward(${count})">
                          Send 1 ETH
                          </button>
                        </div>
                      <div>
                      </div class="lowerReward">
                      <p>Pool ${poolCount}:</p>
                      </div>
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

  getAllContributions: function () {
    // let x=['a','b','c'];
    console.log("byee9");
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdSourceInstance1 = instance;
        return crowdSourceInstance1.contributionCount();
        // x.push(5);
      })
      .then(function (contributionCount) {
        var ul = document.getElementById("testtt1");
        let cnt = 0;
        for (let i = 1; i <= contributionCount && cnt++ < 5; i++) {
          crowdsourceInstance.contributions(i).then(function (p) {
            console.log("Logging p", p);
            // x.push('d');
            // for (var i=0; i<x.length; i++) {
            var li = document.createElement("li");
            // li.classList.add("waves-effect waves-light");
            li.appendChild(
              document.createTextNode(
                `🎉 ${p.substring(0, 6)}....${p.substring(
                  38,
                  42
                )} Got rewarded with 1 ETH`
              )
            );
            ul.appendChild(li);
            // }
          });
          // cnt++;
          // if(cnt>5) break;
        }
      });
    // x.push('d');
    // console.log(x.length);
    // return x;
  },

  reportQuestion: function (_id) {
    App.contracts.CrowdSource.deployed()
      .then(function (instance) {
        crowdSourceInstance2 = instance;
        const result = crowdSourceInstance2.report(_id, { from: App.account });
        return result;
        // x.push(5);
      })
      .then(function (result) {
        window.location = "http://localhost:3000/studentDashboard.html";
        console.log(result);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
    App.downloadQuestions();
    App.addQuestion(true);
    App.getAllQuestionsFromChain();
    App.getAllSub();
    App.validateQuestion();
    App.getAllContributions();
    App.reportQuestion();
  });
});
