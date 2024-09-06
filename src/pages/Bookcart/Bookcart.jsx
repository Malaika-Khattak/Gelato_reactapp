import React, { useEffect, useState } from "react";
import "./Bookcart.css";
import less_icon from "../../assests/less_icon.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import uparrow from "../../assests/arrows.png";
import downarrow from "../../assests/down-arrow.png";
import { useNavigate } from "react-router-dom";

const Bookcart = () => {
  const today = new Date();
  const [startdate, setstartdate] = useState(today);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [seedetail, setseedetail] = useState(false);
  const [sunday, setsunday] = useState(false);
  const navigate = useNavigate();

  const selectnextdate = () => {
    const nextdate = new Date(startdate);
    nextdate.setDate(startdate.getDate() + 1);

    if (nextdate.getDay() === 0) {
      nextdate.setDate(nextdate.getDate() + 1);
    }

    setstartdate(nextdate);
  };

  const generateTimeSlots = () => {
    let slots = [];
    if (startdate === today) {
      slots = ["10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];
    } else if (startdate.getDay() === 1) {
      slots = ["10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];
    } else if (startdate.getDay() === 6) {
      slots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"];
    } else {
      slots = [
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "10:00 PM",
        "10:30 PM",
        "11:00 PM",
        "11:30 PM",
      ];
    }
    return slots;
  };

  const handledatechange = (date) => {
    setstartdate(date);
    if (date.getDay() === 0) {
      setsunday(true);
    } else {
      setsunday(false);
    }
  };

  const handlenextbtn = () => {
    navigate("/clientdetail", {
      state: { startdate, selectedTimeSlot },
    });
  };

  const handlebackclick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const slots = generateTimeSlots();
    setTimeSlots(slots);
    if (slots.length > 0) {
      setSelectedTimeSlot(slots[0]);
    }
  }, [startdate]);

  return (
    <div className="bookcart">
      <div className="backwardbtn" onClick={handlebackclick}>
        <img src={less_icon} alt="" />
        <p>Back</p>
      </div>
      <div className="booking_content">
        <div className="heading">
          <h1>ICE CREAM CART</h1>
          <p>
            Check out our availability and book the date and time that works for
            you
          </p>
        </div>
        <div className="contents">
          <p className="select">Select Date and Time</p>
          <span>Timezone: Pakistan Standard Time (GMT+5)</span>
        </div>
        <div className="timing_selection">
          <div className="date_time">
            <div className="calender_times">
              <div className="date">
                <Calendar
                  value={startdate}
                  onChange={handledatechange}
                  minDate={today}
                  inline
                />
              </div>
              <div className="time">
                <p>{startdate.toDateString()}</p>
                {startdate.getDay() === 0 ? (
                  <div className="notavailabe">
                    <p>No availibility</p>
                    <button type="button" onClick={selectnextdate}>
                      Check Next Availability
                    </button>
                  </div>
                ) : (
                  <div className="timeslots">
                    {timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className={`slote ${
                          selectedTimeSlot === slot ? "selected" : ""
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bookcart_details">
            <div className="details">
              <div className="btn">
                <p>Service Details</p>
                {seedetail === false ? (
                  <img
                    src={uparrow}
                    alt=""
                    srcset=""
                    onClick={() => {
                      setseedetail(true);
                    }}
                  />
                ) : (
                  <img
                    src={downarrow}
                    alt=""
                    srcset=""
                    onClick={() => {
                      setseedetail(false);
                    }}
                  />
                )}
              </div>
              <div className={seedetail === false ? "bookcart_info" : "hide"}>
                <p className="carthead">ICE CREAM CART</p>
                <div className={sunday === false ? "deet" : "hide"}>
                  <p>
                    {startdate.toDateString()} at {selectedTimeSlot}
                  </p>
                  <p>Staff Member #1</p>
                  <p>4 hr</p>
                </div>

                <p>$200</p>
              </div>
              <button
                type="button"
                className={sunday === false ? "click" : "notclick"}
                onClick={handlenextbtn}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookcart;
