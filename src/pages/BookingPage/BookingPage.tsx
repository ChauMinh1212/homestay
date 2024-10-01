import dayjs from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import { TYPE_DETAIL_ROOM } from "~/common/contants"
import { checkDate, isFreeBetween } from "~/components/Booking/ModalCheckBooking.tsx"
import Calender from "~/components/Calendar/Calendar"
import TimeGrid from "~/components/TimeGrid/TimeGrid"

const BookingPage = () => {
    const location = useLocation();
    const { from, to } = location.state || {};
    const { roomId } = useParams()
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

    const handleChangeDate = (e) => {
        const findDateTo = timeDetail.find(item => item.date == dayjs(e[1]).format('DD/MM/YYYY'))
        
        if (
            e[0] &&
            e[1] &&
            (
                [...disableDate, ...availableHoursDate].some(disabledDate =>
                    e[0].isBefore(disabledDate) && e[1].isAfter(disabledDate))
                ||
                (
                    [...availableHoursDate].some(disabledDate => {
                        return e[0].isSame(disabledDate)
                    })
                    &&
                    e[1].diff(e[0], 'day') != 1
                )
                ||
                (
                    findDateTo && !isFreeBetween(findDateTo.booking, 0, 13) && e[1].diff(e[0], 'day') != 1
                )
                ||
                (
                    findDateTo && !isFreeBetween(findDateTo.booking, 0, 12) && e[1].diff(e[0], 'day') == 1
                )
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

            {timeDetail && <TimeGrid
                isSameDay={dayjs(value[1]).diff(value[0]) == 0 ? true : false}
                timeDetail={timeDetail &&
                    [
                        timeDetail.find(item => item.date == dayjs(value[0]).format('DD/MM/YYYY')) || {},
                        timeDetail.find(item => item.date == dayjs(value[1]).format('DD/MM/YYYY'))
                    ]}
                dateFrom={value[0]}
                dateTo={value[1]}
                room={room}
            />}
        </div>
    )
}

export default BookingPage