import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DateRange, DateRangeCalendar, LicenseInfo } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import './NewDateRangePicker.css'

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');


const combo = [
    { name: 'COMBO 1', time: '14:00 - 12:00 hôm sau' },
    { name: 'COMBO 1', time: '14:00 - 12:00 hôm sau' },
    { name: 'COMBO 1', time: '14:00 - 12:00 hôm sau' },
    { name: 'COMBO 1', time: '14:00 - 12:00 hôm sau' },
    { name: 'COMBO 1', time: '14:00 - 12:00 hôm sau' },
    { name: 'COMBO 1', time: '14:00 - 12:00 hôm sau' },
]

const NewDateRangePicker = ({ setDateDisplay }) => {
    // const [selectedTab, setSelectedTab] = useState(0)
    const [value, setValue] = useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
    const [time, setTime] = useState([])

    const handleChangeDate = (value) => {
        setValue(value)
        if (!value[1]) {
            setDateDisplay([value[0], value[0]])
        }
        else {
            setDateDisplay(value)
        }
    }

    return (
        <div>
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
                        <DateRangeCalendar disablePast value={value} onChange={handleChangeDate} />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div className="flex">
                <div className="flex-1 flex items-center px-[20px] gap-[10px]">
                    <p className="font-semibold">Từ:</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker minutesStep={30} ampm={false} />
                    </LocalizationProvider>
                </div>
                <div className="flex-1 flex items-center px-[20px] gap-[10px]">
                    <p className="font-semibold">Đến:</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker minutesStep={30} ampm={false} />
                    </LocalizationProvider>
                </div>
            </div>
            <div>
                <div className="flex border-[1px] border-black rounded-[20px]">
                    <div className="flex-1 border-r-[1px] border-r-black px-[20px] py-[10px] flex justify-between items-center">
                        <p className="font-semibold text-[14px]">COMBO</p>
                        <div className="rectangle-down"></div>
                    </div>
                    <div className="flex-1 px-[20px] py-[10px] text-right flex justify-center items-center">
                        <p className="font-semibold text-[14px]">THỜI GIAN</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewDateRangePicker