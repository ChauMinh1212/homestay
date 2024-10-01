import styled from "@emotion/styled";
import { Menu } from "@mui/material";
import clsx from "clsx";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatCash } from "~/common/common";
import { COMBO_LIST, TYPE_DETAIL_ROOM } from "~/common/contants";
import Combo from "../Combo/Combo";
import { showSnackbar } from "../SnackBarCustom/SnackBarSlice";
import "./TimeGrid.css";

const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 0
  }
  .MuiPaper-root {
    border-radius: 10px
  }
`;

const TimeGrid = ({ isSameDay, timeDetail, dateFrom, dateTo, room }) => {
    const times = [];
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeDisableFrom, setTimeDisableFrom] = useState([])
    const [timeDisableTo, setTimeDisableTo] = useState([])
    const [combo, setCombo] = useState(null)
    const [isCanDelete, setIsCanDelete] = useState(true)
    const [timeAdd, setTimeAdd] = useState(0)
    const [guest, setGuest] = useState(2)
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        setTimeAdd(0)

        if (dateTo.diff(dateFrom, 'day') > 1) {
            setCombo(COMBO_LIST[0])
            setStartTime(28)
            setEndTime(72)
            setIsCanDelete(false)
        } else {
            setCombo(null)
            setIsCanDelete(true)
        }

        return () => {
            setStartTime(null)
            setEndTime(null)
            setTimeDisableFrom([])
            setTimeDisableTo([])
        };
    }, [dateFrom, dateTo])

    const handleSlotClick = (slot) => {
        if (dateTo.diff(dateFrom, 'day') > 1) {
            dispatch(showSnackbar({ message: 'Không thể chọn', status: 'error' }))
            return
        }
        if (combo && slot <= endTime + 1) {
            dispatch(showSnackbar({ message: 'Chỉ được thêm giờ sau combo tối thiểu 1 tiếng', status: 'error' }))
            return
        }
        if (combo && slot > endTime + 1) {
            if ((slot - endTime) % 2 != 0) {
                dispatch(showSnackbar({ message: 'Chỉ được chọn chẵn giờ (VD: 13h - 15h, 13h30 - 15h30, ...)', status: 'error' }))
                return
            }
            setTimeAdd(slot - endTime)
            return
        }
        if (dateTo.diff(dateFrom, 'day') == 0 && (slot < 26 || slot > 40)) {
            dispatch(showSnackbar({ message: 'Chỉ được chọn giờ lẻ trong khung giờ 13h - 20h', status: 'error' }))
            return
        }
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
            if ((slot - startTime) % 2 != 0) {
                dispatch(showSnackbar({ message: 'Chỉ được chọn chẵn giờ (VD: 13h - 15h, 13h30 - 15h30, ...)', status: 'error' }))
                return
            }
            if (slot - startTime < 4) {
                dispatch(showSnackbar({ message: 'Đặt tối thiểu 2 tiếng', status: 'error' }))
                return
            }

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
            if (hour == 23 && minute == 30) {
                times.push('24:00')
            } else {
                const time = `${hour.toString().padStart(2, '0')}:${minute
                    .toString()
                    .padStart(2, '0')}`;
                times.push(time);
            }
        }
    }

    const handleComboClick = (com) => {
        setCombo(com)
        setTimeAdd(0)
        if (!com) {
            setStartTime(null)
            setEndTime(null)
            return
        }
        const fromIndex = times.findIndex(item => item == com.time[0])
        const toIndex = times.findIndex(item => item == com.time[1])
        setStartTime(fromIndex)
        setEndTime(dateTo.diff(dateFrom, 'day') == 0 ? toIndex : toIndex + 48)
    }

    return (
        <div>
            <div className="w-[625px] mx-auto mt-[15px]">
                <Combo isCanDelete={isCanDelete} comboEx={combo} handleComboClickEx={handleComboClick} combo_list={timeDetail && timeDetail.length != 0 && checkCombo(timeDetail, dayjs(dateFrom).format('DD/MM/YYYY'), dayjs(dateTo).format('DD/MM/YYYY'))}></Combo>
            </div>
            <div className="flex max-w-3xl mx-auto justify-between mb-[20px]">
                <div className="text-center font-dejavu text-white bg-[#8f7a5a] p-2 rounded-[10px] w-[200px]">
                    <p className="font-semibold">Nhận phòng</p>
                    <p className="text-[14px]">{dayjs(dateFrom).format('DD/MM/YYYY')}</p>
                </div>
                <div className="text-center font-dejavu text-white bg-[#8f7a5a] p-2 rounded-[10px] w-[200px]">
                    <p className="font-semibold">Trả phòng</p>
                    <p className="text-[14px]">{dayjs(dateTo).format('DD/MM/YYYY')}</p>
                </div>
            </div>
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
                                    'selected': ((startTime != null && startTime <= index && index <= endTime + timeAdd) || (startTime === index)),
                                    'disabled': timeDisableFrom.some(subArr => subArr.includes(index)),
                                    'clean': timeDisableFrom.some(subArr => subArr.slice(-1).includes(index)) || timeDisableFrom.some(subArr => subArr.slice(0, 1).includes(index))
                                })}
                                onClick={() => handleSlotClick(index)}
                            >
                                {time == '24:00' ? '23:30' : time}
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
                                        'selected': ((startTime != null && startTime <= (index + 48) && (index + 48) <= endTime + timeAdd) || (startTime === (index + 48))),
                                        'disabled': timeDisableTo.some(subArr => subArr.includes(index + 48)),
                                        'clean': timeDisableTo.some(subArr => subArr.slice(-1).includes(index + 48)) || timeDisableTo.some(subArr => subArr.slice(0, 1).includes(index + 48))
                                    })}
                                    onClick={() => handleSlotClick(index + 48)}
                                >
                                    {time == '24:00' ? '23:30' : time}
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
            <div className="mt-[40px] relative mb-[20px]">
                <div className="absolute w-fit text-nowrap top-[-18px] left-[50%] translate-x-[-50%] bg-[#8f7a5a] p-[8px] text-white font-semibold rounded-[10px]">
                    <p><span>{TYPE_DETAIL_ROOM[room?.type]}: </span><span>{room?.code} (</span><span>{room?.name}</span>)</p>
                </div>
                <div className="w-[500px] border-[1px] border-black rounded-[10px] mx-auto px-[40px] pt-[30px] py-[8px]">
                    <div className="flex gap-[40px]">
                        <div className="font-semibold">
                            <p>NHẬN HOME:</p>
                            <p>TRẢ HOME:</p>
                            <p>THỜI GIAN LƯU TRÚ:</p>
                            <p>SỐ LƯỢNG KHÁCH:</p>
                            <p>THÀNH TIỀN:</p>
                            <p>SỐ ĐIỂM TÍCH LUỸ:</p>
                        </div>
                        {startTime && endTime && <div>
                            <p>{times[startTime >= 48 ? startTime - 48 : startTime]} giờ, ngày {startTime < 48 ? dayjs(dateFrom).format('DD/MM/YYYY') : dayjs(dateTo).format('DD/MM/YYYY')}</p>
                            <p>{times[endTime >= 48 ? endTime - 48 : endTime]} giờ, ngày {endTime < 48 ? dayjs(dateFrom).format('DD/MM/YYYY') : dayjs(dateTo).format('DD/MM/YYYY')}</p>
                            <p>{combo ? (timeAdd ? `${combo.name} + ${timeAdd / 2} tiếng` : `${combo.name}`) : `${(endTime - startTime) / 2} tiếng`}</p>
                            <div onClick={handleClick} className="cursor-pointer border-[1px] border-black rounded-[5px] p-[1px_30px_1px_20px] bg-[#e5e1e1] w-fit relative">
                                <p>{guest}</p>
                                <div className="rectangle-down absolute right-[3px] top-[50%] translate-y-[-50%] border-l-[10px] border-r-[10px] border-t-[13px]"></div>
                            </div>
                            <StyledMenu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <div className='flex gap-[30px] p-[20px]'>
                                    <p>Khách</p>
                                    <div className='flex items-center gap-[10px]'>
                                        <div className='cursor-pointer h-[30px] w-[30px] rounded-[50%] border-[1px] border-[#000] flex justify-center items-center' onClick={() => setGuest(prev => prev == 1 ? 1 : prev - 1)}>-</div>
                                        <p>{guest}</p>
                                        <p className='cursor-pointer h-[30px] w-[30px] rounded-[50%] border-[1px] border-[#000] flex justify-center items-center' onClick={() => setGuest(prev => prev + 1)}>+</p>
                                    </div>
                                </div>
                            </StyledMenu>
                            <p>{formatCash(calPrice({ startTime, endTime, combo, addTime: timeAdd, guest, diff: dateTo.diff(dateFrom, 'day') }))} đồng</p>
                            <p>14 điểm</p>
                        </div>}
                    </div>
                    <div className="cursor-pointer bg-[#8f7a5a] p-[2px_16px_3px_16px] text-white font-semibold w-fit ml-auto rounded-[15px]">Đặt ngay</div>
                </div>
            </div>
        </div>

    );
};

export default TimeGrid;

//Hàm check khi chọn time
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

const checkCombo = (timeDetail, dateFrom, dateTo) => {
    const diff = moment(dateTo, 'DD/MM/YYYY').diff(moment(dateFrom, 'DD/MM/YYYY'), 'day')
    const checkDateFrom = timeDetail.find(item => item && item.date == dateFrom)
    const checkDateTo = timeDetail.find(item => item && item.date == dateTo)

    if (diff > 1) {
        return COMBO_LIST.map(item => ({ ...item, disabled: true }))
    }
    if (diff == 0) {
        return COMBO_LIST.map(item => {
            const checkIsDisable = checkDateFrom ? checkDateFrom.booking.map(book => {
                return item.inday == 1 && isTimeOverlap(
                    moment(item.time[0], 'HH:mm').subtract(1, 'hour').format('HH:mm'),
                    moment(item.time[1], 'HH:mm').add(1, 'hour').format('HH:mm'),
                    book.from,
                    book.to
                )
            }) : [false]

            return {
                ...item,
                disabled: item.inday == 0 ? true : checkIsDisable.some(s => s == true)
            }
        })
    }
    if (!checkDateFrom && !checkDateTo) {
        return COMBO_LIST.map(item => ({ ...item, disabled: diff == 1 && item.inday == 1 ? true : false }))
    }
    if (checkDateFrom && !checkDateTo && diff == 1) {
        return COMBO_LIST.map(item => {
            const checkIsDisable = checkDateFrom.booking.map(book => {
                return item.inday == 1 ? isTimeOverlap(
                    moment(item.time[0], 'HH:mm').subtract(1, 'hour').format('HH:mm'),
                    moment(item.time[1], 'HH:mm').add(1, 'hour').format('HH:mm'),
                    book.from,
                    book.to
                ) : isTimeOverlap(
                    moment(item.time[0], 'HH:mm').subtract(1, 'hour').format('HH:mm'),
                    '24:00',
                    book.from,
                    book.to
                )
            })

            return {
                ...item,
                disabled: checkIsDisable.some(s => s == true)
            }
        })
    }

    if (checkDateFrom && checkDateTo) {
        return COMBO_LIST.map(item => {
            const checkIsDisable = checkDateFrom.booking.map(book => {
                const isDisableFrom = item.inday == 1 ? isTimeOverlap(
                    moment(item.time[0], 'HH:mm').subtract(1, 'hour').format('HH:mm'),
                    moment(item.time[1], 'HH:mm').add(1, 'hour').format('HH:mm'),
                    book.from,
                    book.to
                ) : isTimeOverlap(
                    moment(item.time[0], 'HH:mm').subtract(1, 'hour').format('HH:mm'),
                    '24:00',
                    book.from,
                    book.to
                )

                const isDisableTo = checkDateTo.booking.map(bookTo => isTimeOverlap(
                    '00:00',
                    moment(item.time[1], 'HH:mm').add(1, 'hour').format('HH:mm'),
                    bookTo.from,
                    bookTo.to
                )).some(e => e == true)

                return isDisableTo || isDisableFrom
            })

            return {
                ...item,
                disabled: diff == 1 && item.inday == 1 ? true : checkIsDisable.some(s => s == true)
            }
        })
    }
    if (!checkDateFrom && checkDateTo) {
        return COMBO_LIST.map(item => {
            const checkIsDisable = checkDateTo.booking.map(book => {
                return isTimeOverlap(
                    '00:00',
                    moment(item.time[1], 'HH:mm').add(1, 'hour').format('HH:mm'),
                    book.from,
                    book.to
                )
            })

            return {
                ...item,
                disabled: item.inday == 1 && diff == 1 ? true : checkIsDisable.some(s => s == true)
            }
        })
    }
}

const isTimeOverlap = (startTime1, endTime1, startTime2, endTime2) => {
    // Chuyển đổi thời gian thành số phút từ đầu ngày để dễ so sánh
    const convertToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const start1 = convertToMinutes(startTime1);
    const end1 = convertToMinutes(endTime1);
    const start2 = convertToMinutes(startTime2);
    const end2 = convertToMinutes(endTime2);

    // Kiểm tra khoảng thời gian thứ hai có nằm trong khoảng thời gian thứ nhất hay không
    return (start2 >= start1 && start2 < end1) || (end2 > start1 && end2 <= end1) || (start2 <= start1 && end2 >= end1);
}

//Tính giá
const calPrice = (value: {
    startTime?: number,
    endTime?: number,
    combo?: any,
    addTime?: number,
    guest?: number,
    diff?: number
}) => {
    const priceGuest = (value.guest > 2 ? (value.guest - 2) * 80000 : 0)
    if (!value?.combo) {
        return 350000 + ((value.endTime - value.startTime) / 2 - 2) * 60000 + priceGuest
    }
    if(value.diff > 1 && value.combo.name == 'COMBO 1'){
        return value.combo.price * value.diff + priceGuest
    }
    return value.combo.price + (value.addTime / 2) * 60000 + priceGuest
}
