import { Add, Delete, Edit } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import axiosInstance from "~/axios/axiosConfig"
import UserContext from "~/contexts/UserContext"
import { IRoomData } from "~/pages/HomestayPage/HomestayPage"
import AddRoomModal from "./AddRoom"
import DeleteRoomModal from "./DeleteRoom"
import EditRoomModal from "./EditRoom"

const ListRoom = () => {
    const [room, setRoom] = useState<IRoomData[]>([])
    const [openModalEditRoom, setOpenModalEditRoom] = useState(false)
    const [openModalAddRoom, setOpenModalAddRoom] = useState(false)
    const [openModalDeleteRoom, setOpenModalDeleteRoom] = useState(false)
    const [roomEdit, setRoomEdit] = useState<IRoomData>(null)
    const [roomIdDelete, setRoomIdDelete] = useState<number>(null)
    const { user } = useContext(UserContext)

    useEffect(() => {
        (async () => {
            const room = await axiosInstance.get('room');
            setRoom(room.data)
        })();
    }, [])

    const handleOnClickEdit = (data: IRoomData) => {
        setOpenModalEditRoom(true)
        setRoomEdit(data)
    }

    const handleOnClickAdd = () => {
        setOpenModalAddRoom(true)
    }

    const handleOnClickDelete = (id: number) => {
        setOpenModalDeleteRoom(true)
        setRoomIdDelete(id)
    }

    const handleUpdateRoom = (values: IRoomData) => {
        const index = room.findIndex(item => item.id == values.id)
        const newRoomArray = [...room]
        newRoomArray[index] = values
        setRoom(newRoomArray)
    }

    const handleAddRoom = (values: IRoomData) => {
        const newArray = [...room, values]
        setRoom(newArray)
    }

    const handleDeleteRoom = () => {
        const newArray = room.filter(item => item.id != roomIdDelete)
        setRoom(newArray)
    }

    const handleCloseModalEditRoom = () => {
        setOpenModalEditRoom(false)
    }

    const handleCloseModalAddRoom = () => {
        setOpenModalAddRoom(false)
    }

    const handleCloseModalDeleteRoom = () => {
        setOpenModalDeleteRoom(false)
    }

    return (
        <>
            <EditRoomModal open={openModalEditRoom} onClose={handleCloseModalEditRoom} room={roomEdit} handleUpdateRoom={handleUpdateRoom} />
            <AddRoomModal open={openModalAddRoom} onClose={handleCloseModalAddRoom} handleAddRoom={handleAddRoom} />
            <DeleteRoomModal open={openModalDeleteRoom} onClose={handleCloseModalDeleteRoom} room={roomIdDelete} handleDeleteRoom={handleDeleteRoom}/>
            <div className="flex flex-col gap-[20px] max-w-7xl mx-auto my-[40px] text-left">
                {room.map((item, index) => (
                    <div key={index} className="rounded-[30px] flex items-center p-[10px] gap-[20px] relative" style={{ backgroundColor: `${item.color || '#AB9D80'}` }}>
                        <div className="w-[30%] rounded-[30px] overflow-hidden relative">
                            <div className="pt-[100%] bg-cover" style={{ backgroundImage: `url('${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item.img[0]}')` }}></div>
                            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-[900] text-[100px] text-nowrap text-line-[2px_#645533]">{item.code}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[30px] font-[600]">{item.name}</p>
                            <p className="text-[20px] mt-[15px]"><span className="font-bold">Địa chỉ: </span>{item.address}</p>
                            <p className="text-[20px] mt-[15px]"><span className="font-bold">Giá: </span>{item.price}</p>
                            <p className="text-[20px] mt-[15px]"><span className="font-bold">Dịch vụ: </span>{item.description}</p>
                            <p className="text-[20px] mt-[15px]"><span className="font-bold">Số người ở: </span>{item.capacity}</p>
                            {user?.role == 1 && <p className="text-[20px] mt-[15px]"><span className="font-bold">Số lượng: </span>{item.quantity}</p>}
                        </div>
                        {user?.role == 1 && <div className="absolute top-[20px] right-[20px]">
                            <Tooltip title="Sửa phòng">
                                <IconButton onClick={() => handleOnClickEdit(item)}>
                                    <Edit></Edit>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xoá phòng">
                                <IconButton onClick={() => handleOnClickDelete(item.id)}>
                                    <Delete></Delete>
                                </IconButton>
                            </Tooltip>
                        </div>}
                    </div>
                ))}
                {user?.role == 1 && <div className="text-center z-10">
                    <Tooltip title="Thêm phòng">
                        <IconButton onClick={handleOnClickAdd}>
                            <Add></Add>
                        </IconButton>
                    </Tooltip>
                </div>}
            </div>
        </>

    )
}

export default ListRoom