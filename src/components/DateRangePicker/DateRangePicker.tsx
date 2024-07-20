import { CalendarMonthOutlined } from '@mui/icons-material';
import useForkRef from '@mui/utils/useForkRef';
import { LicenseInfo } from '@mui/x-date-pickers-pro';
import {
    DateRangePicker,
    DateRangePickerProps
} from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange, FieldType } from '@mui/x-date-pickers-pro/models';
import { SingleInputDateRangeFieldProps } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi'
import * as React from 'react';
import './DateRangePicker.css';

const week = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

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

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');
interface DateRangeButtonFieldProps extends SingleInputDateRangeFieldProps<Dayjs> {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    dateDisplay?: DateRange<Dayjs>;
    selectItem?: number
}

type DateRangeButtonFieldComponent = ((
    props: DateRangeButtonFieldProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { fieldType?: FieldType };

const DateRangeButtonField = React.forwardRef(
    (props: DateRangeButtonFieldProps, ref: React.Ref<HTMLElement>) => {
        const {
            setOpen,
            id,
            InputProps: { ref: containerRef } = {},
            inputProps: { 'aria-label': ariaLabel } = {},
            dateDisplay,
            selectItem
        } = props;

        const handleRef = useForkRef(ref, containerRef);

        return (
            <div onClick={() => setOpen?.((prev) => !prev)} ref={handleRef} className='flex-1 flex justify-center' id={id} style={selectItem == 2 ? { backgroundColor: '#fff', borderRadius: '50px' } : { backgroundColor: 'transparent' }}>
                <div className='cursor-pointer flex flex-1 items-center gap-[10px] px-[10px] py-[20px] relative after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]'>
                    <div>
                        <CalendarMonthOutlined className='!text-[30px]'></CalendarMonthOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Nhận phòng</p>
                        <p className='text-[14px] text-[#0000008c]'>{dayjs(dateDisplay[0]).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
                <div className='cursor-pointer flex flex-1 items-center gap-[10px] px-[10px] py-[20px] relative after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]'>
                    <div>
                        <CalendarMonthOutlined className='!text-[30px]'></CalendarMonthOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Trả phòng</p>
                        <p className='text-[14px] text-[#0000008c]'>{dayjs(dateDisplay[1]).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
            </div>
        );
    },
) as DateRangeButtonFieldComponent;

DateRangeButtonField.fieldType = 'single-input';

const ButtonDateRangePicker = React.forwardRef(
    (
        props: Omit<DateRangePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'> & { selectItem?: number, setDateDisplay1: any },
        ref: React.Ref<HTMLDivElement>,
    ) => {
        const setDisplay1 = props.setDateDisplay1

        const [open, setOpen] = React.useState(false);
        const [value, setValue] = React.useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
        const [dateDisplay, setDateDisplay] = React.useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
        const handleChangeDate = (newValue) => {
            if (newValue[1]) {
                setDateDisplay(newValue)
                setDisplay1(newValue)
            }
            setValue(newValue)
        }
        const selectItem = props.selectItem

        return (
            <DateRangePicker
                slots={{ field: DateRangeButtonField, ...props.slots }}
                slotProps={{ field: { setOpen, dateDisplay, selectItem } as any }}
                ref={ref}
                {...props}
                open={open}
                value={value}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                onChange={handleChangeDate}
                dayOfWeekFormatter={(date) => week[dayjs(date).day()]}
            />
        );
    },
);

export default function DateRangePickerWithButtonField({ selectItem, setDateDisplay }) {
    const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ButtonDateRangePicker
                label={
                    value[0] === null && value[1] === null
                        ? null
                        : value
                            .map((date) => (date ? date.format('MM/DD/YYYY') : 'null'))
                            .join(' - ')
                }
                value={value}
                onChange={(newValue) => setValue(newValue)}
                selectItem={selectItem}
                setDateDisplay1={setDateDisplay}
            />
        </LocalizationProvider>
    );
}
