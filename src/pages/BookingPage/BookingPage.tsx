import dayjs from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import { COMBO_LIST, TYPE_DETAIL_ROOM } from "~/common/contants"
import { checkDate } from "~/components/Booking/ModalCheckBooking.tsx"
import Calender from "~/components/Calendar/Calendar"
import Combo from "~/components/Combo/Combo"
import TimeGrid from "~/components/TimeGrid/TimeGrid"




const BookingPage = () => {
    const location = useLocation();
    const { from, to } = location.state || {};
    const { roomCode, roomId } = useParams()
    const [room, setRoom] = useState(null)
    const [value, setValue] = useState([dayjs(from), dayjs(to)])
    const [timeDetail, setTimeDetail] = useState(null)
    const [disableDate, setDisableDate] = useState([])
    const [availableHoursDate, setAvailableHoursDate] = useState([])


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
        if (
            e[0] &&
            e[1] &&
            disableDate.some(disabledDate =>
                e[0].isBefore(disabledDate) && e[1].isAfter(disabledDate)
            )
        ) {
            return;
        }

        if (!e[1]) {
            setValue([e[0], e[0]])
            return
        }
        setValue(e);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const [timeDetail, roomDetail] = await Promise.all([getDateDetail(+roomId), getRoomDetail(+roomId)])
            const checkDateValid = checkDate(timeDetail)
            const dateDisable = checkDateValid.filter(item => item.type == 0).map(item => moment(item.date, 'DD/MM/YYYY'))
            const dateAvailableHours = checkDateValid.filter(item => item.type == 1).map(item => moment(item.date, 'DD/MM/YYYY'))
            setDisableDate(dateDisable)
            setAvailableHoursDate(dateAvailableHours)
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
                <Calender value={value} handleChangeDate={handleChangeDate} disableDate={disableDate} availableHoursDate={availableHoursDate}></Calender>
            </div>
            <div className="w-[625px] mx-auto mt-[15px]">
                <Combo handleComboClickEx={handleComboClick} combo_list={timeDetail && checkCombo(timeDetail, dayjs(value[0]).format('DD/MM/YYYY'), dayjs(value[1]).format('DD/MM/YYYY'))}></Combo>
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
            <TimeGrid
                isSameDay={dayjs(value[1]).diff(value[0]) == 0 ? true : false}
                timeDetail={timeDetail && timeDetail.filter(item => item.date == dayjs(value[0]).format('DD/MM/YYYY') || item.date == dayjs(value[1]).format('DD/MM/YYYY'))}
            />
            <div className="mt-[40px] relative mb-[20px]">
                <div className="absolute top-[-18px] left-[50%] translate-x-[-50%] bg-[#8f7a5a] p-[8px] text-white font-semibold rounded-[10px]">
                    <p><span>{TYPE_DETAIL_ROOM[room?.type]}: </span><span>{room?.code} (</span><span>{room?.name}</span>)</p>
                </div>
                <div className="max-w-[500px] border-[1px] border-black rounded-[10px] mx-auto px-[40px] pt-[30px] py-[8px]">
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

const checkCombo = (timeDetail, dateFrom, dateTo) => {
    const checkDateFrom = timeDetail.find(item => item.date == dateFrom)
    const checkDateTo = timeDetail.find(item => item.date == dateTo)

    if (!checkDateFrom && !checkDateTo) {
        return COMBO_LIST.map(item => ({ ...item, disabled: false }))
    }
    if (checkDateFrom) {
        return COMBO_LIST.map(item => {
            const checkIsDisable = checkDateFrom.booking.map(book => {
                return isTimeOverlap(item.time[0], item.time[1], book.from, book.to)
            })
            
            return {
                ...item,
                disabled: checkIsDisable.some(s => s == true)
            }
        })
    }
    // if(checkDateFrom && checkDateTo){

    // }
}

const isTimeOverlap = (startTime1, endTime1, startTime2, endTime2) => {
    // Chuyển đổi thời gian thành số phút từ đầu ngày để dễ so sánh
    const convertToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const start1 = convertToMinutes(startTime1);
    const end1 = convertToMinutes(endTime1);
    const start2 = convertToMinutes(startTime2);
    const end2 = convertToMinutes(endTime2);

    // Kiểm tra khoảng thời gian thứ hai có nằm trong khoảng thời gian thứ nhất hay không
    return (start2 >= start1 && start2 < end1) || (end2 > start1 && end2 <= end1) || (start2 <= start1 && end2 >= end1);
}
