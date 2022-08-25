// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.5.1;

contract CrowdSource {
    // Problem[] problems;
    uint256 public problemCount;
    uint256 public contributionCount;

    mapping(uint256 => Problem) public problems;

    // CQT - Count of Questions per Topic
    mapping(string => uint256) cqt;

    //uint is id
    mapping(uint256 => address payable) public owner;
    // id => amount
    mapping(uint256 => uint256) public pool;

    mapping(uint256 => string) public contributions;

    //report count id(uint)=>uint(count)
    mapping(uint256 => uint256) public reportClicks;


    event SubmitQuestion(
        string subject,
        string topic,
        string question,
        string options,
        string imgHash,
        uint256 ans,
        bool approve,
        bool isApproved,
        uint8 d,
        address owner
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
        uint8 d;
        address owner;
    }

    function toAsciiString(address x) pure internal returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function addToBlockchain(
        string memory _subject,
        string memory _topic,
        string memory _question,
        string memory _options,
        string memory _imgHash,
        uint256 _ans,
        bool _approve,
        bool _isApproved,
        uint8 _d
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
            _isApproved,
            _d,
            msg.sender
        );
        //Added this
        owner[problemCount] = msg.sender;
        emit SubmitQuestion(
            _subject,
            _topic,
            _question,
            _options,
            _imgHash,
            _ans,
            _approve,
            _isApproved,
            _d,
            msg.sender
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
        bool _isApproved,
        uint8 _d
    ) public {
        if (_approve == true && _isApproved == true) {
            cqt[_topic]++;
        }
        problems[_problemCount] = Problem(
            _subject,
            _topic,
            _question,
            _options,
            _imgHash,
            _ans,
            _approve,
            _isApproved,
            _d,
            msg.sender
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
            _isApproved,
            _d,
            msg.sender
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
        address(_owner).transfer(msg.value);
    }

    function getOwner(uint256 _id) public view returns (address payable) {
        return owner[_id];
    }


    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function addAContribution(uint256 _id) public {
        contributionCount++;
        contributions[contributionCount] = toAsciiString(owner[_id]);
    }

    function report(uint256 _id) public {
        reportClicks[_id]++;
        if (reportClicks[_id] > 1) {
            // Problem memory p=problems[_id];
            // p.approve=false;
            // p.isApproved=false;
            // problems[_id]=p;
            problems[_id].approve = false;
            problems[_id].isApproved = false;
        }
    }
}