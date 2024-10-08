// const Contact = (props: { name: string, info: string, add?: string }) => {
//     const { name, info, add } = props
//     return (
//         <div className="flex items-center">
//             <span className="font-bold mr-[5px]">{name}:</span>
//             {info}
//             <span className="italic font-bold ">{add ? ' ' + add : ''}</span>
//         </div>
//     )
// }

const Footer = () => {
    return (
        // <div className="bg-slate-100 py-[20px]">
        //     <div className="py-[15px] max-w-7xl mx-auto flex justify-around">
        //         <div className="">
        //             <p className="mb-[10px]">THÔNG TIN LIÊN HỆ HOMESTAY: </p>
        //             <Contact name="Hotline" info="0941 252 218" add="(Sirena HomeStay)" />
        //             <Contact name="Zalo" info="0941 252 218" add="(Sirena HomeStay)" />
        //             <Contact name="Instagram" info="sirenahomestay" />
        //             <Contact name="Tiktok" info="sirenahomestay" />
        //             <Contact name="Tiktok content" info="taphoanhasirena" />
        //             <Contact name="Email" info="forwork.sirenahomestay@gmail.com" />

        //         </div>
        //         <div className="">
        //             <p className="mb-[10px]">THÔNG TIN LIÊN HỆ BOOKING SALE: </p>
        //             <Contact name="Hotline" info="0933 915 986" add="(Ms Phương Anh)" />
        //             <Contact name="Zalo" info="0933 915 986" add="(Phương Anh)" />
        //             <Contact name="Tiktok content" info="taphoanhasirena" />
        //             <Contact name="Email" info="forwork.sirenahomestay@gmail.com" />
        //         </div>
        //     </div>
        //     <div className="flex justify-around max-w-7xl mx-auto mt-[30px]">
        //         <div>
        //             <img src="/images/qr_homestay.jpeg" className="h-[200px] object-contain" />
        //             <div className="mt-[20px] text-center font-bold text-[30px] italic">Sirena Homestay</div>
        //         </div>
        //         <div>
        //             <img src="/images/qr_sale.jpeg" className="h-[200px] object-contain" />
        //             <div className="mt-[20px] text-center font-bold text-[30px] italic">Ms Phương Anh</div>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-[#e5e1e1] py-[20px] text-center text-[20px] md:text-[15px]">
            <p className="font-bold ">THÔNG TIN LIÊN HỆ</p>
            <div className="">
                <span className="font-bold">Hotline: </span>
                <span>0941 252 218 </span>
                <span className="font-bold italic">(Sirena Homestay)</span>
            </div>
            <div className="">
                <span className="font-bold">Zalo: </span>
                <span>0941 252 218 </span>
                <span className="font-bold italic">(Sirena Homestay)</span>
            </div>
            <div className="">
                <span className="font-bold">Instagram: </span>
                <span>sirenahomestay</span>
            </div>
            <div className="">
                <span className="font-bold">Facebook: </span>
                <span>Sirena Modern Decór HomeStay</span>
            </div>
            <div className="">
                <span className="font-bold">Tiktok: </span>
                <span>sirenahomestay</span>
            </div>
            <div className="">
                <span className="font-bold">Gmail: </span>
                <span>forwork.sirenahomestay@gmail.com</span>
            </div>
        </div>
    )
}



export default Footer