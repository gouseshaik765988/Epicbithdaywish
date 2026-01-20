import React from 'react';
import './BirthdayWaitingPage.css';

const BirthdayWaitingPage = ({ countdown, name }) => {
    // Ensure days/hours/minutes/seconds are always 2 digits if they are single digits
    const formatTime = (value) => String(value).padStart(2, '0');

    return (
        <div className="waiting-container">
            {/* Background Animation Elements */}
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>


            <div className="countdown-card">
                <h1>Counting Down to {name}'s Birthday!</h1>

                {/* This wrapper ensures stacking of rows */}
                <div className="timer-layout">

                    {/* Row 1: Only DAYS */}
                    <div className="time-row" id="top-row">
                        <div className="time-box ">
                            <span className="time-value ">{formatTime(countdown.days)}</span>
                            <span className="time-label">DAYS</span>
                        </div>
                    </div>

                    {/* Row 2: HOURS, MINS, SECS */}
                    <div className="time-row" id="bottom-row">
                        <div className="time-box">
                            <span className="time-value">{formatTime(countdown.hours)}</span>
                            <span className="time-label">HOURS</span>
                        </div>
                        <div className="time-box">
                            <span className="time-value">{formatTime(countdown.minutes)}</span>
                            <span className="time-label">MINS</span>
                        </div>
                        <div className="time-box">
                            <span className="time-value">{formatTime(countdown.seconds)}</span>
                            <span className="time-label">SECS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BirthdayWaitingPage;
