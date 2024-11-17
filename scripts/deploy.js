async function main() {
    const HotelRating = await ethers.getContractFactory("HotelRating");
  
    // Start deployment, returning a promise that resolves to a contract object
    const hotelNames = ["Hilton", "Marriott", "Hyatt"];
    const durationInMinutes = 900000;
    const hotelRating = await HotelRating.deploy(hotelNames, durationInMinutes);
    console.log("Contract address:", hotelRating.address);
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });