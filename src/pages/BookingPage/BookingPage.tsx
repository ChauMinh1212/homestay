import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"

const BookingPage = () => {
    const {roomId} = useParams()

    const getDateDetail = async (roomId: number) => {
        try {
            const res = await axiosInstance.get(`room/date-valid?id=${roomId}`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        (async () => {
            const timeDetail = await getDateDetail(+roomId)
            console.log(timeDetail);
            
        })();
    }, [])
    
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex">

            </div>
        </div>
    )
}

export default BookingPage