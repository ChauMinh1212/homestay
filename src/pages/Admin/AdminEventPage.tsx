import { Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import AddEventModal from "~/components/Event/AddEventModal"
import UserContext from "~/contexts/UserContext"



const AdminEventPage = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [event, setEvent] = useState([])
    const [openAdd, setOpenAdd] = useState(false)

    const getAllEvent = async () => {
        try {
            const res = await axiosInstance.get('event')
            return res.data
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (!user || user.role != 1) { navigate('/') }
        (async () => {
            const data = await getAllEvent()
            setEvent(data)
            console.log(data);

        })();
    }, [])

    const handleAddEvent = (value) => {
        setEvent(prev => {
            const newEvent = [...prev, value]
            return newEvent
        })
    }

    return (
        <>
            <AddEventModal open={openAdd} onClose={() => setOpenAdd(false)} handleAddEvent={handleAddEvent} />
            <div className="text-right mb-[20px]">
                <Button onClick={() => setOpenAdd(true)} variant="contained">Thêm phòng</Button>
            </div>

        </>
    )
}

export default AdminEventPage