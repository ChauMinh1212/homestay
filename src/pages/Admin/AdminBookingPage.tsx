import { LoadingButton } from "@mui/lab"
import { Autocomplete, TextField } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateRange, MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import SnackBarContext from "~/contexts/SnackBarContext"
import UserContext from "~/contexts/UserContext"

const AdminBookingPage = () => {
    const { user } = useContext(UserContext)
    const { snackBar, setSnackBar } = useContext(SnackBarContext)
    const navigate = useNavigate()
    const [listUser, setListUser] = useState([])
    const [listRoom, setListRoom] = useState([])
    const [date, setDate] = useState<DateRange<any>>([null, null])
    const [userSelect, setUserSelect] = useState(null)
    const [roomSelect, setRoomSelect] = useState(null)
    const [loading, setLoading] = useState(false)

    const getAllUser = async () => {
        try {
            const res = await axiosInstance.get('user')
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    const getAllRoom = async () => {
        try {
            const res = await axiosInstance.get(`room`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitBooking = async () => {
        if (!date[0] || !date[1] || !userSelect || !roomSelect) {
            setSnackBar({
                ...snackBar,
                status: 'error',
                open: true,
                message: 'Vui lòng điền đầy đủ thông tin'
            })
        }
        const body = {
            id: roomSelect.id,
            user_id: userSelect.id,
            from: dayjs(date[0]).format('YYYY-MM-DD HH:mm'),
            to: dayjs(date[1]).format('YYYY-MM-DD HH:mm'),
        }
        try {
            setLoading(true)
            await axiosInstance.post('booking/admin-create', body)
            setSnackBar({
                ...snackBar,
                open: true,
                status: 'success',
                message: 'Booking thành công'
            })
        } catch (e) {
            setSnackBar({
                ...snackBar,
                open: true,
                status: 'error',
                message: 'Lỗi'
            })
        }
        setLoading(false)
    }

    const handleChangeDate = (value) => {
        setDate(value)
    }

    const handleChangeUserSelect = (_, value) => {
        setUserSelect(value)
    }

    const handleChangeRoomSelect = (_, value) => {
        setRoomSelect(value)
    }

    useEffect(() => {
        if (!user || user.role != 1) { navigate('/') }
        (async () => {
            const [users, rooms] = await Promise.all([getAllUser(), getAllRoom()])
            setListUser(users)
            setListRoom(rooms)
        })();
    }, [])
    return (
        <div className="max-w-2xl mx-auto">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                    components={[
                        'MultiInputDateTimeRangeField',
                    ]}
                >
                    <MultiInputDateTimeRangeField
                        slotProps={{
                            textField: ({ position }) => ({
                                label: position === 'start' ? 'Check-in' : 'Check-out',
                            }),
                        }}
                        format="DD-MM-YYYY H:mm"
                        minutesStep={30}
                        ampm={false}
                        value={date}
                        onChange={handleChangeDate}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <Autocomplete
                disablePortal
                id="select-user"
                options={listUser.map(item => ({ label: item.phone, phone: item.phone, name: item.username, id: item.id }))}
                renderOption={(props: any, option: any) => {
                    const { key, ...optionProps } = props;
                    return (
                        <div {...optionProps} key={Math.floor(Math.random() * 1000)} className="flex justify-between px-[20px] py-[10px] cursor-pointer hover:bg-slate-200" >
                            <div>{option.name}</div>
                            <div>{option.phone}</div>
                        </div>
                    )
                }}
                renderInput={(params) => <TextField {...params} label="Phone user" />}
                sx={{ width: '100%', marginTop: '20px' }}
                value={userSelect}
                onChange={handleChangeUserSelect}
            />
            <Autocomplete
                disablePortal
                id="select-room"
                options={listRoom.map(item => ({ label: item.code, id: item.id }))}
                renderInput={(params) => <TextField {...params} label="Room" />}
                sx={{ width: '100%', marginTop: '20px' }}
                value={roomSelect}
                onChange={handleChangeRoomSelect}
            />
            <LoadingButton loading={loading} onClick={handleSubmitBooking} fullWidth sx={{ margin: '20px auto' }} variant="contained">Đặt phòng</LoadingButton>
        </div>
    )
}

export default AdminBookingPage