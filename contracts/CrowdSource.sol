// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.5.1;

contract CrowdSource {
    // Problem[] problems;
    uint256 public problemCount;
    mapping(uint256 => Problem) public problems;

    // CQT - Count of Questions per Topic
    mapping(string => uint256) cqt;

    //uint is id
    mapping(uint256 => address payable) public owner;
    // id => amount
    mapping(uint256 => uint256) public pool;

    event SubmitQuestion(
        string subject,
        string topic,
        string question,
        string options,
        string imgHash,
        uint256 ans,
        bool approve,
        bool isApproved
    );

    struct Problem {
        string subject;
        string topic;
        string question;
        string options;
        string imgHash;
        uint256 ans;
        bool approve;
        bool isApproved;
    }

    function addToBlockchain(
        string memory _subject,
        string memory _topic,
        string memory _question,
        string memory _options,
        string memory _imgHash,
        uint256 _ans,
        bool _approve,
        bool _isApproved
    ) public {
        problemCount++;
        problems[problemCount] = Problem(
            _subject,
            _topic,
            _question,
            _options,
            _imgHash,
            _ans,
            _approve,
            _isApproved
        );
        //Added this
        owner[problemCount]=msg.sender;
        emit SubmitQuestion(
            _subject,
            _topic,
            _question,
            _options,
            _imgHash,
            _ans,
            _approve,
            _isApproved
        );
    }

    function questionAcceptReject(
        uint256 _problemCount,
        string memory _subject,
        string memory _topic,
        string memory _question,
        string memory _options,
        string memory _imgHash,
        uint256 _ans,
        bool _approve,
        bool _isApproved
    ) public {
        cqt[_topic]++;
        problems[_problemCount] = Problem(
            _subject,
            _topic,
            _question,
            _options,
            _imgHash,
            _ans,
            _approve,
            _isApproved
        );
        // owner[uid]=msg.sender;
        emit SubmitQuestion(
            _subject,
            _topic,
            _question,
            _options,
            _imgHash,
            _ans,
            _approve,
            _isApproved
        );
    }

    function getCountOfTopic(string memory _topic)
        public
        view
        returns (uint256)
    {
        uint256 count = cqt[_topic];
        return count;
    }

    //   function increaseCountOfTopic(string memory _topic) public {
    //     cqt[_topic]++;
    // }

    // function getAllQuestions() public view returns (Problem[] memory){
    //     // Problem[] memory ret = new Problem[](problems.length);
    //     // for (uint i = 0; i < problems.length; i++) {
    //     //     ret[i] = problems[i];
    //     // }
    //     // return ret;
    //     return problems;
    // }

    function contribute(uint256 _problemCount) public payable {
        pool[_problemCount] += 1;
        //Next two line is error
        address payable _owner = owner[_problemCount];
        _owner.transfer(0.0001 ether);
    }
}