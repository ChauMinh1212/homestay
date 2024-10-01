import { styled } from '@mui/material/styles'
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateRangeCalendar, LicenseInfo } from "@mui/x-date-pickers-pro"
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps
} from '@mui/x-date-pickers-pro/DateRangePickerDay'
import {
  PickersRangeCalendarHeader,
  PickersRangeCalendarHeaderProps
} from '@mui/x-date-pickers-pro/PickersRangeCalendarHeader'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import dayjs, { Dayjs } from "dayjs"
import './Calendar.css'

dayjs.locale('vi-custom', {
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
  const { value, handleChangeDate, availableHoursDate, disableDate } = prop

  const isDateDisabled = (date) => {
    return disableDate && disableDate.some(disabledDate => date.isSame(disabledDate, 'day'));
  };

  const shouldDisableDate = (date) => {
    if (!disableDate) return false
    // Disable bất kỳ ngày nào có trong mảng `disabledDates`
    if (isDateDisabled(date)) {
      return true;
    }

    // Nếu đã chọn ngày bắt đầu và ngày kết thúc
    if (value[0] && value[1]) {
      // Kiểm tra nếu phạm vi chứa bất kỳ ngày nào trong mảng `disabledDates`
      const isRangeDisabled = disableDate.some(disabledDate =>
        value[0].isBefore(disabledDate) && value[1].isAfter(disabledDate)
      );
      if (isRangeDisabled) {
        return true;
      }
    }

    return false;
  };

  const isAvailableHoursDate = (date) => {
    return availableHoursDate.some(dataDisable => date.isSame(dataDisable, 'day'));
  };

  const DateRangePickerDay = styled(MuiDateRangePickerDay)(
    ({
      // theme,
      // isHighlighting,
      // isStartOfHighlighting,
      // isEndOfHighlighting,
      // outsideCurrentMonth,
      day
    }) => ({
      '& .MuiButtonBase-root': {
        fontWeight: '500'
      },
      '& .MuiButtonBase-root.Mui-disabled': {
        textDecoration: 'line-through'
      },
      ...(availableHoursDate && isAvailableHoursDate(day) && {
        '& .MuiButtonBase-root': {
          color: '#8f7a5a'
        },
      })
    }),
  ) as React.ComponentType<DateRangePickerDayProps<Dayjs>>;

  const DateRangePickerHeader = styled(PickersRangeCalendarHeader)({
    '& .MuiTypography-root': {
      fontWeight: '600'
    }
  }) as React.ComponentType<PickersRangeCalendarHeaderProps<Dayjs>>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi-custom">
      <DemoContainer components={['DateRangeCalendar']}>
        <DateRangeCalendar slots={{ day: DateRangePickerDay, calendarHeader: DateRangePickerHeader }} disablePast value={value} onChange={handleChangeDate} dayOfWeekFormatter={(date) => week[dayjs(date).day()]} shouldDisableDate={shouldDisableDate} />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default Calender