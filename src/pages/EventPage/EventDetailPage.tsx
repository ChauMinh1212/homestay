import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import { IEvent } from "~/common/interface"

const EventDetailPage = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState<IEvent>(null)
    const [htmlContent, setHtmlContent] = useState('')

    const getDetailEvent = async () => {
        try {
            const res = await axiosInstance.get(`event/${eventId}`)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        (async () => {
            const event = await getDetailEvent()
            setEvent(event)
            setHtmlContent(event.content)
        })();
    }, [])

    return (
        <div className="max-w-5xl mx-auto px-[30px]">
            {event && (
                <>
                    <p className="text-[#cc3432] text-[25px] mb-[20px] font-semibold">{event.title.toUpperCase()}</p>
                    <div className="flex md:flex-col mb-[20px]">
                        <div className="basis-[36.5%] md:w-full md:mb-[20px]">
                            <img className="w-full" src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${event.img}`} alt="" />
                        </div>
                        <div className="flex-1 html-output ml-[30px]" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                </>
            )}
        </div>
    )
}

export default EventDetailPage