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

    const handleCloseBooking = () => {
        setOpenModalBooking(false)
    }

    const handleAfterBooking = () => {
        setAfterBooking(!afterBooking)
    }

    return (
        <div className="">
            {/* <Booking onClose={handleCloseBooking} open={openModalBooking} infoBooking={infoBooking} afterBooking={handleAfterBooking} ></Booking> */}

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

            <DateTimeBooking setRoomValid={setRoomValid} />

            <div className='mt-[20px]'>
                <div className="text-shadow-line text-primary text-[43px] text-center font-primary mb-[10px]">HOMESTAY SÀI GÒN</div>

                <div className="flex gap-[40px] justify-center flex-wrap">
                    {roomValid.map(item => (
                        <div className="basis-[310px]">
                        <div className="h-[400px] border-[7px] border-[#000] rounded-[80px] overflow-hidden">
                            <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item.img[0]}`} alt="" className="h-[100%]" />
                        </div>
                        <p className="font-bold text-center mt-[10px]">{item.code} ({item.district.name})</p>
                    </div>
                    ))}
                    {/* <div className="basis-[310px]">
                        <div className="h-[400px] border-[7px] border-[#000] rounded-[80px] overflow-hidden">
                            <img src="images/home_6.png" alt="" className="h-[100%]" />
                        </div>
                        <p className="font-bold text-center mt-[10px]">HOMESTAY SÀI GÒN</p>
                    </div>
                    <div className="basis-[310px]">
                        <div className="h-[400px] border-[7px] border-[#000] rounded-[80px] overflow-hidden">
                            <img src="images/home_7.png" alt="" className="h-[100%]" />
                        </div>
                        <p className="font-bold text-center mt-[10px]">HABOUR HOMESTAY</p>
                    </div>
                    <div className="basis-[310px]">
                        <div className="h-[400px] border-[7px] border-[#000] rounded-[80px] overflow-hidden">
                            <img src="images/home_8.png" alt="" className="h-[100%]" />
                        </div>
                        <p className="font-bold text-center mt-[10px]">GARDEN HOMESTAY</p>
                    </div> */}
                </div>
            </div>


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