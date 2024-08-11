import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateRangeCalendar, LicenseInfo } from "@mui/x-date-pickers-pro"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"
import './Calendar.css'

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

const Calender = (prop) => {
  const {value, handleChangeDate, shouldDisableDate} = prop
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar']}>
        <DateRangeCalendar disablePast value={value} onChange={handleChangeDate} dayOfWeekFormatter={(date) => week[dayjs(date).day()]} shouldDisableDate={shouldDisableDate}/>
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default Calender