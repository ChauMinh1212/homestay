import styled from "@emotion/styled";
import { Menu } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DateRange, DateRangeCalendar, LicenseInfo } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/vi'
import { useState } from "react";
import './NewDateRangePicker.css'

dayjs.locale('vi', {
    name: 'vi',
    weekdays: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    months: ['Tháng 1 năm', 'Tháng 2 năm', 'Tháng 3 năm', 'Tháng 4 năm', 'Tháng 5 năm', 'Tháng 6 năm', 'Tháng 7 năm', 'Tháng 8 năm', 'Tháng 9 năm', 'Tháng 10 năm', 'Tháng 11 năm', 'Tháng 12 năm'],
    monthsShort: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
    ordinal: (n) => `${n}`,
    formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    }
})

const week = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

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

const NewDateRangePicker = ({ setDateDisplay, setTimeDisplay }) => {
    // const [selectedTab, setSelectedTab] = useState(0)
    const [value, setValue] = useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
    const [time, setTime] = useState([dayjs().set('hour', 14).set('minute', 0), dayjs().set('hour', 12).set('minute', 0)])
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
        }
        else {
            setDateDisplay(value)
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
            {/* <div className="flex justify-center bg-[#E5E1E1] w-fit mx-auto rounded-[30px] px-[10px] py-[5px]">
                <div className="font-semibold py-[20px] px-[30px] cursor-pointer" onClick={() => {setSelectedTab(0)}} style={selectedTab == 0 ? {backgroundColor: '#fff', borderRadius: '100px'} : {backgroundColor: 'transparent'}}>
                    Ngày
                </div>
                <div className="font-semibold py-[20px] px-[30px] cursor-pointer" onClick={() => {setSelectedTab(1)}} style={selectedTab == 1 ? {backgroundColor: '#fff', borderRadius: '100px'} : {backgroundColor: 'transparent'}}>
                    Theo giờ
                </div>
            </div>
            <div>
                {selectedTab == 0 && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateRangeCalendar']}>
                            <DateRangeCalendar />
                        </DemoContainer>
                    </LocalizationProvider>
                )}
            </div> */}
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangeCalendar']}>
                        <DateRangeCalendar disablePast value={value} onChange={handleChangeDate} dayOfWeekFormatter={(date) => week[dayjs(date).day()]} />
                    </DemoContainer>
                </LocalizationProvider>
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