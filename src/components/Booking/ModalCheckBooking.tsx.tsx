import { DateRange, Skeleton } from "@mui/lab"
import dayjs, { Dayjs } from "dayjs"
import Cookie from "js-cookie"
import { useEffect, useState } from "react"
import axiosInstance from "~/axios/axiosConfig"
import Calender from "../Calendar/Calendar"
import styled from "@emotion/styled"
import { Menu } from "@mui/material"

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

const ModalCheckBooking = ({ roomId, open, handleClose }) => {
    const dateCookie = Cookie.get('date') ? JSON.parse(Cookie.get('date')) : undefined
    const [value, setValue] = useState<DateRange<Dayjs>>(!dateCookie ? [null, null] : [dayjs(dateCookie[0]), dayjs(dateCookie[1])])
    const [disableDate, setDisableDate] = useState([])

    const handleChangeDate = (e) => {
        // setValue(e)

        // if (
        //     e[0] &&
        //     e[1] &&
        //     e[0].isBefore(disableDate) &&
        //     e[1].isAfter(disableDate)
        // ) {
        //     return;
        // }
        // setValue(e);

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


    // const shouldDisableDate = (date) => {
    //     // Disable ngày 12 tháng 8
    //     if (date.isSame(disableDate, 'day')) {
    //         return true;
    //     }

    //     // Nếu ngày bắt đầu hoặc kết thúc thuộc phạm vi ngày 11 đến 13 tháng 8
    //     if (value[0] && date.isAfter(value[0]) && date.isBefore(disableDate)) {
    //         return true;
    //     }
    //     if (value[1] && date.isBefore(value[1]) && date.isAfter(disableDate)) {
    //         return true;
    //     }

    //     return false;
    // };

    useEffect(() => {
        (async () => {
            console.log('render');
            const dateValid = await getDateDetail(roomId)
            console.log(dateValid);
            setDisableDate(dateValid.map(item => dayjs(item.date, 'DD/MM/YYYY')))
        })()
    }, [])

    return (
        <StyledMenu open={open} onClose={handleClose}>
            <div className="p-[20px] text-[14px]">
                <div>
                    <div className="flex items-center border-[1px] border-black rounded-[30px] w-fit mx-auto">
                        <div className="px-[30px] py-[5px] text-center">
                            <p className="font-semibold">Nhận phòng</p>
                            <p>7/7/2024</p>
                        </div>
                        <div className="px-[30px] py-[5px] text-center">
                            <p className="font-semibold">2 đêm</p>
                        </div>
                        <div className="px-[30px] py-[5px] text-center">
                            <p className="font-semibold">Trả phòng</p>
                            <p>9/7/2024</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Calender shouldDisableDate={shouldDisableDate} value={value} handleChangeDate={handleChangeDate} />
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
                        <div className="text-[#8f7a5a] mr-[30px] text-[20px]">
                            Chi tiết giờ
                        </div>
                        <div className="text-white px-[20px] py-[5px] bg-[#8f7a5a] w-fit text-[20px] rounded-[15px]">
                            Đặt ngay
                        </div>
                    </div>
                </div>
            </div>
        </StyledMenu>

    )
}

export default ModalCheckBooking