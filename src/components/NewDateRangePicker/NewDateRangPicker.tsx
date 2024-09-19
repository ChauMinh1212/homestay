import styled from "@emotion/styled";
import { Menu } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DateRange } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/vi';
import Cookies from 'js-cookie';
import { useState } from "react";
import Calender from "../Calendar/Calendar";
import Combo from "../Combo/Combo";
import './NewDateRangePicker.css';
import { COMBO_LIST } from "~/common/contants";

const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 0;
  }
  .MuiPaper-root {
    border-radius: 10px;
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

    const handleComboClick = (time, inday) => {
        if (inday == 1) {
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
        setTime([dayjs(time[0], 'H:mm'), dayjs(time[1], 'H:mm')])
        setTimeDisplay([dayjs(time[0], 'H:mm'), dayjs(time[1], 'H:mm')])
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
            <Combo handleComboClickEx={handleComboClick} combo_list={COMBO_LIST}></Combo>
        </div>
    )
}

export default NewDateRangePicker