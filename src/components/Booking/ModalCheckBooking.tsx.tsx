import { DateRange } from "@mui/lab"
import dayjs, { Dayjs } from "dayjs"
import Cookie from "js-cookie"
import { useState } from "react"
import Calender from "../Calendar/Calendar"

const ModalCheckBooking = () => {
    const dateCookie = Cookie.get('date') ? JSON.parse(Cookie.get('date')) : undefined
    const [value, setValue] = useState<DateRange<Dayjs>>(!dateCookie ? [dayjs(), dayjs().add(1, 'day')] : [dayjs(dateCookie[0]), dayjs(dateCookie[1])])
    const handleChangeDate = (e) => {
        setValue(e)
    }
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
                <Calender value={value} handleChangeDate={handleChangeDate} />
            </div>
            <div className="flex">
                <div>
                    <div className="flex items-center">
                        <div className="mr-[7px] border-[2px] border-black w-[20px] h-[20px] text-[10px] font-bold rounded-[50%] flex justify-center items-center">1</div>
                        <p className="text-[12px] font-semibold">Trống nguyên ngày (14h - 12h hôm sau) , có thể đặt</p>
                    </div>
                    <div className="flex items-center mt-[5px]">
                        <div className="mr-[7px] border-[2px] border-black w-[20px] h-[20px] text-[10px] font-bold rounded-[50%] flex justify-center items-center">1</div>
                        <p className="text-[12px] font-semibold">Trống nguyên ngày (14h - 12h hôm sau) , có thể đặt </p>
                    </div>
                    <div className="flex items-center mt-[5px]">
                        <div className="mr-[7px] border-[2px] border-[#8f7a5a] w-[20px] h-[20px] text-[10px] text-[#8f7a5a] font-bold rounded-[50%] flex justify-center items-center">1</div>
                        <p className="text-[12px] text-[#8f7a5a] font-semibold">Còn trống giờ trong ngày, có thể đặt</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCheckBooking