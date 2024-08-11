import { DateRange } from "@mui/lab"
import dayjs, { Dayjs } from "dayjs"
import Cookie from "js-cookie"
import { useEffect, useState } from "react"
import axiosInstance from "~/axios/axiosConfig"
import Calender from "../Calendar/Calendar"

const ModalCheckBooking = ({ roomId }) => {
    const dateCookie = Cookie.get('date') ? JSON.parse(Cookie.get('date')) : undefined
    const [value, setValue] = useState<DateRange<Dayjs>>(!dateCookie ? [dayjs(), dayjs().add(1, 'day')] : [dayjs(dateCookie[0]), dayjs(dateCookie[1])])
    const handleChangeDate = (e) => {
        setValue(e)
    }

    const getDateDetail = async (roomId: number) => {
        try {
            const res = await axiosInstance.get(`room/date-valid?id=${roomId}`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const disableDate = dayjs('12/08/2024', 'DD/MM/YYYY');

    const shouldDisableDate = (date) => {
        if (!value[0] || !value[1]) {
            // Nếu chưa có ngày bắt đầu hoặc kết thúc, chỉ kiểm tra ngày bị disable
            return date.toString() === disableDate.toString();
        } else {
            // Nếu có cả ngày bắt đầu và kết thúc, kiểm tra phạm vi
            const start = value[0];
            const end = value[1];
            const isInRange = date >= start && date <= end;
            const isDisabledDateInRange = disableDate >= start && disableDate <= end;

            return isDisabledDateInRange || date.toString() === disableDate.toString() || isInRange;
        }
    };

    useEffect(() => {
        console.log('hahh');
        (async () => {
            const dateValid = await getDateDetail(roomId)
            console.log(dateValid);
        })()
    }, [])
    return (
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
    )
}

export default ModalCheckBooking