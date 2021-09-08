// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

contract PollContract {

    struct Poll {
        uint256 id;
        string question;
        string image;
        uint64[] votes;
        bytes32[] options;
    }

    struct Voter {
        address id;
        uint256[] votedIds;
        mapping(uint256 => bool) votedMap;
    }

    Poll[] private polls;
    mapping(address => Voter) private voters;

    function createPoll(string memory _question, string memory _image, bytes32[] memory _options) public {
        require(bytes(_question).length > 0, "Empty question");
        require(_options.length > 1, "At least 2 options are required");

        uint256 pollId = polls.length; // eek...

        Poll memory newPoll = Poll({
           id: pollId,
           question: _question,
           image: _image,
           options: _options,
           votes: new uint64[](_options.length)
        });

        polls.push(newPoll);
    }
}
