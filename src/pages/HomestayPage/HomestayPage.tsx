import { useState } from 'react'
import { Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Logo from '~/components/Logo/Logo'
import CalendarC from '../../components/Calendar/Calendar'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './HomestayPage.css'

const HomestayPage = () => {
    const [value, setValue] = useState(2)
    // const [roomValid, setRoomValid] = useState([])
    // const [room, setRoom] = useState()
    const room = [
        {
            id: 1,
            code: 'D3 1-1',
            name: 'LIGHT ROOM',
            img: '',
            address: '796/17 Trường Sa, P14, Q3, TPHCM',
            price: 'từ 350.000đ - 750.000đ',
            service: 'bếp, dụng cụ nấu ăn, tự động check in/check out, máy chiếu, NETFLIX, YTB',
            background: '#C8B997'
        },
        {
            id: 2,
            code: 'D3 1-2',
            name: 'WARM ROOM',
            img: '',
            address: '796/17 Trường Sa, P14, Q3, TPHCM',
            price: 'từ 350.000đ - 750.000đ',
            service: 'bếp, dụng cụ nấu ăn, tự động check in/check out, máy chiếu, NETFLIX, YTB',
            background: '#D4C7AC'
        },
        {
            id: 3,
            code: 'D3 2-1',
            name: 'GREEN ROOM',
            img: '',
            address: '796/17 Trường Sa, P14, Q3, TPHCM',
            price: 'từ 350.000đ - 750.000đ',
            service: 'bếp, dụng cụ nấu ăn, tự động check in/check out, máy chiếu, NETFLIX, YTB',
            background: '#A1D8A8'
        },
        {
            id: 4,
            code: 'D3 2-2',
            name: 'GREY ROOM',
            img: '',
            address: '796/17 Trường Sa, P14, Q3, TPHCM',
            price: 'từ 350.000đ - 750.000đ',
            service: 'bếp, dụng cụ nấu ăn, tự động check in/check out, máy chiếu, NETFLIX, YTB',
            background: '#E5E1E1'
        },
        {
            id: 5,
            code: 'D3 3-2',
            name: 'WOOD ROOM',
            img: '',
            address: '796/17 Trường Sa, P14, Q3, TPHCM',
            price: 'từ 350.000đ - 750.000đ',
            service: 'bếp, dụng cụ nấu ăn, tự động check in/check out, máy chiếu, NETFLIX, YTB',
            background: '#C8B997'
        },
        {
            id: 6,
            code: 'D10',
            name: 'APARTMENT PRIVATE WARM ROOM',
            img: '',
            address: '181 Cao Thắng, Phường 12, Q10',
            price: 'từ 500.000đ - 850.000đ',
            service: 'bếp, dụng cụ nấu ăn, tự động check in/check out, máy chiếu, NETFLIX, YTB',
            background: '#AB9D80'
        },

    ]

    const data = [
        {
            id: 1,
            name: 'D3 1-1',
            img: '/images/slide_1.jpeg'
        },
        {
            id: 2,
            name: 'D3 1-2',
            img: '/images/slide_2.jpeg'
        },
        {
            id: 3,
            name: 'D3 2-2',
            img: '/images/slide_3.jpeg'
        },
        {
            id: 4,
            name: 'D3 3-1',
            img: '/images/slide_4.jpeg'
        },
        {
            id: 5,
            name: 'D3 3-2',
            img: '/images/slide_5.jpeg'
        }
    ]

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
    return (
        <div className="pt-[30px]">
            <Logo></Logo>
            <div className="flex gap-[10px]">
                <div className="bg-[#E5E1E1] p-[20px]">

                    <CalendarC></CalendarC>
                </div>
                <div className="bg-[#E5E1E1] p-[20px] overflow-hidden flex-1">
                    <div className="">
                        <span className="font-semibold">Số lượng người ở: </span>
                        <input min={0} max={10} type="number" onChange={(e) => handleOnChange(e)} value={value} />
                    </div>
                    <div className="">
                        <p className="uppercase font-semibold mb-[67px]">Available:</p>
                        {data.length < 6 ?
                            <div className="flex gap-[20px]">
                                {data.map(item => (
                                    <div key={item.id} className="w-[20%]">
                                        <div className="pt-[100%] rounded-[20px] bg-cover mb-[20px] border-[7px] border-primary" style={{ backgroundImage: `url(${item.img})` }}></div>
                                        <p className="text-center text-line-[1px_#645533] text-primary text-[25px] font-primary font-[800]">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                            :
                            <Swiper
                                loop={true}
                                navigation={true}
                                modules={[Navigation]}
                                slidesPerView={5}
                                spaceBetween={20}
                            >
                                {data.map(item => (
                                    <SwiperSlide>
                                        <div className="pt-[100%] rounded-[20px] bg-cover mb-[20px] border-[7px] border-primary" style={{ backgroundImage: `url(${item.img})` }}></div>
                                        <p className="text-center text-line-[1px_#645533] text-primary text-[25px] font-primary font-[800]">{item.name}</p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        }
                    </div>

                </div>
            </div>
            {/* <div className="flex flex-col gap-[20px] max-w-7xl mx-auto my-[40px]">
                {room.map(item => (
                    <div className="rounded-[30px] flex items-center p-[10px] gap-[20px]" style={{backgroundColor: `${item.background}`}}>
                        <div className="w-[30%] rounded-[30px] overflow-hidden relative">
                            <div className="pt-[100%] bg-cover" style={{backgroundImage: `url('/images/slide_${item.id}.jpeg')`}}></div>
                            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-[900] text-[100px] text-nowrap text-line-[2px_#645533]">{item.code}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[30px] font-[600]">{item.name}</p>
                            <p className="text-[20px] mt-[15px]"><span className="font-bold">Địa chỉ: </span>{item.address}</p>
                            <p className="text-[20px] mt-[15px]"><span className="font-bold">Giá: </span>{item.price}</p>
                            <p className="text-[20px] mt-[15px]"><span className="font-bold">Dịch vụ: </span>{item.service}</p>
                        </div>
                    </div>
                ))}
            </div> */}
            <div className="m-[30px]">
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
                        {data.map(item => (
                            <SwiperSlide className="">
                                {/* <div className="h-[500px] rounded-[20px] bg-cover bg-center mb-[20px] border-[7px] border-primary flex justify-center items-center text-[70px] text-white text-line-[1px_#000] font-semibold" style={{ backgroundImage: `url(${item.img})` }}>{item.name}</div> */}
                                <Swiper
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="h-[500px] rounded-[20px]  border-[7px] border-primary"
                                >
                                    <SwiperSlide>
                                        <div className="h-full bg-cover bg-center mb-[20px] flex justify-center items-center text-[70px] text-white text-line-[1px_#000] font-semibold" style={{ backgroundImage: `url(${item.img})` }}>{item.name}</div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="h-full bg-cover bg-center mb-[20px] flex justify-center items-center text-[70px] text-white text-line-[1px_#000] font-semibold" style={{ backgroundImage: `url(${item.img})` }}>{item.name}</div>
                                    </SwiperSlide>
                                </Swiper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default HomestayPage