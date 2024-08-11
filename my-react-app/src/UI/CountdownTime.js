// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import "../Style/producttoday.css"
const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    function getTimeRemaining(targetDate) {
        const now = new Date();
        const end = new Date(targetDate);
        const timeDiff = end - now;

        if (timeDiff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    }

    return (
        <div className="product__today--time--reverse">
            <div className="product__today--time--hours">{String(timeLeft.hours).padStart(2, '0')}  </div>
            <div className="product__today--time--minutes">{String(timeLeft.minutes).padStart(2, '0')}  </div>
            <div className="product__today--time--seconds">{String(timeLeft.seconds).padStart(2, '0')}</div>
        </div>
    );
};

export default CountdownTimer;
