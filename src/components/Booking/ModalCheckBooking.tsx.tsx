import styled from "@emotion/styled"
import { DateRange } from "@mui/lab"
import { Menu } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import axiosInstance from "~/axios/axiosConfig"
import Calender from "../Calendar/Calendar"
import { useNavigate } from "react-router-dom"

const hasThreeConsecutiveHoursFree = (booking, num) => {
    // Tạo một mảng 24 phần tử, khởi tạo tất cả các phần tử là false (chưa được đặt)
    let hours = Array(24).fill(false);

    // Đánh dấu các giờ đã được đặt trong mảng booking
    booking.forEach(b => {
        let start = parseInt(b.from);
        let end = parseInt(b.to);
        for (let i = start; i < end; i++) {
            hours[i] = true;
        }
    });

    // Kiểm tra xem có 3 giờ trống liên tiếp không
    let consecutiveFreeHours = 0;
    for (let i = 0; i < 24; i++) {
        if (!hours[i]) {
            consecutiveFreeHours++;
            if (consecutiveFreeHours >= num) {
                return true;
            }
        } else {
            consecutiveFreeHours = 0;
        }
    }

    return false;
}

const isFreeBetween = (booking, startHour, endHour) => {
    // Tạo một mảng 24 phần tử, khởi tạo tất cả các phần tử là false (chưa được đặt)
    let hours = Array(24).fill(false);

    // Đánh dấu các giờ đã được đặt trong mảng booking
    booking.forEach(b => {
        let start = parseInt(b.from.split(':')[0]);
        let end = parseInt(b.to.split(':')[0]);
        for (let i = start; i < end; i++) {
            hours[i] = true;
        }
    });

    // Kiểm tra khoảng thời gian từ startHour đến endHour
    for (let i = startHour; i < endHour; i++) {
        if (hours[i]) {
            return false; // Nếu có bất kỳ giờ nào bị đặt thì trả về false
        }
    }

    return true; // Nếu tất cả các giờ từ startHour đến endHour đều trống thì trả về true
}

const checkDate = (dateArr) => { // 0 - Full, 1 - Trống h trong ngày, 2 - Trống 14h - 12h hôm sau
    return dateArr.map((item, index) => {
        if(!hasThreeConsecutiveHoursFree(item.booking, 3)){
            return {date: item.date, type: 0}
        } else if (isFreeBetween(item.booking, 14, 24) && (!dateArr[index + 1]?.booking || isFreeBetween(dateArr[index + 1].booking, 0, 12))){
            return {date: item.date, type: 2}
        } else {
            return {date: item.date, type: 1}
        }
        
    })
}

const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 0
  }
  .MuiPaper-root {
    border-radius: 10px;
    right: 16px;
    left: auto!important;
    max-height: none
  }
`;

const ModalCheckBooking = ({ roomId, roomCode, open, handleClose, anchorEl }) => {
    const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
    const [disableDate, setDisableDate] = useState([])
    const [availableHoursDate, setAvailableHoursDate] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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
        setValue(e);
        if (!e[1]) {
            setValue([e[0], e[0]])
            return
        }
    }

    const isDateDisabled = (date) => {
        return disableDate.some(disabledDate => date.isSame(disabledDate, 'day'));
    };

    const shouldDisableDate = (date) => {
        // Disable bất kỳ ngày nào có trong mảng `disabledDates`
        if (isDateDisabled(date)) {
            return true;
        }

        // Nếu đã chọn ngày bắt đầu và ngày kết thúc
        if (value[0] && value[1]) {
            // Kiểm tra nếu phạm vi chứa bất kỳ ngày nào trong mảng `disabledDates`
            const isRangeDisabled = disableDate.some(disabledDate =>
                value[0].isBefore(disabledDate) && value[1].isAfter(disabledDate)
            );
            if (isRangeDisabled) {
                return true;
            }
        }

        return false;
    };

    const getDateDetail = async (roomId: number) => {
        try {
            const res = await axiosInstance.get(`room/date-valid?id=${roomId}`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const navigateToBookingPage = () => {
        navigate(`/booking/${roomCode}/${roomId}`)
    }

    useEffect(() => {
        (async () => {
            const dateValid = await getDateDetail(roomId)
            const checkDateValid = checkDate(dateValid)
            const dateDisable = checkDateValid.filter(item => item.type == 0).map(item => moment(item.date, 'DD/MM/YYYY'))
            const dateAvailableHours = checkDateValid.filter(item => item.type == 1).map(item => moment(item.date, 'DD/MM/YYYY'))
            setDisableDate(dateDisable)
            setAvailableHoursDate(dateAvailableHours)
            setLoading(false)
        })()
    }, [])

    return (
        <StyledMenu open={open} onClose={handleClose} anchorEl={anchorEl}>
            <div className="p-[20px] text-[14px]">
                <div>
                    <div className="flex items-center border-[1px] border-black rounded-[30px] w-fit mx-auto">
                        <div className="px-[30px] py-[5px] text-center">
                            <p className="font-semibold">Nhận phòng</p>
                            <p>{!value[0] ? 'Thêm ngày' : dayjs(value[0]).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="px-[30px] py-[5px] text-center">
                            <p className="font-semibold">{value[0] ? dayjs(value[1]).diff(value[0], 'day') : 0} đêm</p>
                        </div>
                        <div className="px-[30px] py-[5px] text-center">
                            <p className="font-semibold">Trả phòng</p>
                            <p>{!value[0] ? 'Thêm ngày' : dayjs(value[1]).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                </div>
                <div>
                    {!loading && <Calender disableDate={disableDate} availableHoursDate={availableHoursDate} shouldDisableDate={shouldDisableDate} value={value} handleChangeDate={handleChangeDate} />}
                </div>
                <div className="flex">
                    <div className="flex-1">
                        <div className="flex items-center">
                            <div className="mr-[7px] border-[2px] border-black w-[20px] h-[20px] text-[10px] font-bold rounded-[50%] flex justify-center items-center">1</div>
                            <p className="text-[11px] font-semibold">Trống nguyên ngày (14h - 12h hôm sau) , có thể đặt</p>
                        </div>
                        <div className="flex items-center mt-[5px] text-[#c4c4c4] w-fit">
                            <div className="mr-[7px] border-[2px] border-[#c4c4c4] w-[20px] h-[20px] text-[10px] font-bold rounded-[50%] flex justify-center items-center relative">1
                                <div className="absolute w-full border-t-[1px] border-[#c4c4c4] translate-y-[50%] top-[50%]"></div>
                            </div>
                            <p className="text-[11px] font-semibold">Ngày đã full, không thể đặt </p>
                        </div>
                        <div className="flex items-center mt-[5px]">
                            <div className="mr-[7px] border-[2px] border-[#8f7a5a] w-[20px] h-[20px] text-[10px] text-[#8f7a5a] font-bold rounded-[50%] flex justify-center items-center">1</div>
                            <p className="text-[11px] text-[#8f7a5a] font-semibold">Còn trống giờ trong ngày, có thể đặt</p>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center font-dejavu">
                        <div className="text-[#8f7a5a] mr-[30px] text-[20px]" onClick={navigateToBookingPage}>
                            Chi tiết giờ
                        </div>
                        <div className="text-white px-[20px] py-[5px] bg-[#8f7a5a] w-fit text-[20px] rounded-[15px]" onClick={navigateToBookingPage}>
                            Đặt ngay
                        </div>
                    </div>
                </div>
            </div>
        </StyledMenu>

    )
}

export default ModalCheckBooking