import React from "react";
import "./Login.css";
import { FaStar } from 'react-icons/fa';

const Connected = (props) => {
    const formatRemainingTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const renderStars = (hotelRating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar 
                key={index}
                className={index < hotelRating ? "star-filled" : "star-empty"}
            />
        ));
    };

    const renderRatingInput = () => {
        return (
            <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => props.handleRatingChange({ target: { value: ratingValue } })}
                            />
                            <FaStar 
                                className={ratingValue <= props.rating ? "star-filled" : "star-empty"}
                                size={30}
                            />
                        </label>
                    );
                })}
            </div>
        );
    };

    const handleHotelSelect = (index) => {
        console.log("Hotel selected:", index); // Debug log
        props.handleNumberChange({ target: { value: index } });
    };

    const isSubmitDisabled = () => {
        // Check if a hotel is selected (props.number is not null/undefined)
        // and if rating is selected and user hasn't voted
        return props.number === null || 
               props.number === undefined || 
               !props.rating;
    };

    return (
        <div className="login-container">
            <div className="card connected-card">
                <h1 className="welcome-message">Hotel Rating Portal</h1>
                
                <div className="account-info">
                    <p className="info-text">Connected Account: 
                        <span className="highlight">{props.account.slice(0, 6)}...{props.account.slice(-4)}</span>
                    </p>
                    <p className="info-text">Time Remaining: 
                        <span className="highlight">{formatRemainingTime(props.remainingTime)}</span>
                    </p>
                </div>

                <div className="hotels-grid">
                    {props.hotels.map((hotel, index) => (
                        <div 
                            key={index} 
                            className={`hotel-card ${Number(props.number) === index ? 'selected-hotel' : ''}`}
                            onClick={() => handleHotelSelect(index)}
                        >
                            <div className="hotel-header">
                                <h3>{hotel.name}</h3>
                                <span className="hotel-index">#{index + 1}</span>
                            </div>
                            <div className="hotel-rating">
                                <div className="stars-display">
                                    {renderStars(hotel.ratingCount > 0 
                                        ? Math.round(hotel.totalRating / hotel.ratingCount) 
                                        : 0)}
                                </div>
                                <p className="rating-count">
                                    {hotel.ratingCount} ratings
                                </p>
                                <p className="average-rating">
                                    {hotel.ratingCount > 0 
                                        ? `${(hotel.totalRating / hotel.ratingCount).toFixed(1)} / 5`
                                        : "No ratings yet"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {props.hasVoted ? (
                    <div className="voted-message">
                        <p>Thank you for rating this hotel!</p>
                        <p>You can rate other hotels in the list.</p>
                    </div>
                ) : (
                    <div className="rating-section">
                        <h2 className="rating-title">
                            {props.number !== null 
                                ? `Rate ${props.hotels[props.number]?.name}`
                                : "Select a hotel to rate"}
                        </h2>
                        {props.number !== null && (
                            <>
                                {renderRatingInput()}
                                <button 
                                    className="login-button vote-button" 
                                    onClick={props.rateHotel}
                                    disabled={isSubmitDisabled()}
                                    onMouseOver={() => {
                                        console.log('Button State:', {
                                            number: props.number,
                                            rating: props.rating,
                                            isDisabled: isSubmitDisabled()
                                        });
                                    }}
                                >
                                    Submit Rating
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Connected;