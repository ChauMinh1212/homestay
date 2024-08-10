import styled from "@emotion/styled";
import { Menu } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DateRange, LicenseInfo } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/vi';
import { useState } from "react";
import Calender from "../Calendar/Calendar";
import './NewDateRangePicker.css';
import Cookies from 'js-cookie'

const comboList = [
    { name: 'COMBO 1', time: ['14:00', '12:00'], inday: 0 },
    { name: 'COMBO 2', time: ['14:00', '24:00'], inday: 1 },
    { name: 'COMBO 3', time: ['13:30', '19:00'], inday: 1 },
    { name: 'COMBO 4', time: ['21:00', '11:00'], inday: 0 },
    { name: 'COMBO 5', time: ['7:00', '12:00'], inday: 1 },
    { name: 'COMBO 6', time: ['8:00', '18:00'], inday: 1 },
]

const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 0;
  }
  .MuiPaper-root {
    border-radius: 10px
  }
`;

const StyledTimePicker = styled(TimePicker)`
  .MuiInputBase-root {
    height: 32px;
    background-color: #E5E1E1;
    border-radius: 20px;
  }
`;

const NewDateRangePicker = ({ setDateDisplay, setTimeDisplay, timeDisplay, dateDisplay }) => {
    const [value, setValue] = useState<DateRange<Dayjs>>(dateDisplay)
    const [time, setTime] = useState(timeDisplay)
    const [combo, setCombo] = useState(['COMBO', 'THỜI GIAN'])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeDate = (value) => {
        setValue(value)
        if (!value[1]) {
            setDateDisplay([value[0], value[0]])
            Cookies.set('date', JSON.stringify([value[0], value[0]]))
        }
        else {
            setDateDisplay(value)
            Cookies.set('date', JSON.stringify([value[0], value[1]]))
        }
    }

    const handleComboClick = (name, time, inday) => {
        if (inday == 1) {
            console.log();

            setDateDisplay(prev => {
                const newDate = [...prev]
                newDate[1] = newDate[0]
                return newDate
            })
            setValue((prev) => {
                const newDate: DateRange<Dayjs> = [...prev]
                newDate[1] = newDate[0]
                return newDate
            })
        } else {
            setDateDisplay(prev => {
                const newDate = [...prev]
                newDate[1] = dayjs(newDate[0]).add(1, 'day')
                return newDate
            })
            setValue((prev) => {
                const newDate: DateRange<Dayjs> = [...prev]
                newDate[1] = dayjs(newDate[0]).add(1, 'day')
                return newDate
            })
        }
        setCombo([name, time[0] + ' - ' + time[1] + (inday == 1 ? '' : ' hôm sau')])
        setTime([dayjs(time[0], 'H:mm'), dayjs(time[1], 'H:mm')])
        setTimeDisplay([dayjs(time[0], 'H:mm'), dayjs(time[1], 'H:mm')])
        handleClose()
    }

    return (
        <div >
            <div>
                <Calender value={value} handleChangeDate={handleChangeDate} />
            </div>
            <div className="flex mb-[10px]">
                <div className="flex-1 flex items-center px-[20px] gap-[10px]">
                    <p className="font-semibold">Từ:</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledTimePicker value={time[0]} minutesStep={30} ampm={false} onChange={(e) => {
                            setTime(prev => {
                                const newDate = [...prev]
                                newDate[0] = e
                                return newDate
                            })
                            setTimeDisplay(prev => {
                                const newDate = [...prev]
                                newDate[0] = e
                                return newDate
                            })
                        }} />
                    </LocalizationProvider>
                </div>
                <div className="flex-1 flex items-center px-[20px] gap-[10px]">
                    <p className="font-semibold">Đến:</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledTimePicker value={time[1]} minutesStep={30} ampm={false} onChange={(e) => {
                            setTime(prev => {
                                const newDate = [...prev]
                                newDate[1] = e
                                return newDate
                            })
                            setTimeDisplay(prev => {
                                const newDate = [...prev]
                                newDate[1] = e
                                return newDate
                            })
                        }} />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="w-[70%] mx-auto cursor-pointer mb-[10px]" onClick={handleClick}>
                <div className="flex border-[1px] border-black rounded-[20px]">
                    <div className="flex-1 border-r-[1px] border-r-black px-[20px] py-[10px] flex justify-between items-center">
                        <p className="font-semibold text-[14px] text-[#8f7a5a]">{combo[0]}</p>
                        <div className="rectangle-down-picker"></div>
                    </div>
                    <div className="flex-1 px-[20px] py-[10px] text-right flex justify-center items-center">
                        <p className="font-semibold text-[14px]">{combo[1]}</p>
                    </div>
                </div>
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
                <div className="w-[400px] border-t-[1px] border-l-[1px] border-r-[1px] border-black rounded-[10px]">
                    {
                        comboList.map((item, index) => (
                            <div key={index} className="flex px-[10px] py-[5px] justify-between border-b-[1px] border-b-black cursor-pointer" onClick={() => handleComboClick(item.name, item.time, item.inday)}>
                                <div className="text-[#8f7a5a] font-semibold">
                                    {item.name}
                                </div>
                                <div className="font-semibold">
                                    {item.time[0] + ' - ' + item.time[1] + (item.inday == 1 ? '' : ' hôm sau')}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </StyledMenu>
        </div>
    )
}

export default NewDateRangePicker