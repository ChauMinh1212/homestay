import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axiosInstance from "~/axios/axiosConfig";
import ModalCheckBooking from "~/components/Booking/ModalCheckBooking.tsx";
import './RoomDetail.css';
import { TYPE_DETAIL_ROOM } from "~/common/contants";

// const StyledMenu = styled(Menu)`
//   .MuiList-root {
//     padding: 0
//   }
//   .MuiPaper-root {
//     border-radius: 10px;
//     right: 16px;
//     left: auto!important;
//     max-height: none
//   }
// `;

const RoomDetail = () => {
    const { roomId } = useParams()
    const [room, setRoom] = useState(null)
    const [htmlContent, setHtmlContent] = useState('')
    const [hiddenPrice, setHiddenPrice] = useState(false)
    const [hiddenPriceService, setHiddenPriceService] = useState(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                <span>{TYPE_DETAIL_ROOM[room.type]}: </span><span>{room.code} (</span><span>{room.name}</span>)
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
                                {
                                    room && room.img.length != 0 && room.img.map((item, index) => (
                                        <SwiperSlide key={index}><img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item}`} alt="" className="object-cover" /></SwiperSlide>

                                    ))
                                }
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
                                        <div className="flex-1 border-r-[1px] border-r-black px-[20px] py-[10px] cursor-pointer" onClick={handleClick}>
                                            <p className="font-semibold text-[14px]">Nhận phòng</p>
                                            <p className="text-[#626262] text-[12px]">Thêm ngày</p>
                                        </div>
                                        <div className="flex-1 px-[20px] py-[10px] text-right cursor-pointer" onClick={handleClick}>
                                            <p className="font-semibold text-[14px]">Trả phòng</p>
                                            <p className="text-[#626262] text-[12px]">Thêm ngày</p>
                                        </div>
                                    </div>
                                    <div className="flex border-[1px] border-black rounded-[20px] mb-[20px] cursor-pointer" onClick={handleClick}>
                                        <div className="flex-1 px-[20px] py-[10px]">
                                            <p className="font-semibold text-[14px]">Khách</p>
                                            <p className="text-[#626262] text-[12px]">Thêm ngày</p>
                                        </div>
                                    </div>
                                    <div className="border-[1px] border-black rounded-[20px] text-center py-[20px] bg-primary cursor-pointer" onClick={handleClick}>
                                        <p className="text-white font-semibold">Kiểm tra tình trạng còn phòng</p>
                                    </div>

                                </div>

                            </div>
                            {/* <StyledMenu open={open} onClose={handleClose}> */}
                                <ModalCheckBooking roomCode={room.code} roomId={roomId} open={open} handleClose={handleClose} anchorEl={anchorEl}/>
                            {/* </StyledMenu> */}
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
                    </>
                )
            }

        </div>

    )
}

export default RoomDetail