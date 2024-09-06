import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import { COMBO_LIST, TYPE_DETAIL_ROOM } from "~/common/contants"
import Calender from "~/components/Calendar/Calendar"
import Combo from "~/components/Combo/Combo"

const BookingPage = () => {
    const { roomId } = useParams()
    const [room, setRoom] = useState(null)

    const getDateDetail = async (roomId: number) => {
        try {
            const res = await axiosInstance.get(`room/date-valid?id=${roomId}`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const getRoomDetail = async (roomId: number) => {
        try {
            const res = await axiosInstance.get(`room/${roomId}`)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    const handleComboClick = () => {
        
    }

    useEffect(() => {
        (async () => {
            const [timeDetail, roomDetail] = await Promise.all([getDateDetail(+roomId), getRoomDetail(+roomId)])
            setRoom(roomDetail);
        })();
    }, [])

    return (
        <div>
            <div className="max-w-3xl mx-auto px-[40px]">
                <div className="flex items-center gap-[10px]">
                    <div className="w-[70px] h-[70px] rounded-[50%] overflow-hidden border-[1px] border-black">
                        <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${room?.img[0]}`} alt="" />
                    </div>
                    <div>
                        <div className="text-[23px] font-semibold">
                            <span>{TYPE_DETAIL_ROOM[room?.type]}: </span><span>{room?.code} (</span><span>{room?.name}</span>)
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <img className="w-[15px] h-[15px] mr-[5px]" src="/images/forward.png" alt="" />
                            <p className="text-[15px] underline">Chia sẻ ngay</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-[1px] border-black w-fit p-3 rounded-[20px] mx-auto mt-[20px]">
                <div className="flex justify-evenly">
                    <div className="text-center">
                        <p className="font-semibold">Nhận phòng</p>
                        <p className="text-[14px]">01/02/2024</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Trả phòng</p>
                        <p className="text-[14px]">01/02/2024</p>
                    </div>
                </div>
                <Calender></Calender>
            </div>
            <Combo handleComboClickEx={handleComboClick}></Combo>
        </div>
    )
}

export default BookingPage