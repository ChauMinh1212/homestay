import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axiosInstance from "~/axios/axiosConfig";
import TextEditor from "~/components/Editor/Editor";
import './RoomDetail.css'

const RoomDetail = () => {
    const { roomId } = useParams()
    const [room, setRoom] = useState(null)
    const type = ['S.HOME SÀI GÒN', 'S.HOME SÀI GÒN', 'S.HOME HABOUR', 'S.HOME GARDEN']
    const [htmlContent, setHtmlContent] = useState('')
    const [hiddenPrice, setHiddenPrice] = useState(false)
    const [hiddenPriceService, setHiddenPriceService] = useState(false)

    const getRoom = async (id: number) => {
        try {
            const res = await axiosInstance.get(`room/${id}`)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        (async () => {
            const room = await getRoom(+roomId)
            setRoom(room)
            setHtmlContent(room.description)
        })();
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-[20px]">
            {
                room && (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="font-semibold text-[23px]">
                                <span>{type[room.type]}: </span><span>{room.code} (</span><span>{room.name}</span>)
                            </div>
                            <div className="flex items-center cursor-pointer">
                                <img className="w-[15px] h-[15px] mr-[5px]" src="/images/forward.png" alt="" />
                                <p className="text-[15px] underline">Chia sẻ ngay</p>
                            </div>
                        </div>

                        <div className="rounded-[10px] overflow-hidden border-[1px] border-black mb-[20px]">
                            <Swiper
                                loop={true}
                                pagination={{
                                    clickable: true
                                }}

                                modules={[Autoplay, Pagination]}
                                className="h-[400px]"
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                            >
                                <SwiperSlide>
                                    <img src="/images/slide_1.jpeg" alt="" />
                                </SwiperSlide>
                                <SwiperSlide><img src="/images/slide_2.jpeg" alt="" className="object-cover" /></SwiperSlide>
                                <SwiperSlide><img src="/images/slide_3.jpeg" alt="" className="object-cover" /></SwiperSlide>
                                <SwiperSlide><img src="/images/slide_4.jpeg" alt="" className="object-cover" /></SwiperSlide>
                                <SwiperSlide><img src="/images/slide_5.jpeg" alt="" className="object-cover" /></SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="flex gap-[5%]">
                            <div className="basis-[60%]">
                                <div className="ml-[40px] flex items-center mb-[10px]">
                                    <img src="/images/location.png" className="w-[30px] h-[37px]" alt="" />
                                    <p className="ml-[10px] font-semibold text-[18px]">{room.address}</p>
                                </div>
                                <div className="html-output ml-[30px]" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                            </div>
                            <div className="basis-[35%]">
                                <div className="border-[1px] border-black p-[30px]">
                                    <p className="text-center font-semibold text-[17px] mb-[10px]">Thêm ngày để xem giá</p>
                                    <div className="flex border-[1px] border-black rounded-[20px]">
                                        <div className="flex-1 border-r-[1px] border-r-black px-[20px] py-[10px]">
                                            <p className="font-semibold text-[14px]">Nhận phòng</p>
                                            <p className="text-[#626262] text-[12px]">Thêm ngày</p>
                                        </div>
                                        <div className="flex-1 px-[20px] py-[10px] text-right">
                                            <p className="font-semibold text-[14px]">Trả phòng</p>
                                            <p className="text-[#626262] text-[12px]">Thêm ngày</p>
                                        </div>
                                    </div>
                                    <div className="flex border-[1px] border-black rounded-[20px] mb-[20px]">
                                        <div className="flex-1 px-[20px] py-[10px]">
                                            <p className="font-semibold text-[14px]">Khách</p>
                                            <p className="text-[#626262] text-[12px]">Thêm ngày</p>
                                        </div>
                                    </div>
                                    <div className="border-[1px] border-black rounded-[20px] text-center py-[20px] bg-primary">
                                        <p className="text-white font-semibold">Kiểm tra tình trạng còn phòng</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center cursor-pointer justify-center" onClick={() => setHiddenPrice(prev => !prev)}>
                                <div className="price text-[50px] text-primary font-paytone mr-[14px]">BẢNG GIÁ</div>
                                <div className={`${hiddenPrice ? 'rectangle-down' : 'rectangle-up'}`}>
                                </div>
                            </div>
                            <div className={`${hiddenPrice ? 'hidden' : 'mb-[20px]'}`}>
                                <img src="/images/price.png" className="w-[90%] mx-auto" alt="" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center cursor-pointer justify-center" onClick={() => setHiddenPriceService(prev => !prev)}>
                                <div className="price text-[50px] text-primary font-paytone mr-[14px]">DỊCH VỤ</div>
                                <div className={`${hiddenPriceService ? 'rectangle-down' : 'rectangle-up'}`}>
                                </div>
                            </div>
                            <div className={`${hiddenPriceService ? 'hidden' : 'mb-[20px]'}`}>
                                <img src="/images/service.png" className="w-[90%] mx-auto" alt="" />
                            </div>
                        </div>

                        {/* <TextEditor></TextEditor> */}
                    </>
                )
            }

        </div>
    )
}

export default RoomDetail