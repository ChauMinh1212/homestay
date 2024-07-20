import { LocationOnOutlined, Search, SupervisorAccountOutlined } from '@mui/icons-material';
import { DateRange } from '@mui/lab';
import { IconButton, Menu } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import DateRangePickerWithButtonField from '../DateRangePicker/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs'
import SnackBarContext from '~/contexts/SnackBarContext';
import axiosInstance from '~/axios/axiosConfig';

const districtArr = ['Quận 3', 'Quận 10', 'Quận 2']

const DateTimeBooking = ({setRoomValid}) => {
    const [countGuest, setCountGuest] = useState(1)
    const [selectItem, setSelectItem] = useState<number>(null)
    const [district, setDistrict] = useState<number | null>(null)
    const [dateDisplay, setDateDisplay] = useState<DateRange<Dayjs>>([dayjs(), dayjs().add(1, 'day')])
    const { snackBar, setSnackBar } = useContext(SnackBarContext)

    const getAllRoom = async () => {
        try {
            const res = await axiosInstance.get(`room`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const getRoomValid = () => {
        try {
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        (async () => {
            const room = await getAllRoom()
            setRoomValid(room)
        })();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(district == null){
            setSnackBar({
                ...snackBar,
                open: true,
                message: 'Vui lòng chọn điểm đến!!!',
                status: 'error'
            })
        }
        // handleFormSubmit({district, countGuest, dateDisplay})
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

    const handleSetDistrict = (num: number) => {
        setDistrict(num)
        handleCloseLocation()
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto flex justify-center rounded-[50px] border-[2px] max-w-[930px] overflow-hidden md:flex-col" style={{ backgroundColor: selectItem ? '#E5E1E1' : '#fff' }}>
                <div onClick={(e) => { setSelectItem(1); handleClickLocation(e) }} className='cursor-pointer relative flex basis-1/4 items-center gap-[10px] px-[10px] py-[20px] after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]' style={selectItem == 1 ? { backgroundColor: '#fff', borderRadius: '50px' } : { backgroundColor: 'transparent' }}>
                    <div>
                        <LocationOnOutlined className='!text-[30px]'></LocationOnOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Điểm đến</p>
                        <p className='text-[14px] text-[#0000008c]'>{district == null ? 'Bạn muốn đi đâu?' : districtArr[district]}</p>
                    </div>
                </div>
                <Menu
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
                            <div onClick={() => handleSetDistrict(0)} className='flex justify-center items-center w-[100px] h-[100px] bg-[#E5E1E1] rounded-[30px] font-semibold cursor-pointer'>
                                <p>Quận 3</p>
                            </div>
                            <div onClick={() => handleSetDistrict(1)} className='flex justify-center items-center w-[100px] h-[100px] bg-[#E5E1E1] rounded-[30px] font-semibold cursor-pointer'>
                                <p>Quận 10</p>
                            </div>
                            <div onClick={() => handleSetDistrict(2)} className='flex justify-center items-center w-[100px] h-[100px] bg-[#E5E1E1] rounded-[30px] font-semibold cursor-pointer'>
                                <p>Quận 2</p>
                            </div>
                        </div>
                    </div>
                </Menu>
                <div className='flex-1 flex justify-center' onClick={() => setSelectItem(2)}>
                    <DateRangePickerWithButtonField selectItem={selectItem} setDateDisplay={setDateDisplay}/>
                </div>
                <div onClick={(e) => { setSelectItem(4); handleClick(e) }} className='cursor-pointer flex basis-1/5 items-center gap-[10px] px-[10px] py-[20px]' style={selectItem == 4 ? { backgroundColor: '#fff', borderRadius: '50px' } : { backgroundColor: 'transparent' }}>
                    <div>
                        <SupervisorAccountOutlined className='!text-[30px]'></SupervisorAccountOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Khách</p>
                        <p className='text-[14px] text-[#0000008c]'>{countGuest} khách</p>
                    </div>

                </div>
                <Menu
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
                </Menu>
                <div className='flex items-center justify-center p-[20px] md:bg-primary'>
                    <IconButton type='submit' className='!bg-primary'>
                        <Search className='text-white !text-[30px]' />
                    </IconButton>
                </div>
            </form>
        </>
    );
};

export default DateTimeBooking;
