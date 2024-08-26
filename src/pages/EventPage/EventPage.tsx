import { CalendarMonth } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axiosInstance from "~/axios/axiosConfig";

const EventPage = () => {
    const [event, setEvent] = useState([])
    const getEvent = async () => {
        try {
            const res = await axiosInstance.get(`event?status=1`)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const data = await getEvent()
            setEvent(data)
        })()
    }, []);
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center py-[20px]">
                <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                <div className="w-[450px] text-shadow-line text-primary text-[35px] text-center font-primary md:text-[30px] font-semibold">TIN MỚI VÀ ƯU ĐÃI</div>
                <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
            </div>
            <div className="flex flex-wrap gap-[8%] md:gap-[4%]">
                {event.map(item => (
                    <div className="w-[28%] md:w-[48%] flex items-center flex-col">
                        <div className="h-[300px] w-[280px]">
                            <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item.img}`} className="object-cover" alt="" />
                        </div>
                        <div className="flex gap-[10px] justify-center mt-[7px]">
                            <CalendarMonth className="text-primary" />
                            <p>{item.from + ' - ' + item.to}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventPage