import { Skeleton } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import axiosInstance from '~/axios/axiosConfig'
import Booking from '~/components/Booking/Booking'
import Logo from '~/components/Logo/Logo'
import ListRoom from '~/components/Room/ListRoom'
import CalendarC from '../../components/Calendar/Calendar'
import './HomestayPage.css'
import DateTimeBooking from '~/components/DateTimeBooking/DateTimeBooking'

interface IBooking {
    id: number
    code: string
    from: string
    to: string
    quantity: number
}

export interface IRoomData {
    id?: number
    code: string
    name: string
    address: string
    price: string
    description: string
    color: string
    quantity: number
    capacity: number
    img?: string[]
}

const HomestayPage = () => {
    const [value, setValue] = useState(2)
    const [openModalBooking, setOpenModalBooking] = useState(false)
    const [infoBooking, setInfoBooking] = useState<IBooking>(null)
    const [date, setDate] = useState([moment().format('YYYY/MM/DD'), moment().add(1, 'day').format('YYYY/MM/DD')])
    const [afterBooking, setAfterBooking] = useState(false)
    const [loading, setLoading] = useState(false)
    const [roomValid, setRoomValid] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const room = await axiosInstance.get(`room/valid?from=${date[0]}&to=${date[1]}&capacity=${value}`);
            setRoomValid(room.data)
            setLoading(false)

        })();
    }, [date, value, afterBooking])

    const handleOnChange = (e) => {
        const input = e.target.value
        if (input > 10) {
            setValue(10)
        } else if (input < 0 || !input) {
            setValue(0)
        }
        else {
            setValue(input)
        }
    }

    const handleCalenderChange = (date: string[]) => {
        setDate(date);
    }

    const handleCloseBooking = () => {
        setOpenModalBooking(false)
    }

    const handleClickSlide = (info: IBooking) => {
        setInfoBooking({
            id: info.id,
            code: info.code,
            from: date[0],
            to: date[1],
            quantity: value
        })
        setOpenModalBooking(true)
    }

    const handleAfterBooking = () => {
        setAfterBooking(!afterBooking)
    }

    

    return (
        <div className="">
            <Booking onClose={handleCloseBooking} open={openModalBooking} infoBooking={infoBooking} afterBooking={handleAfterBooking} ></Booking>
            
            {/* <Logo></Logo>
            <div className="flex gap-[10px]">
                <div className="bg-[#E5E1E1] p-[20px]">
                    <CalendarC onCalenderChange={handleCalenderChange}></CalendarC>
                </div>
                <div className="bg-[#E5E1E1] p-[20px] overflow-hidden flex-1">
                    <div className="">
                        <span className="font-semibold mr-[10px]">Số lượng người ở:</span>
                        <input min={1} max={10} className="pl-[23px] rounded-[20px]" type="number" onChange={(e) => handleOnChange(e)} value={value} />
                    </div>
                    <div className="">
                        <p className="uppercase font-semibold mb-[67px]">Available:</p>
                        {!loading
                            ? (
                                roomValid.length > 0 ?
                                    <Swiper
                                        loop={true}
                                        navigation={true}
                                        modules={[Navigation]}
                                        slidesPerView={5}
                                        spaceBetween={20}
                                    >
                                        {roomValid.map((item, index) => (
                                            <SwiperSlide key={index} onClick={() => handleClickSlide(item)} className="cursor-pointer">
                                                <div className="pt-[100%] rounded-[20px] bg-cover mb-[20px] border-[7px] border-primary" style={{ backgroundImage: `url('${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item.img[0]}')` }}></div>
                                                <p className="text-center text-line-[1px_#645533] text-primary text-[25px] font-primary font-[800]">{item.code}</p>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    : <p>Không có phòng trống</p>
                            ) : (
                                <div className="flex gap-[20px]">
                                    <div className="flex-1">
                                        <Skeleton variant='rectangular' className='rounded-[10px]' height={150} />
                                        <Skeleton></Skeleton>
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton variant='rectangular' className='rounded-[10px]' height={150} />
                                        <Skeleton></Skeleton>
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton variant='rectangular' className='rounded-[10px]' height={150} />
                                        <Skeleton></Skeleton>
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton variant='rectangular' className='rounded-[10px]' height={150} />
                                        <Skeleton></Skeleton>
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton variant='rectangular' className='rounded-[10px]' height={150} />
                                        <Skeleton></Skeleton>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
            <div className="text-center my-[30px]">
                <div className="p-[5px_20px] bg-primary inline-block rounded-[80px] text-[30px] font-semibold">HOMESTAY</div>
                <ListRoom></ListRoom>
            </div> */}

            <DateTimeBooking/>
            

            {/* <div className="m-[30px]">
                <div className="text-center mb-[30px]">
                    <div className="p-[5px_20px] bg-primary inline-block rounded-[80px] text-[30px] font-semibold">HOMESTAY</div>
                </div>
                <div>
                    <Swiper
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        slidesPerView={3}
                        spaceBetween={100}
                        className="p-[0px_100px]"
                    >
                        {room.filter(item => item.type != 1).map(item => (
                            <SwiperSlide className="">
                                <Swiper
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="h-[500px] rounded-[20px]  border-[7px] border-primary"
                                >
                                    <SwiperSlide>
                                        <div className="h-full bg-cover bg-center mb-[20px] flex justify-center items-center text-[70px] text-white text-line-[1px_#000] font-semibold" style={{ backgroundImage: `url(${item.img})` }}>{item.code}</div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="h-full bg-cover bg-center mb-[20px] flex justify-center items-center text-[70px] text-white text-line-[1px_#000] font-semibold" style={{ backgroundImage: `url(${item.img})` }}>{item.code}</div>
                                    </SwiperSlide>
                                </Swiper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div> */}
            {/* <div className="m-[30px]">
                <div className="text-center mb-[30px]">
                    <div className="p-[5px_20px] bg-primary inline-block rounded-[80px] text-[30px] font-semibold">APARTMENT</div>
                </div>
                <div>
                    <Swiper
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        slidesPerView={3}
                        spaceBetween={100}
                        className="p-[0px_100px]"
                    >
                        {room.filter(item => item.type == 1).map(item => (
                            <SwiperSlide className="">
                                <Swiper
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="h-[500px] rounded-[20px]  border-[7px] border-primary"
                                >
                                    <SwiperSlide>
                                        <div className="h-full bg-cover bg-center mb-[20px] flex justify-center items-center text-[70px] text-white text-line-[1px_#000] font-semibold" style={{ backgroundImage: `url(${item.img})` }}>{item.code}</div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="h-full bg-cover bg-center mb-[20px] flex justify-center items-center text-[70px] text-white text-line-[1px_#000] font-semibold" style={{ backgroundImage: `url(${item.img})` }}>{item.code}</div>
                                    </SwiperSlide>
                                </Swiper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div> */}
        </div>
    )
}

export default HomestayPage