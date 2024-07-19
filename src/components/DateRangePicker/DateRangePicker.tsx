import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import useForkRef from '@mui/utils/useForkRef';
import { DateRange, FieldType } from '@mui/x-date-pickers-pro/models';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    DateRangePicker,
    DateRangePickerProps,
} from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeFieldProps } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { CalendarMonthOutlined } from '@mui/icons-material';
import { LicenseInfo } from '@mui/x-date-pickers-pro';

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');


interface DateRangeButtonFieldProps extends SingleInputDateRangeFieldProps<Dayjs> {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    dateDisplay?: DateRange<Dayjs>;
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
        } = props;



        const handleRef = useForkRef(ref, containerRef);

        return (
            <div onClick={() => setOpen?.((prev) => !prev)} ref={handleRef} id={id} className='flex-1 flex justify-center'>
                <div className='flex flex-1 items-center gap-[10px] px-[10px] py-[20px] relative after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]'>
                    <div>
                        <CalendarMonthOutlined className='!text-[30px]'></CalendarMonthOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Nhận phòng</p>
                        <p className='text-[14px] text-[#0000008c]'>{dayjs(dateDisplay[0]).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
                <div className='flex flex-1 items-center gap-[10px] px-[10px] py-[20px] relative after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]'>
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
        props: Omit<DateRangePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'>,
        ref: React.Ref<HTMLDivElement>,
    ) => {
        const [open, setOpen] = React.useState(false);
        const [value, setValue] = React.useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
        const [dateDisplay, setDateDisplay] = React.useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
        const handleChangeDate = (newValue) => {
            if(newValue[1]) setDateDisplay(newValue)
            setValue(newValue)
        }

        return (
            <DateRangePicker
                slots={{ field: DateRangeButtonField, ...props.slots }}
                slotProps={{ field: { setOpen, dateDisplay } as any }}
                ref={ref}
                {...props}
                open={open}
                value={value}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                onChange={handleChangeDate}
            />
        );
    },
);

export default function DateRangePickerWithButtonField() {
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
            />
        </LocalizationProvider>
    );
}
