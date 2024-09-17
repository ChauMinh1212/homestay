import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import { TYPE_DETAIL_ROOM } from "~/common/contants"
import Calender from "~/components/Calendar/Calendar"
import Combo from "~/components/Combo/Combo"
import TimeGrid from "~/components/TimeGrid/TimeGrid"

const BookingPage = () => {
    const { roomCode, roomId, from, to } = useParams()
    const [room, setRoom] = useState(null)
    const [value, setValue] = useState([dayjs(from), dayjs(to)])
    const [timeDetail, setTimeDetail] = useState(null)

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

    const handleChangeDate = (e) => {
        // if (
        //     e[0] &&
        //     e[1] &&
        //     disableDate.some(disabledDate =>
        //         e[0].isBefore(disabledDate) && e[1].isAfter(disabledDate)
        //     )
        // ) {
        //     return;
        // }

        if (!e[1]) {
            const newUrl = `/booking/${roomCode}/${roomId}/${dayjs(e[0]).format('MM-DD-YYYY')}/${dayjs(e[0]).format('MM-DD-YYYY')}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
            setValue([e[0], e[0]])
            return
        }
        const newUrl = `/booking/${roomCode}/${roomId}/${dayjs(e[0]).format('MM-DD-YYYY')}/${dayjs(e[1]).format('MM-DD-YYYY')}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        setValue(e);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const [timeDetail, roomDetail] = await Promise.all([getDateDetail(+roomId), getRoomDetail(+roomId)])

            setRoom(roomDetail);
            setTimeDetail(timeDetail)
        })();
    }, [])

    return (
        <div className="max-w-7xl px-[40px] mx-auto">
            <div className="max-w-3xl mx-auto">
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
                        <p className="text-[14px]">{dayjs(value[0]).format('DD/MM/YYYY')}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Trả phòng</p>
                        <p className="text-[14px]">{dayjs(value[1]).format('DD/MM/YYYY')}</p>
                    </div>
                </div>
                <Calender value={value} handleChangeDate={handleChangeDate}></Calender>
            </div>
            <div className="w-[625px] mx-auto mt-[15px]">
                <Combo handleComboClickEx={handleComboClick}></Combo>
            </div>
            <div className="flex max-w-3xl mx-auto justify-between mb-[20px]">
                <div className="text-center font-dejavu text-white bg-[#8f7a5a] p-2 rounded-[10px] w-[200px]">
                    <p className="font-semibold">Nhận phòng</p>
                    <p className="text-[14px]">{dayjs(value[0]).format('DD/MM/YYYY')}</p>
                </div>
                <div className="text-center font-dejavu text-white bg-[#8f7a5a] p-2 rounded-[10px] w-[200px]">
                    <p className="font-semibold">Trả phòng</p>
                    <p className="text-[14px]">{dayjs(value[1]).format('DD/MM/YYYY')}</p>
                </div>
            </div>
            <TimeGrid isSameDay={from == to ? true : false} timeDetail={timeDetail && timeDetail.filter(item => item.date == dayjs(value[0]).format('DD/MM/YYYY') || item.date == dayjs(value[1]).format('DD/MM/YYYY'))}></TimeGrid>
            <div className="mt-[40px] relative mb-[20px]">
                <div className="absolute top-[-18px] left-[50%] translate-x-[-50%] bg-[#8f7a5a] w-fit p-[8px] text-white font-semibold rounded-[10px]">
                    <p><span>{TYPE_DETAIL_ROOM[room?.type]}: </span><span>{room?.code} (</span><span>{room?.name}</span>)</p>
                </div>
                <div className="w-fit border-[1px] border-black rounded-[10px] mx-auto px-[40px] pt-[30px] py-[8px]">
                    <div className="flex gap-[40px]">
                        <div className="font-semibold">
                            <p>NHẬN HOME:</p>
                            <p>TRẢ HOME:</p>
                            <p>THỜI GIAN LƯU TRÚ:</p>
                            <p>SỐ LƯỢNG KHÁCH:</p>
                            <p>THÀNH TIỀN:</p>
                            <p>SỐ ĐIỂM TÍCH LUỸ:</p>
                        </div>
                        <div>
                            <p>13:30 giờ, ngày 31/7/2024</p>
                            <p>19:00 giờ, ngày 31/7/2024</p>
                            <p>COMBO 3</p>
                            <p>COMBO 3</p>
                            <p>710.000 đồng</p>
                            <p>14 điểm</p>
                        </div>
                    </div>
                    <div className="cursor-pointer bg-[#8f7a5a] p-[2px_16px_3px_16px] text-white font-semibold w-fit ml-auto rounded-[15px]">Đặt ngay</div>
                </div>
            </div>
        </div>
    )
}

export default BookingPage