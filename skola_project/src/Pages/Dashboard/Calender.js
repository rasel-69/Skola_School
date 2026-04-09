import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from 'date-fns-tz'; // Import date-fns-tz for timezone handling


const CalendarComponent = () => {
    // State for storing the selected date
    const [date, setDate] = useState(new Date());

    // Function to handle date change
    const handleChange = (newValue) => {
        setDate(newValue);
    };

    // Convert the date to Bangladesh time zone
    const bangladeshTimeZone = 'Asia/Dhaka';
    const formattedDate = format(date, 'yyyy-MM-dd ', { timeZone: bangladeshTimeZone });

    return (
        <div >
            <div className="hero bg-base-100 min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Calendar</h1>
                        <p className="py-6">
                            Today's date is - {formattedDate}
                        </p>
                    </div>

                    <div >
                        <Calendar
                            onChange={handleChange}
                            value={date}
                            className="p-4 bg-white rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
