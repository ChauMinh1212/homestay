import { useEffect } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import './HomePage.css'

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {/* <About></About> */}
            {/* <Service></Service> */}
            <div className="px-[20px] pt-[20px] mb-[30px]">
                <div className="flex border-b-[2px] border-b-primary">
                    <div className="flex-1 flex items-center flex-col border-r-[2px] border-r-primary">
                        <img className="w-[60px] h-[60px] mb-[10px]" src="/images/home_1.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px]">THÀNH VIÊN</p>
                    </div>
                    <div className="flex-1 flex items-center flex-col border-r-[2px] border-r-primary">
                        <img className="w-[60px] h-[60px] mb-[10px]" src="/images/home_2.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px]">HOMESTAY SÀI GÒN</p>
                    </div>
                    <div className="flex-1 flex items-center flex-col border-r-[2px] border-r-primary">
                        <img className="w-[60px] h-[60px] mb-[10px]" src="/images/home_3.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px]">HABOUR HOMESTAY </p>
                    </div>
                    <div className="flex-1 flex items-center flex-col border-r-[2px] border-r-primary">
                        <img className="w-[60px] h-[60px] mb-[10px]" src="/images/home_4.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px]">TIN MỚI VÀ ƯU ĐÃI</p>
                    </div>
                    <div className="flex-1 flex items-center flex-col">
                        <img className="w-[60px] h-[60px] mb-[10px]" src="/images/home_5.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px]">ĐẶT NGAY</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center w-[810px] m-auto">
                <div className="custom-nav-button-prev triangle-button-prev"></div>
                <Swiper
                    loop={true}
                    navigation={
                        {
                            nextEl: '.custom-nav-button-next',
                            prevEl: '.custom-nav-button-prev',
                        }
                    }
                    pagination={{
                        clickable: true
                    }}
                    
                    modules={[Navigation, Autoplay, Pagination]}
                    className="mx-h-[100%] h-[400px] w-[700px]"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide>
                        <img src="/images/slide_1.jpeg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide><img src="/images/slide_2.jpeg" alt="" className="object-cover" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_3.jpeg" alt="" className="object-cover" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_4.jpeg" alt="" className="object-cover" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_5.jpeg" alt="" className="object-cover" /></SwiperSlide>
                </Swiper>
                <div className="custom-nav-button-next triangle-button-next"></div>
            </div>
            <div className="">
                <div className="flex items-center py-[20px]">
                    <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                    <div className="w-[450px] text-shadow-line text-primary text-[40px] text-center font-primary">HOMESTAY SELECTION</div>
                    <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                </div>
                <div>
                    <div className="flex gap-[40px] justify-center">
                        <div className="basis-[310px]">
                            <div className="h-[400px] border-[7px] border-[#000] rounded-[80px] overflow-hidden">
                                <img src="images/home_6.png" alt="" className="h-[100%]"/>
                            </div>
                            <p className="font-bold text-center mt-[10px]">HOMESTAY SÀI GÒN</p>
                        </div>
                        <div className="basis-[310px]">
                            <div className="h-[400px] border-[7px] border-[#000] rounded-[80px] overflow-hidden">
                                <img src="images/home_7.png" alt="" className="h-[100%]"/>
                            </div>
                            <p className="font-bold text-center mt-[10px]">HABOUR HOMESTAY</p>
                        </div>
                        <div className="basis-[310px]">
                            <div className="h-[400px] border-[7px] border-[#000] rounded-[80px] overflow-hidden">
                                <img src="images/home_8.png" alt="" className="h-[100%]"/>
                            </div>
                            <p className="font-bold text-center mt-[10px]">GARDEN HOMESTAY</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[20px]">
                <div className="flex items-center py-[20px]">
                    <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                    <div className="w-[180px] text-shadow-line text-primary text-[40px] text-center font-primary">EVENT</div>
                    <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                </div>
                <div>
                    <div className="flex justify-center gap-[50px]">
                        <div className="bg-gradient-to-r from-[#fff7ad] to-[#ffa9f9] h-[260px] basis-[220px]"></div>
                        <div className="bg-gradient-to-r from-[#0cc0df] to-[#ffde59] h-[260px] basis-[450px]"></div>
                        <div className="bg-gradient-to-r from-[#fff7ad] to-[#ffa9f9] h-[260px] basis-[220px]"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage