import { useContext, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import MenuLoginContext from "~/contexts/MenuLoginContext";
import './HomePage.css'
import ProfileOpenContext from "~/contexts/ProfileOpenContext";
import UserContext from "~/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/axios/axiosConfig";

const HomePage = () => {
    const { setOpenMenuLogin } = useContext(MenuLoginContext)
    const { setOpenProfile } = useContext(ProfileOpenContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [banner, setBanner] = useState([])

    const getBanner = async () => {
        try {
            const res = await axiosInstance.get('banner')
            return res.data || []
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        (async () => {
            const banner = await getBanner()
            setBanner(banner)
        })();
    }, []);

    return (
        <>
            <div className="px-[20px] pt-[20px] mb-[30px]">
                <div className="flex border-b-[2px] border-b-primary flex-wrap">
                    <div onClick={() => user ? setOpenProfile(true) : setOpenMenuLogin(true)} className="cursor-pointer flex-1 flex items-center flex-col border-r-[2px] border-r-primary md:flex-[33%]">
                        <img className="w-[60px] h-[60px] md:w-[30px] md:h-[30px] mb-[10px]" src="/images/home_1.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px] text-center px-[10px] md:text-[13px]">THÀNH VIÊN</p>
                    </div>
                    <div onClick={() => navigate('/homestay')} className="cursor-pointer flex-1 flex items-center flex-col border-r-[2px] border-r-primary md:flex-[33%]">
                        <img className="w-[60px] h-[60px] md:w-[30px] md:h-[30px] mb-[10px]" src="/images/home_2.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px] text-center px-[10px] md:text-[13px]">HOMESTAY SÀI GÒN</p>
                    </div>
                    <div onClick={() => navigate('/room/HABOUR%20HOMESTAY/30')} className="cursor-pointer flex-1 flex items-center flex-col border-r-[2px] border-r-primary md:flex-[33%] md:border-none">
                        <img className="w-[60px] h-[60px] md:w-[30px] md:h-[30px] mb-[10px]" src="/images/home_3.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px] text-center px-[10px] md:text-[13px]">HABOUR HOMESTAY </p>
                    </div>
                    <div className="cursor-pointer flex-1 flex items-center flex-col border-r-[2px] border-r-primary">
                        <img className="w-[60px] h-[60px] md:w-[30px] md:h-[30px] mb-[10px]" src="/images/home_4.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px] text-center px-[10px] md:text-[13px]">TIN MỚI VÀ ƯU ĐÃI</p>
                    </div>
                    <div className="cursor-pointer flex-1 flex items-center flex-col">
                        <img className="w-[60px] h-[60px] md:w-[30px] md:h-[30px] mb-[10px]" src="/images/home_5.png" alt="" />
                        <p className="font-semibold text-[15px] mb-[7px] text-center px-[10px] md:text-[13px]">ĐẶT NGAY</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center max-w-[1000px] px-[20px] m-auto relative">
                <div className="custom-nav-button-prev triangle-button-prev md:h-[35px] md:mr-[5px]"></div>
                <Swiper
                    loop={true}
                    navigation={
                        {
                            nextEl: '.custom-nav-button-prev',
                            prevEl: '.custom-nav-button-next',
                        }
                        // true
                    }
                    pagination={{
                        clickable: true
                    }}

                    modules={[Navigation, Autoplay, Pagination]}
                    className="mx-h-[100%] w-[1000px] h-[400px] md:h-[300px]"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {
                        banner && banner.map((item) => (
                            <SwiperSlide>
                                <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item}`} alt="" />
                            </SwiperSlide>
                        ))
                    }
                    {/* <SwiperSlide>
                        <img src="/images/combo_meal.png" alt="" />
                    </SwiperSlide>
                    <SwiperSlide><img src="/images/slide_2.jpeg" alt="" className="object-cover" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_3.jpeg" alt="" className="object-cover" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_4.jpeg" alt="" className="object-cover" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_5.jpeg" alt="" className="object-cover" /></SwiperSlide> */}
                </Swiper>
                {/* <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div> */}
                <div className="custom-nav-button-next triangle-button-next md:h-[35px] md:ml-[5px]"></div>
            </div>
            <div className="">
                <div className="flex items-center py-[20px]">
                    <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                    <div className="w-[450px] text-shadow-line text-primary text-[40px] text-center font-primary md:text-[30px]">HOMESTAY SELECTION</div>
                    <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                </div>
                <div>
                    <div className="flex gap-[40px] justify-center flex-wrap">
                        <div onClick={() => navigate('/homestay')} className="basis-[310px] cursor-pointer">
                            <div className="h-[400px] border-[5px] border-[#c8b997] rounded-[80px] overflow-hidden">
                                <img src="images/home_6.png" alt="" className="h-[100%]" />
                            </div>
                            <p className="font-bold text-center mt-[10px]">HOMESTAY SÀI GÒN</p>
                        </div>
                        <div onClick={() => navigate('/room/HABOUR%20HOMESTAY/30')} className="basis-[310px] cursor-pointer">
                            <div className="h-[400px] border-[5px] border-[#c8b997] rounded-[80px] overflow-hidden">
                                <img src="images/home_7.png" alt="" className="h-[100%]" />
                            </div>
                            <p className="font-bold text-center mt-[10px]">HABOUR HOMESTAY</p>
                        </div>
                        <div onClick={() => navigate('/room/GARDEN%20HOMESTAY/31')} className="basis-[310px] cursor-pointer">
                            <div className="h-[400px] border-[5px] border-[#c8b997] rounded-[80px] overflow-hidden">
                                <img src="images/home_8.png" alt="" className="h-[100%]" />
                            </div>
                            <p className="font-bold text-center mt-[10px]">GARDEN HOMESTAY</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[20px]">
                <div className="flex items-center py-[20px]">
                    <div className="flex-1 border-t-[3px] border-dashed h-0 border-primary"></div>
                    <div className="w-[180px] text-shadow-line text-primary text-[40px] text-center font-primary md:text-[30px]">EVENT</div>
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