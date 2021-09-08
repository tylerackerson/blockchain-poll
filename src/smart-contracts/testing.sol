// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

contract Test {
    uint256 myNumber;
    bool isActive;
    bytes32 password;
    string name;

    string[] names;
    mapping(address => Person) ids;

    address ad; // 42 chars

    struct Person {
        address id;
        string name;
        uint24 age;
    }

    enum Day { Monday, Tuesday }

    constructor() {
        myNumber = 12;
        isActive = true;
        name = 'ty';
    }

    // funciton signatures:
    // function name(type name) {public|external|internal|private} {pure|constant|view|payable} returns (type)
    modifier above10(uint256 _newNumber) {
        require (_newNumber <= 10, "Number is > 10");
        _;
    }

    function setNumber(uint256 _newNumber) internal above10(_newNumber) {
        // msg.sender
        // msg.value
        // now
        myNumber = _newNumber;
    }

    function getPureNumber() external pure returns (uint256) {
        return 5 * 5;
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }
}
