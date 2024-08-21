import { CalendarMonth } from "@mui/icons-material";
import { useEffect } from "react";

const EventPage = () => {
    // const getEvent = () => {
    //     try {
            
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            console.log('render');
            // const dateValid = await getDateDetail(roomId)
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
                <div className="w-[28%] md:w-[48%] flex items-center flex-col">
                    <div className="h-[300px] w-[280px]">
                        <img src="/images/combo_meal.png" className="object-cover" alt="" />
                    </div>
                    <div className="flex gap-[10px] justify-center mt-[7px]">
                        <CalendarMonth className="text-primary" />
                        <p>01/08/2024 - 30/09/2024</p>
                    </div>
                </div>
                <div className="w-[28%] md:w-[48%] flex items-center flex-col">
                    <div className="h-[300px] w-[280px]">
                        <img src="/images/combo_meal.png" className="object-cover" alt="" />
                    </div>
                    <div className="flex gap-[10px] justify-center mt-[7px]">
                        <CalendarMonth className="text-primary" />
                        <p>01/08/2024 - 30/09/2024</p>
                    </div>
                </div>
                <div className="w-[28%] md:w-[48%] flex items-center flex-col">
                    <div className="h-[300px] w-[280px]">
                        <img src="/images/combo_meal.png" className="object-cover" alt="" />
                    </div>
                    <div className="flex gap-[10px] justify-center mt-[7px]">
                        <CalendarMonth className="text-primary" />
                        <p>01/08/2024 - 30/09/2024</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPage