import styled from '@emotion/styled';
import { CalendarMonthOutlined, LocationOnOutlined, Search, SupervisorAccountOutlined } from '@mui/icons-material';
import { DateRange } from '@mui/lab';
import { IconButton, Menu } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import axiosInstance from '~/axios/axiosConfig';
import SnackBarContext from '~/contexts/SnackBarContext';
import NewDateRangePicker from '../NewDateRangePicker/NewDateRangPicker';

const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 0
  }
  .MuiPaper-root {
    border-radius: 10px
  }
`;

interface IDistrict {
    id: number
    name: string
}

const DateTimeBooking = ({ setRoomValid, setLoading }) => {
    const [countGuest, setCountGuest] = useState(1)
    const [selectItem, setSelectItem] = useState<number>(null)
    const [district, setDistrict] = useState<IDistrict | null>(null)
    const [districtValid, setDistrictValid] = useState([])
    const [dateDisplay, setDateDisplay] = useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
    const { snackBar, setSnackBar } = useContext(SnackBarContext)
    const [time, setTime] = useState([dayjs().set('hour', 14).set('minute', 0), dayjs().set('hour', 12).set('minute', 0)])

    const getAllRoom = async () => {
        try {
            const res = await axiosInstance.get(`room`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const getDistrictValid = async () => {
        try {
            const res = await axiosInstance.get(`district`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const getRoomValid = async (query: { district_id: number, dateDisplay: DateRange<Dayjs>, countGuest: number }) => {
        try {
            const from = dayjs(dateDisplay[0]['$d']).format('YYYY-MM-DD')
            const to = dayjs(dateDisplay[1]['$d']).format('YYYY-MM-DD')
            const timeFrom = dayjs(time[0]).format('H:mm')
            const timeTo = dayjs(time[1]).format('H:mm')
            const res = await axiosInstance.get(`room/valid?from=${from}&to=${to}&district_id=${query.district_id}&capacity=${countGuest}&timeFrom=${timeFrom}&timeTo=${timeTo}`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const [room, district] = await Promise.all([getAllRoom(), getDistrictValid()])
            setRoomValid(room)
            setDistrictValid(district)
            setLoading(false)
        })();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (district == null) {
            setSnackBar({
                ...snackBar,
                open: true,
                message: 'Vui lòng chọn điểm đến!!!',
                status: 'error'
            })
        }
        setLoading(true)
        const room = await getRoomValid({ district_id: district.id, dateDisplay, countGuest })
        setRoomValid(room)
        setLoading(false)
    }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorElLocation, setAnchorElLocation] = useState<null | HTMLElement>(null);
    const openLocation = Boolean(anchorElLocation);
    const handleClickLocation = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorElLocation(event.currentTarget);
    };
    const handleCloseLocation = () => {
        setAnchorElLocation(null);
    };

    const handleSetDistrict = (district: IDistrict) => {
        setDistrict(district)
        handleCloseLocation()
    }

    const [anchorElCalender, setAnchorElCalender] = useState<null | HTMLElement>(null);
    const openCalender = Boolean(anchorElCalender);
    const handleClickCalender = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorElCalender(event.currentTarget);
    };
    const handleCloseCalender = () => {
        setAnchorElCalender(null);
    };

    return (
        <div className='px-[20px]'>
            <form onSubmit={handleSubmit} className="mx-auto flex justify-center rounded-[50px] border-[2px] max-w-[930px] overflow-hidden md:flex-col" style={{ backgroundColor: selectItem ? '#E5E1E1' : '#fff' }}>
                <div onClick={(e) => { setSelectItem(1); handleClickLocation(e) }} className='rounded-[50px] cursor-pointer relative flex basis-1/4 items-center gap-[10px] px-[10px] py-[20px] after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px] hover:!bg-[#f0efef]' style={selectItem == 1 ? { backgroundColor: '#fff' } : { backgroundColor: 'transparent' }}>
                    <div>
                        <LocationOnOutlined className='!text-[30px]'></LocationOnOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Điểm đến</p>
                        <p className='text-[14px] text-[#0000008c]'>{district == null ? 'Bạn muốn đi đâu?' : district.name}</p>
                    </div>
                </div>
                <StyledMenu
                    id="location-menu"
                    anchorEl={anchorElLocation}
                    open={openLocation}
                    onClose={handleCloseLocation}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <div className='p-[20px]'>
                        <p className='mb-[20px] font-semibold'>Tìm kiếm theo khu vực</p>
                        <div className='flex gap-[10px]'>
                            {districtValid.map(item => (
                                <div key={item.id} onClick={() => handleSetDistrict(item)} className='flex justify-center items-center w-[100px] h-[100px] bg-[#E5E1E1] rounded-[30px] font-semibold cursor-pointer'>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </StyledMenu>
                <div className='flex-1 flex justify-center hover:!bg-[#f0efef] rounded-[50px]' onClick={(e) => { setSelectItem(2); handleClickCalender(e) }}>
                    <div className='flex-1 flex justify-center' style={selectItem == 2 ? { backgroundColor: '#fff', borderRadius: '50px' } : { backgroundColor: 'transparent' }}>
                        <div className='cursor-pointer flex flex-1 items-center gap-[10px] px-[10px] py-[20px] relative after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]'>
                            <div>
                                <CalendarMonthOutlined className='!text-[30px]'></CalendarMonthOutlined>
                            </div>
                            <div className='flex-1 pb-[5px]'>
                                <p>Nhận phòng</p>
                                <p className='text-[14px] text-[#0000008c]'>{`${dayjs(dateDisplay[0]).format('DD-MM-YYYY')} ${dayjs(time[0]).format('HH:mm')}`}</p>
                            </div>
                        </div>
                        <div className='cursor-pointer flex flex-1 items-center gap-[10px] px-[10px] py-[20px] relative after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]'>
                            <div>
                                <CalendarMonthOutlined className='!text-[30px]'></CalendarMonthOutlined>
                            </div>
                            <div className='flex-1 pb-[5px]'>
                                <p>Trả phòng</p>
                                <p className='text-[14px] text-[#0000008c]'>{`${dayjs(dateDisplay[1]).format('DD-MM-YYYY')} ${dayjs(time[1]).format('HH:mm')}`}</p>
                            </div>
                        </div>
                    </div>
                    {/* <DateRangePickerWithButtonField selectItem={selectItem} setDateDisplay={setDateDisplay} /> */}
                </div>
                <StyledMenu
                    id="calender-menu"
                    anchorEl={anchorElCalender}
                    open={openCalender}
                    onClose={handleCloseCalender}
                >
                    <NewDateRangePicker dateDisplay={dateDisplay} setDateDisplay={setDateDisplay} timeDisplay={time} setTimeDisplay={setTime}></NewDateRangePicker>
                </StyledMenu>
                <div onClick={(e) => { setSelectItem(4); handleClick(e) }} className='rounded-[50px] cursor-pointer flex basis-1/5 items-center gap-[10px] px-[10px] py-[20px] hover:!bg-[#f0efef]' style={selectItem == 4 ? { backgroundColor: '#fff' } : { backgroundColor: 'transparent' }}>
                    <div>
                        <SupervisorAccountOutlined className='!text-[30px]'></SupervisorAccountOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Khách</p>
                        <p className='text-[14px] text-[#0000008c]'>{countGuest} khách</p>
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
                    <div className='flex gap-[30px] p-[20px]'>
                        <p>Khách</p>
                        <div className='flex items-center gap-[10px]'>
                            <div className='cursor-pointer h-[30px] w-[30px] rounded-[50%] border-[1px] border-[#000] flex justify-center items-center' onClick={() => setCountGuest(prev => prev == 1 ? 1 : prev - 1)}>-</div>
                            <p>{countGuest}</p>
                            <p className='cursor-pointer h-[30px] w-[30px] rounded-[50%] border-[1px] border-[#000] flex justify-center items-center' onClick={() => setCountGuest(prev => prev + 1)}>+</p>
                        </div>
                    </div>
                </StyledMenu>
                <div className='flex items-center justify-center p-[20px] md:bg-primary md:h-[55px]'>
                    <IconButton type='submit' className='!bg-primary'>
                        <Search className='text-white !text-[30px]' />
                    </IconButton>
                </div>
            </form>
        </div>
    );
};

export default DateTimeBooking;
