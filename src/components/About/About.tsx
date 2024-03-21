import 'animate.css/animate.compat.css';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import WOW from 'wow.js';
import Logo from "../Logo/Logo";
import "./About.css"

const About = () => {
    useEffect(() => {
        new WOW({
            live: true,
            animateClass: 'animated',
        }).init();
    }, [])

    return (

        <div className="bg-slate-100 py-[20px]">
            <div className="px-[25px]">
                <Swiper
                    loop={true}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mx-h-[100%] h-[500px] rounded-[10px]"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide><img src="/images/slide_1.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_2.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_3.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_4.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="/images/slide_5.jpeg" alt="" /></SwiperSlide>
                </Swiper>
            </div>
            <Logo></Logo>
            <div className="text-[18px] font-second font-[300] max-w-5xl mx-auto  px-[10px]">
                <div className="flex gap-[20px] sm:flex-col">
                    <div className="wow fadeInRight flex-1 h-[300px]" data-wow-offset="10" data-wow-duration="2s">
                        <img src="/images/about_1.jpeg" alt="" className="object-cover" />
                    </div>
                    <div className="wow fadeInLeft flex-1" data-wow-offset="10">
                        <div>
                            Sirena HomeStay là một chuỗi hệ thống HomeStay nằm ngay tại trung tâm thành phố Hồ Chí Minh.
                            Bên cạnh đó, Sirena Resort HomeStay nằm ngay bến phà Cát Lái Quận 9. Là một cồn đảo nhỏ, bao quanh bởi sông nước, cùng nhiều loại hình dịch vụ du lịch hấp dẫn nằm ngay sát trung tâm Sài Gòn
                        </div>
                        <div className="mt-[10px]">
                            Đức là bên cung cấp viện trợ quân sự lớn thứ hai cho Ukraine, sau Mỹ, từ khi chiến sự bùng phát tháng 2/2022
                        </div>
                    </div>
                </div>
                <div className="flex gap-[20px] sm:flex-col mt-[20px]">
                    <div className="wow fadeInLeft flex-1" data-wow-offset="10">
                        <div>
                            Sirena HomeStay là một chuỗi hệ thống HomeStay nằm ngay tại trung tâm thành phố Hồ Chí Minh.
                            Bên cạnh đó, Sirena Resort HomeStay nằm ngay bến phà Cát Lái Quận 9. Là một cồn đảo nhỏ, bao quanh bởi sông nước, cùng nhiều loại hình dịch vụ du lịch hấp dẫn nằm ngay sát trung tâm Sài Gòn
                        </div>
                        <div className="mt-[10px]">
                            Đức là bên cung cấp viện trợ quân sự lớn thứ hai cho Ukraine, sau Mỹ, từ khi chiến sự bùng phát tháng 2/2022
                        </div>
                    </div>
                    <div className="wow fadeInRight flex-1 h-[300px]" data-wow-offset="10" data-wow-duration="2s">
                        <img src="/images/about_1.jpeg" alt="" className="object-cover" />
                    </div>
                </div>
                <div className="flex gap-[20px] sm:flex-col">
                    <div className="wow fadeInRight flex-1 h-[300px]" data-wow-offset="10" data-wow-duration="2s">
                        <img src="/images/about_1.jpeg" alt="" className="object-cover" />
                    </div>
                    <div className="wow fadeInLeft flex-1" data-wow-offset="10">
                        <div>
                            Sirena HomeStay là một chuỗi hệ thống HomeStay nằm ngay tại trung tâm thành phố Hồ Chí Minh.
                            Bên cạnh đó, Sirena Resort HomeStay nằm ngay bến phà Cát Lái Quận 9. Là một cồn đảo nhỏ, bao quanh bởi sông nước, cùng nhiều loại hình dịch vụ du lịch hấp dẫn nằm ngay sát trung tâm Sài Gòn
                        </div>
                        <div className="mt-[10px]">
                            Đức là bên cung cấp viện trợ quân sự lớn thứ hai cho Ukraine, sau Mỹ, từ khi chiến sự bùng phát tháng 2/2022
                        </div>
                    </div>
                </div>
                <div className="flex gap-[20px] sm:flex-col mt-[20px]">
                    <div className="wow fadeInLeft flex-1" data-wow-offset="10">
                        <div>
                            Sirena HomeStay là một chuỗi hệ thống HomeStay nằm ngay tại trung tâm thành phố Hồ Chí Minh.
                            Bên cạnh đó, Sirena Resort HomeStay nằm ngay bến phà Cát Lái Quận 9. Là một cồn đảo nhỏ, bao quanh bởi sông nước, cùng nhiều loại hình dịch vụ du lịch hấp dẫn nằm ngay sát trung tâm Sài Gòn
                        </div>
                        <div className="mt-[10px]">
                            Đức là bên cung cấp viện trợ quân sự lớn thứ hai cho Ukraine, sau Mỹ, từ khi chiến sự bùng phát tháng 2/2022
                        </div>
                    </div>
                    <div className="wow fadeInRight flex-1 h-[300px]" data-wow-offset="10" data-wow-duration="2s">
                        <img src="/images/about_1.jpeg" alt="" className="object-cover" />
                    </div>
                </div>
            </div>
            <div className="px-[25px]">
                <Swiper
                    loop={true}
                    navigation={true}
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    modules={[Navigation, Autoplay]}
                    className="mx-h-[100%] h-[300px] mt-[30px]"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide className="w-[50%] relative booking">
                        <Link to="https://www.facebook.com/profile.php?id=100087459135207" target="_blank">
                            <img src="/images/banner_1.png" alt="" className="object-contain" />
                            <img src="/images/banner_1_1.png" alt="" className="object-contain absolute bottom-[1%] h-[90px] w-full hidden add" />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide className="w-[30%] relative booking">
                        <Link to="https://www.facebook.com/profile.php?id=100087459135207" target="_blank">
                            <img src="/images/banner_2.png" alt="" className="object-cover" />
                            <img src="/images/banner_1_1.png" alt="" className="object-contain absolute bottom-[1%] h-[90px] w-full hidden add" />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide className="w-[30%] relative booking">
                        <Link to="https://www.facebook.com/profile.php?id=100087459135207" target="_blank">
                            <img src="/images/banner_3.png" alt="" className="object-cover" />
                            <img src="/images/banner_1_1.png" alt="" className="object-contain absolute bottom-[1%] h-[90px] w-full hidden add" />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide className="w-[30%] relative booking">
                        <Link to="https://www.facebook.com/profile.php?id=100087459135207" target="_blank">
                            <img src="/images/banner_4.png" alt="" className="object-cover" />
                            <img src="/images/banner_1_1.png" alt="" className="object-contain absolute bottom-[1%] h-[90px] w-full hidden add" />
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default About