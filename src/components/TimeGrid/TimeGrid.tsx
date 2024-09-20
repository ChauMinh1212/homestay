import { useEffect, useState } from "react";
import "./TimeGrid.css";
import clsx from "clsx";

const TimeGrid = ({ isSameDay, timeDetail }) => {
    const times = [];
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeDisableFrom, setTimeDisableFrom] = useState([])
    const [timeDisableTo, setTimeDisableTo] = useState([])

    const handleTimeDisable = (time) => {
        if (time.length != 0) {
            time.map((item, index) => {
                item.booking.map(book => {
                    const indexFrom = times.findIndex(it => {
                        if (book.from == '24:00') return it == '23:30'
                        return it == book.from
                    })
                    const indexTo = times.findIndex(it => {
                        if (book.to == '24:00') return it == '23:30'
                        return it == book.from
                    })
                    index == 0 ? setTimeDisableFrom(prev => [...prev, ...times.splice(indexFrom, indexTo + 1)]) : setTimeDisableTo(prev => [...prev, ...times.splice(indexFrom, indexTo + 1)])
                })
            })
        }
        else {
            setTimeDisableFrom([])
            setTimeDisableTo([])
        }
    }

    useEffect(() => {
        timeDetail && handleTimeDisable(timeDetail)

        return () => {
            setStartTime(null)
            setEndTime(null)
        };
    }, [timeDetail])

    const handleSlotClick = (slot) => {
        console.log(timeDisableFrom.includes(times[slot]));
        
        if (startTime == null && endTime == null && !timeDisableFrom.includes(times[slot])) {
            setStartTime(slot)
        } else if (startTime != null && endTime == null && slot > startTime) {
            setEndTime(slot)
        } else if (startTime != null && endTime != null) {
            setStartTime(slot)
            setEndTime(null)
        }
    };

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute
                .toString()
                .padStart(2, '0')}`;
            times.push(time);
        }
    }

    return (
        <div className="max-w-[600px] mx-auto">
            <div
                className={clsx('flex', {
                    'justify-center': !!isSameDay,
                    'justify-between': !isSameDay
                })}
            >
                <div className="time-grid ">
                    {times.map((time, index) => (
                        <div
                            key={index}
                            className={clsx('time-slot', {
                                'selected': ((startTime != null && startTime <= index && index <= endTime) || (startTime === index)),
                                'disabled': timeDisableFrom.includes(time)
                            })}
                            onClick={() => handleSlotClick(index,)}
                        >
                            {time}
                        </div>
                    )
                    )}
                </div>
                {!isSameDay && (
                    <div className="time-grid">
                        {times.map((time, index) => (
                            <div
                                key={index + 48}
                                className={clsx('time-slot', {
                                    'selected': ((startTime != null && startTime <= (index + 48) && (index + 48) <= endTime) || (startTime === (index + 48))),
                                    'disabled': timeDisableTo.includes(time)

                                })}
                                onClick={() => handleSlotClick(index + 48)}
                            >
                                {time}
                            </div>
                        )
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-col mt-[10px]">
                <div className="flex items-center">
                    <div className="w-[15px] h-[15px] border-[1px] border-black rounded-[50%] mr-[10px]"></div>
                    <div className="font-[400]">Thời gian trống, có thể đặt</div>
                </div>
                <div className="flex items-center">
                    <div className="w-[15px] h-[15px] border-[1px] border-transparent rounded-[50%] mr-[10px] bg-[#e5e1e1]"></div>
                    <div className="font-[400]">Thời gian đã full, không thể đặt</div>
                </div>
                <div className="flex items-center">
                    <div className="w-[15px] h-[15px] border-[1px] border-transparent rounded-[50%] mr-[10px] bg-[#ba2e2d]"></div>
                    <div className="font-[400]">Thời gian chuẩn bị HOME, không thể đặt</div>
                </div>
            </div>
        </div>

    );
};

export default TimeGrid;
