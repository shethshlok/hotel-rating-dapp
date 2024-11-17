import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [hotels, setHotels] = useState([]);
  const [number, setNumber] = useState('');
  const [rating, setRating] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    getHotels();
    getRemainingTime();
    getRatingStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  }, [account]);

  async function rateHotel() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );

      const hotelIndex = parseInt(number);
      const ratingValue = parseInt(rating);

      console.log("Attempting to rate hotel:", hotelIndex, "with rating:", ratingValue);

      const tx = await contractInstance.rateHotel(hotelIndex, ratingValue);
      console.log("Transaction sent:", tx.hash);
      
      await tx.wait();
      console.log("Transaction confirmed");
      
      setRating('');
      await getHotels();
      await checkIfVoted();
    } catch (error) {
      console.error("Error rating hotel:", error);
      alert("Error rating hotel: " + error.message);
    }
  }

  async function checkIfVoted() {
    try {
      if (!account || number === '') return;
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.rated(account, parseInt(number));
      console.log("Vote status for hotel", number, ":", status);
      setHasVoted(status);
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  }

  async function getHotels() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );
      const hotelsList = await contractInstance.getHotelRatings();
      console.log("Raw hotels data:", hotelsList);
      
      const formattedHotels = hotelsList.map((hotel, index) => ({
        name: hotel.name,
        totalRating: parseInt(hotel.totalRating.toString()),
        ratingCount: parseInt(hotel.ratingCount.toString())
      }));
      
      console.log("Formatted hotels:", formattedHotels);
      setHotels(formattedHotels);
    } catch (error) {
      console.error("Error getting hotels:", error);
    }
  }

  async function getRatingStatus() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getRatingStatus();
      setVotingStatus(status);
    } catch (error) {
      console.error("Error getting rating status:", error);
    }
  }

  async function getRemainingTime() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );
      const time = await contractInstance.getRemainingTime();
      setRemainingTime(time.toNumber());
    } catch (error) {
      console.error("Error getting remaining time:", error);
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      checkIfVoted();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        checkIfVoted();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  function handleNumberChange(e) {
    const newNumber = e.target.value;
    console.log("Selected hotel index:", newNumber);
    setNumber(newNumber);
    setHasVoted(false);
    setRating('');
    checkIfVoted();
  }

  function handleRatingChange(e) {
    setRating(e.target.value);
  }

  return (
    <div className="App">
      {votingStatus ? (
        isConnected ? (
          <Connected 
            account={account}
            hotels={hotels}
            remainingTime={remainingTime}
            number={number}
            rating={rating}
            handleNumberChange={handleNumberChange}
            handleRatingChange={handleRatingChange}
            rateHotel={rateHotel}
            hasVoted={hasVoted}
          />
        ) : (
          <Login connectWallet={connectToMetamask}/>
        )
      ) : (
        <Finished />
      )}
    </div>
  );
}

export default App;
