import { useState, useEffect } from "react";
import "./style.css";

export default function Countdown() {
  const TARGET = new Date("2027-04-30T23:59:59");

  const calcTime = () => {
    const diff = TARGET - Date.now();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calcTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calcTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <div className="time-box">
        <span>{String(time.days).padStart(2, "0")}</span>
        <label>Days</label>
      </div>
      <div className="time-box">
        <span>{String(time.hours).padStart(2, "0")}</span>
        <label>Hours</label>
      </div>
      <div className="time-box">
        <span>{String(time.minutes).padStart(2, "0")}</span>
        <label>Minutes</label>
      </div>
      <div className="time-box">
        <span>{String(time.seconds).padStart(2, "0")}</span>
        <label>Seconds</label>
      </div>
    </div>
  );
}