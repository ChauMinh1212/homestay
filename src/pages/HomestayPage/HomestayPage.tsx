import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import DateTimeBooking from '~/components/DateTimeBooking/DateTimeBooking'
import './HomestayPage.css'

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
    const [roomValid, setRoomValid] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClickRoomDetail = (code: string, id: number) => {
        navigate(`/room/${code}/${id}`)
    }

    return (
        <div className='mt-[-20px] pt-[20px]'>
            <div className='absolute top-[-60px] md:top-[173px] right-0 left-0 z-[-1]'>
                <img src="/images/background.png" alt="" />
            </div>
            <div className="max-w-[1200px] mx-auto relative ">

                <DateTimeBooking setRoomValid={setRoomValid} setLoading={(v) => setLoading(v)} />
                {roomValid.length == 0 && !loading && (
                    <div className='py-[200px] text-center font-bold text-[20px]'>Không còn phòng trống</div>
                )}
                {roomValid.length == 0 && loading && (
                    <div className='py-[200px] text-center font-bold text-[20px]'>Loading.....</div>
                )}
                {
                    roomValid.filter(item => item.type == 0 || item.type == 1).length !== 0 && (
                        <div className='mt-[20px] px-[20px] mb-[20px]'>
                            <div className="text-shadow-line text-primary text-[43px] text-center font-primary mb-[10px] md:text-[30px]">HOMESTAY SÀI GÒN</div>

                            <div className={`flex flex-wrap gap-[5%] md:gap-[10%] sm:gap-[20px] ${roomValid.filter(item => item.type == 0 || item.type == 1).length <= 2 && "justify-center"}`}>
                                {roomValid.filter(item => item.type == 0 || item.type == 1).map(item => (
                                    <div onClick={() => handleClickRoomDetail(item.code, item.id)} className="cursor-pointer basis-[30%] md:basis-[45%] sm:basis-[90%] mb-[10px]" key={item.id}>
                                        <div className="h-[450px] border-[5px] border-primary rounded-[80px] overflow-hidden md:h-[370px] sm:h-[350px]">
                                            <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item.img[0]}`} alt="" className="h-[100%]" />
                                        </div>
                                        <p className="font-bold text-center mt-[10px]">{item.code} ({item.district.name})</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
                {
                    roomValid.filter(item => item.type == 2 || item.type == 3).length !== 0 && (
                        <div className='px-[20px] mb-[20px]'>
                            <div className="text-shadow-line text-primary text-[43px] text-center font-primary mb-[10px] md:text-[30px]">HABOUR/GARDENT HOMESTAY</div>
                            <div className={`flex flex-wrap gap-[5%] md:gap-[10%] sm:gap-[20px] ${roomValid.filter(item => item.type == 2 || item.type == 3).length <= 2 && "justify-center"}`}>
                                {roomValid.filter(item => item.type == 2 || item.type == 3).map(item => (
                                    <div onClick={() => handleClickRoomDetail(item.code, item.id)} className="cursor-pointer basis-[30%] md:basis-[45%] sm:basis-[90%]" key={item.id}>
                                        <div className="h-[450px] border-[5px] border-primary rounded-[80px] overflow-hidden md:h-[350px]">
                                            <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item.img[0]}`} alt="" className="h-[100%]" />
                                        </div>
                                        <p className="font-bold text-center mt-[10px]">{item.code} {item.district?.name && `(${item.district.name})`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default HomestayPage