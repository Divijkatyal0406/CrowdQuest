// SPDX-License-Identifier: MIT
pragma solidity ^0.5.1;

contract Sih {
    event SubmitQuestion(
        string subject,
        string question,
        string[] options,
        uint256 ans,
        bool approve
    );

    struct Problems {
        string subject;
        string question;
        string[] options;
        uint256 ans;
        bool approve;
    }

    Problems[] problems;

    function addToBlockchain(
        string memory _subject,
        string memory _question,
        string[] memory _options,
        uint256 _ans,
        bool _approve
    ) public {
        problems.push(Problems(_subject, _question, _options, _ans, _approve));

        emit SubmitQuestion(_subject, _question, _options, _ans, _approve);
    }

    function getAllQuestions() public view returns (Problems[] memory) {
        return problems;
    }
}
