// SPDX-License-Identifier: MIT
pragma solidity ^0.5.1;

contract Authentication {
    uint256 public noOfUsers;

    struct User {
        string signatureHash;
        address userAddress;
    }

    mapping(address => User) private user;

    constructor() public{
        noOfUsers = 0;
    }

    function register(string memory _signature) public {
        // require(
        //     user[msg.sender].userAddress ==
        //         address(0x0000000000000000000000000000000000000000),
        //     "already registered"
        // );

        user[msg.sender].signatureHash = _signature;
        user[msg.sender].userAddress = msg.sender;
        noOfUsers++;
    }

    function getSignatureHash() public view returns (string memory) {
        // require(msg.sender == user[msg.sender].userAddress, "Not allowed");

        return user[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns (address) {
        return user[msg.sender].userAddress;
    }
}
