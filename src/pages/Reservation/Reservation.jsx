import React, { useEffect, useState } from "react";
import "./Reservation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cross_icon from "../../assests/cross_icon.png";

const Reservation = () => {
  const [showReservation, setShowReservation] = useState(false);
  const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const [guests, setGuests] = useState("1");
  const [timeSlots, setTimeSlots] = useState([]);
  const [hour, setHour] = useState(today.getHours());
  const [min, setMin] = useState(today.getMinutes());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const convertTo12HourFormat = (hour) => {
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${adjustedHour}`;
  };

  const getPeriod = (hour) => {
    return hour >= 12 ? "PM" : "AM";
  };

  const generateTimeSlots = (selectedHour, selectedMin) => {
    const slots = [];
    let currentHour = 8;
    let currentMin = 0;

    while (currentHour <= 22) {
      const timeString = `${convertTo12HourFormat(currentHour)}:${
        currentMin < 10 ? "0" : ""
      }${currentMin} ${getPeriod(currentHour)}`;
      slots.push(timeString);
      currentMin += 15;
      if (currentMin === 60) {
        currentMin = 0;
        currentHour++;
      }
    }

    const selectedTimeIndex = slots.findIndex((time) => {
      const [timeStr, period] = time.split(" ");
      let [hour, min] = timeStr.split(":").map(Number);

      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      return hour === selectedHour && min === selectedMin;
    });

    const adjustedSlots = [];

    for (let i = -7; i <= 7; i++) {
      const index = selectedTimeIndex + i;
      if (index >= 0 && index < slots.length) {
        adjustedSlots.push(slots[index]);
      } else {
        adjustedSlots.push(null);
      }
    }

    return adjustedSlots;
  };

  const generateInitialTimeSlots = () => {
    const initialHour = 8;
    const initialMin = 0;
    return generateTimeSlots(initialHour, initialMin);
  };

  useEffect(() => {
    setTimeSlots(generateInitialTimeSlots());
  }, []);

  const handleGuest = (event) => {
    setGuests(event.target.value);
  };

  const handleTime = (event) => {
    const [time, period] = event.target.value.split(" ");
    let [selectedHour, selectedMin] = time.split(":").map(Number);

    if (period === "PM" && selectedHour !== 12) {
      selectedHour += 12;
    } else if (period === "AM" && selectedHour === 12) {
      selectedHour = 0;
    }
    setHour(selectedHour);
    setMin(selectedMin);
    setSelectedTimeSlot(event.target.value);
  };

  const generateTimeOptions = (startHour, startMin) => {
    const options = [];
    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour <= 22) {
      const timeString = `${convertTo12HourFormat(currentHour)}:${
        currentMin < 10 ? "0" : ""
      }${currentMin} ${getPeriod(currentHour)}`;

      options.push(
        <option key={`${currentHour}-${currentMin}`} value={timeString}>
          {timeString}
        </option>
      );
      currentMin += 15;
      if (currentMin === 60) {
        currentMin = 0;
        currentHour++;
      }
    }
    return options;
  };

  useEffect(() => {
    if (startDate) {
      const selectedHour = hour;
      const selectedMin = min;
      setTimeSlots(generateTimeSlots(selectedHour, selectedMin));
    }
  }, [startDate, hour, min]);

  return (
    <div className="reserve">
      <form>
        <div className="reserve_content">
          <div className="text">
            <p className="head">MAKE A RESERVATION</p>
            <p className="para">
              To help us find the best table for you, select the preferred party
              size, date, and time of your reservation.
            </p>
          </div>
          <div className="reserve_main">
            <div className="date">
              <div className="selection">
                <label htmlFor="guests">
                  Party Size
                  <br />
                </label>
                <select
                  name="guests"
                  id="guests"
                  value={guests}
                  onChange={handleGuest}
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5">5 guests</option>
                  <option value="6">6 guests</option>
                </select>
              </div>
              <div className="selection_datt">
                <label htmlFor="date">
                  Date
                  <br />
                </label>

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Select a date"
                  minDate={today}
                  className="datepicker"
                />
              </div>
              <div className="selection">
                <label htmlFor="time">
                  Time
                  <br />
                </label>
                <select name="time" id="time" onChange={handleTime}>
                  {startDate &&
                  startDate.toDateString() === today.toDateString()
                    ? generateTimeOptions(hour, min)
                    : generateTimeOptions(8, 0)}
                </select>
              </div>
            </div>
            <div className="hr"></div>
            <div className="timeslot">
              <p>Choose an available time slot:</p>
              <div className="times">
                {timeSlots.map((time, index) => (
                  <div
                    className={`slot ${
                      time
                        ? time === selectedTimeSlot
                          ? "highlight"
                          : "point"
                        : "gray-background"
                    }`}
                    key={index}
                  >
                    {time || ""}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="reservebtn"
              onClick={() => {
                setShowReservation(true);
              }}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </form>
      <div className={showReservation ? "displayconfirmation" : "dontdisplay"}>
        <div className="info">
          <img
            src={cross_icon}
            onClick={() => {
              setShowReservation(false);
            }}
            alt="Close"
          />
          <h1>Your Reservation is Confirmed</h1>
          <p className="details">Timing Details:</p>
          <p>
            <b>Guests: </b>
            {guests}
          </p>
          <p>
            <b>Date: </b>
            {startDate ? startDate.toDateString() : "Not Selected"}
          </p>
          <p>
            <b>Time: </b>
            {selectedTimeSlot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
