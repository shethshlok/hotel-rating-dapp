// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotelRating {
    struct Hotel {
        string name;
        uint256 totalRating;
        uint256 ratingCount;
    }

    Hotel[] public hotels;
    address owner;
    mapping(address => mapping(uint256 => bool)) public rated;

    uint256 public ratingStart;
    uint256 public ratingEnd;

    constructor(string[] memory _hotelNames, uint256 _durationInMinutes) {
        for (uint256 i = 0; i < _hotelNames.length; i++) {
            hotels.push(Hotel({
                name: _hotelNames[i],
                totalRating: 0,
                ratingCount: 0
            }));
        }
        owner = msg.sender;
        ratingStart = block.timestamp;
        ratingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function addHotel(string memory _name) public onlyOwner {
        hotels.push(Hotel({
            name: _name,
            totalRating: 0,
            ratingCount: 0
        }));
    }

    function rateHotel(uint256 _hotelIndex, uint256 _rating) public {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5.");
        require(!rated[msg.sender][_hotelIndex], "You have already rated this hotel.");
        require(_hotelIndex < hotels.length, "Invalid hotel index.");

        hotels[_hotelIndex].totalRating += _rating;
        hotels[_hotelIndex].ratingCount++;
        rated[msg.sender][_hotelIndex] = true;
    }

    function getHotelRatings() public view returns (Hotel[] memory) {
        return hotels;
    }

    function getAverageRating(uint256 _hotelIndex) public view returns (uint256) {
        require(_hotelIndex < hotels.length, "Invalid hotel index.");
        Hotel memory hotel = hotels[_hotelIndex];
        if (hotel.ratingCount == 0) {
            return 0;
        }
        return hotel.totalRating / hotel.ratingCount;
    }

    function getRatingStatus() public view returns (bool) {
        return (block.timestamp >= ratingStart && block.timestamp < ratingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= ratingStart, "Rating has not started yet.");
        if (block.timestamp >= ratingEnd) {
            return 0;
        }
        return ratingEnd - block.timestamp;
    }
}
