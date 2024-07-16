import { useEffect } from "react"
import Logo from "~/components/Logo/Logo"
import './AboutPage.css'

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="text-[18px] font-second font-[300]">
            <Logo></Logo>
            <video className="w-full" src="/images/video.mp4" autoPlay muted loop></video>
            <div className="px-[20px] pt-[30px] max-w-7xl mx-auto">
                <div className="mb-[20px]">
                    Sở hữu view sát bờ biển, Aroma đem đến cảm giác cực sảng khoái cho du khách. Tại đây, bạn sẽ thoát khỏi những con phố san sát hay quán xá ồn ào. Thay vào đó là những âm thanh yên bình tại một ốc đảo đầy thơ mộng ngay giữa vịnh. Đây là nơi thích hợp cho những ai muốn tận hưởng cát vàng, biển xanh nhưng vẫn cần phút giây thư giãn, riêng tư.
                </div>
                <div className="mb-[20px]">
                    Tại resort, thời gian như ngưng đọng, chỉ còn lại những cảm xúc thăng hoa hoà quyện cùng thiên nhiên. Mỗi sáng thức dậy, hãy ngắm ánh bình minh vàng ươm điểm tô vẻ duyên dáng biệt thự trên bãi biển. Đây thật đúng là không gian yên bình đáng để trải nghiệm mỗi dịp ghé thăm thành phố trẻ năng động.
                </div>
                <div className="h-[500px] md:h-auto relative">
                    <img src="/images/gioi_thieu_1.png" className="w-full h-full object-cover" alt="" />
                    <div className="bg-[rgb(255,255,255)] opacity-[0.79] absolute w-[50%] h-full right-0 top-0 md:hidden"></div>
                    <div className="w-[50%] h-full p-[20px] absolute right-0 top-0 text-[23px] xl:text-[20px] md:relative md:w-full">
                        <div className="text-shadow-line text-primary text-[50px] text-center font-service">Tiện ích</div>
                        <p>Tự hào là một khu resort đẳng cấp 4 sao – Aroma Resort hứa hẹn sẽ cung cấp cho bạn nhiều tiện nghi hiện đại như hồ bơi ngoài trời nhà hàng trong nhà, thậm chí là phòng tập gym có tầm nhìn hướng ra vườn thoáng đãng.
                        </p>
                        <p className="mt-[30px]">Sau khi dạo một vòng quanh resort, bạn có thể ghé Nhà hàng Tansy rộng lớn của khách sạn và thưởng thức hàng ngàn món ăn Việt Nam hay phương Tây ngon khó cưỡng. Ngoài ra, nhâm nhi vài cốc đồ uống giải khát ở quán bar bên cạnh hồ bơi ngoài trời.</p>
                    </div>
                </div>
                <div className="h-[500px] md:h-auto relative">
                    <img src="/images/gioi_thieu_2.png" className="w-full h-full object-cover" alt="" />
                    <div className="bg-[rgb(255,255,255)] opacity-[0.79] absolute w-[50%] h-full left-0 top-0 md:hidden"></div>
                    <div className="w-[50%] h-full p-[20px] absolute left-0 top-0 text-[23px] xl:text-[20px] md:relative md:w-full">
                        <div className="text-shadow-line text-primary text-[50px] text-center font-service">Dịch vụ</div>
                        <p>Để đánh giá Aroma Resort Mũi Né, hiển nhiên bạn nên nhìn vào chất lượng dịch vụ ở đây. Theo những review từ du khách , mọi người đều đồng quan điểm rằng đây là địa chỉ hoàn hảo. Họ cảm thấy thoải mái như ở nhà, bên cạnh các món ăn hợp khẩu vị, khu vực massage, phòng tập hiện đại và chất lượng.
                        </p>
                        <p className="mt-[30px]">Ngoài các dịch vụ nghỉ dưỡng, bạn có thể rèn luyện sức khỏe tại trung tâm thể dục hoặc chơi bida. Một số phương tiện giải trí được cung cấp như: bãi biển riêng; bồn tắm nước nóng; hồ bơi (trẻ em).</p>
                    </div>
                </div>
                <div className="h-[500px] md:h-auto relative">
                    <img src="/images/gioi_thieu_3.png" className="w-full h-full object-cover" alt="" />
                    <div className="bg-[rgb(255,255,255)] opacity-[0.79] absolute w-[50%] h-full right-0 top-0 md:hidden"></div>
                    <div className="w-[50%] h-full p-[20px] absolute right-0 top-0 text-[23px] xl:text-[20px] md:relative md:w-full">
                        <div className="text-shadow-line text-primary text-[50px] text-center font-service">Khu vực</div>
                        <p>Để đánh giá Aroma Resort Mũi Né, hiển nhiên bạn nên nhìn vào chất lượng dịch vụ ở đây. Theo những review từ du khách , mọi người đều đồng quan điểm rằng đây là địa chỉ hoàn hảo. Họ cảm thấy thoải mái như ở nhà, bên cạnh các món ăn hợp khẩu vị, khu vực massage, phòng tập hiện đại và chất lượng.
                        </p>
                        <p className="mt-[30px]">Ngoài các dịch vụ nghỉ dưỡng, bạn có thể rèn luyện sức khỏe tại trung tâm thể dục hoặc chơi bida. Một số phương tiện giải trí được cung cấp như: bãi biển riêng; bồn tắm nước nóng; hồ bơi (trẻ em).</p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src="/images/s2.webp" alt="" className="" />
                <div className="absolute top-[40px] left-[40px]">
                    <div className="font-league text-[70px] leading-[1] font-semibold text-white">SIRENA<br />HOMESTAY</div>
                    <div className="font-sanchez text-[40px] text-white">Propose Service</div>
                </div>
            </div>
            {/* <div className="party font-libre text-[160px] font-bold text-white text-center leading-[1] pt-[50px]">PARTY</div>
            <div className="font-libre text-[160px] font-bold text-primary text-center leading-[1] pb-[50px]">POOL</div>
            <img src="/images/s2_2.webp" alt="" />
            <img src="/images/screen.jpg" alt="" />
            <div className="camping font-primary italic text-[100px] font-bold text-white text-center leading-[1] py-[50px]">TEAM CAMPING</div>
            <img src="/images/s2_3.webp" alt="" />
            <div className="flex items-stretch h-[532px]">
                <div className="bg-[url('/images/s.webp')] bg-center bg-cover flex-grow-[3]"></div>
                <div className="bg-[url('/images/s.jpg')] bg-center bg-cover flex-grow-[1.5]"></div>
            </div> */}
        </div>
    )
}

export default AboutPage