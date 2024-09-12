import "./TimeGrid.css"; // Import file CSS

const TimeGrid = () => {
    const times = [];

    // Tạo danh sách các mốc thời gian từ 00:00 đến 23:30
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute
                .toString()
                .padStart(2, '0')}`;
            times.push(time);
        }
    }

    return (
        <div className="max-w-[500px] mx-auto">
            <div className="time-grid ">
                {times.map((time, index) => (
                    <div key={index} className="time-slot">
                        {time}
                    </div>
                ))}
            </div>
            <div className="flex flex-col mt-[10px]">
                <div className="flex items-center">
                    <div className="w-[15px] h-[15px] border-[1px] border-black rounded-[50%] mr-[10px]"></div>
                    <div className="font-[400]">Thời gian trống, có thể đặt</div>
                </div>
                <div className="flex items-center">
                    <div className="w-[15px] h-[15px] border-[1px] border-transparent rounded-[50%] mr-[10px] bg-[#e5e1e1]"></div>
                    <div className="font-[400]">Thời gian đã full, không thể đặt</div>
                </div>
                <div className="flex items-center">
                    <div className="w-[15px] h-[15px] border-[1px] border-transparent rounded-[50%] mr-[10px] bg-[#ba2e2d]"></div>
                    <div className="font-[400]">Thời gian chuẩn bị HOME, không thể đặt</div>
                </div>
            </div>
        </div>

    );
};

export default TimeGrid;
