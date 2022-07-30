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
      question: "",
      options: [],
      ans: 0,
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
          Problem.question,
          Problem.options,
          "IPFS Image hash",
          Problem.ans,
          false,
          { from: App.account }
        );
        console.log(result);
        return result;
      })
      .then(function (result) {
        window.alert("Question added successfully");
        // Wait for votes to update
        // $("#content").hide();
        // $("#loader").show();
      })
      .catch(function (err) {
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
    // console.log(result);
    // window.alert("Question added successfully");
  },

  getAllQuestionsFromChain: function () {
    // console.log(App.contracts.CrowdSource.instance.problemCount());
    console.log("here")
    console.log(App.contracts.CrowdSource);
    App.contracts.CrowdSource.deployed().then(function(instance) {
      crowdsourceInstance = instance;
      console.log("here1")
      return crowdsourceInstance.problemCount();
      }).then(function(problemCount) {
        console.log("hereee")
        for (var i = 1; i <= problemCount; i++) {
          crowdsourceInstance.problems(i).then(function(p) {
          console.log(p);
          var subject = p[0];
          var question = p[1];
          console.log(subject);
          console.log(question);
        });
      }
      }).catch((e)=>{
        console.log(e);
      })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
    App.addQuestion();
    App.getAllQuestionsFromChain();
  });
});