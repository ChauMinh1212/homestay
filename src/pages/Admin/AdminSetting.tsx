import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "~/contexts/UserContext"

const AdminSetting = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user || user.role != 1) navigate('/')
    }, [])

    return (
        <>
            <div>
                <p>Quản lý banner</p>
                
            </div>
        </>
    )
}

export default AdminSetting