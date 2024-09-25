import { useEffect, useState } from "react";
import "./TimeGrid.css";
import clsx from "clsx";

const TimeGrid = ({ isSameDay, timeDetail }) => {
    const times = [];
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeDisableFrom, setTimeDisableFrom] = useState([])
    const [timeDisableTo, setTimeDisableTo] = useState([])

    console.log(timeDetail);


    const handleTimeDisable = (time) => {
        if (time.length != 0) {
            time.map((item, index) => {
                item?.booking?.map(book => {
                    const indexFrom = times.findIndex(it => {
                        if (book.from == '24:00') return it == '23:30'
                        return it == book.from
                    })
                    const indexTo = times.findIndex(it => {
                        if (book.to == '24:00') return it == '23:30'
                        return it == book.to
                    })
                    index == 0
                        ?
                        setTimeDisableFrom(prev => [...prev, Array(indexTo + 2 - indexFrom + 1).fill(0).map((_, i) => i + indexFrom - 1)])
                        :
                        setTimeDisableTo(prev => [...prev, Array(indexTo + 2 - indexFrom + 1).fill(0).map((_, i) => i + indexFrom - 1 + 48)])
                })
            })
        }
    }

    useEffect(() => {
        timeDetail && handleTimeDisable(timeDetail)

        return () => {
            setStartTime(null)
            setEndTime(null)
            setTimeDisableFrom([])
            setTimeDisableTo([])
        };
    }, [timeDetail])

    const handleSlotClick = (slot) => {
        if (
            startTime == null
            && endTime == null
            && !timeDisableFrom.some(subArr => subArr.includes(slot))
            && !timeDisableTo.some(subArr => subArr.includes(slot))
        ) {
            setStartTime(slot)
        } else if (
            startTime != null
            && endTime == null
            && slot > startTime
            && !timeDisableFrom.some(subArr => subArr.includes(slot))
            && !timeDisableTo.some(subArr => subArr.includes(slot))
            && checkTimeValid([...timeDisableFrom, ...timeDisableTo], startTime, slot)
        ) {
            setEndTime(slot)
        } else if (
            startTime != null
            && endTime == null
            && slot < startTime
            && !timeDisableFrom.some(subArr => subArr.includes(slot))
            && !timeDisableTo.some(subArr => subArr.includes(slot))
            && checkTimeValid([...timeDisableFrom, ...timeDisableTo], slot, startTime)
        ) {
            setStartTime(slot)
            setEndTime(startTime)
        }
        else if (
            startTime != null
            && endTime != null
            && !timeDisableFrom.some(subArr => subArr.includes(slot))
            && !timeDisableTo.some(subArr => subArr.includes(slot))
        ) {
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
                                'disabled': timeDisableFrom.some(subArr => subArr.includes(index)),
                                'clean': timeDisableFrom.some(subArr => subArr.slice(-1).includes(index)) || timeDisableFrom.some(subArr => subArr.slice(0, 1).includes(index))
                            })}
                            onClick={() => handleSlotClick(index)}
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
                                    'disabled': timeDisableTo.some(subArr => subArr.includes(index + 48)),
                                    'clean': timeDisableTo.some(subArr => subArr.slice(-1).includes(index + 48)) || timeDisableTo.some(subArr => subArr.slice(0, 1).includes(index + 48))
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

const checkTimeValid = (arr, from, to) => {
    for (let i = 0; i <= arr.length - 1; i++) {
        if (
            (from > arr[i][arr[i].length - 1] && to > arr[i][arr[i].length - 1])
            ||
            (from < arr[i][0] && to < arr[i][0])
        ) continue
        return false
    }
    return true
}
