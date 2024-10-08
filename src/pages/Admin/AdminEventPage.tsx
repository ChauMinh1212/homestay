import { Delete, Edit } from "@mui/icons-material"
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import AddEventModal from "~/components/Event/AddEventModal"
import DeleteEventModal from "~/components/Event/DeleteEventModal"
import EditEventModal from "~/components/Event/EditEventModal"
import UserContext from "~/contexts/UserContext"



const AdminEventPage = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [event, setEvent] = useState([])
    const [dataEvent, setDataEvent] = useState(null)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

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
        })();
    }, [])

    const handleAddEvent = (value) => {
        setEvent(prev => {
            const newEvent = [...prev, value]
            return newEvent
        })
    }

    const handleEditEvent = (value) => {
        setEvent(prev => {
            const index = prev.findIndex(item => item.id == value.id)
            const newEvent = [...prev]
            newEvent[index] = {
                ...value
            }

            return newEvent
        })
    }

    const handleDeleteEvent = () => {
        setEvent(prev => {
            const newEvent = [...prev]
            return newEvent.filter(item => item.id != dataEvent.id)
        })
    }

    const handleOnClickEdit = (row) => {
        setOpenEdit(true)
        setDataEvent(row)
    }

    const handleOnClickDelete = (row) => {
        setOpenDelete(true)
        setDataEvent(row)
    }

    return (
        <>
            <AddEventModal open={openAdd} onClose={() => setOpenAdd(false)} handleAddEvent={handleAddEvent} />
            <EditEventModal event={dataEvent} open={openEdit} onClose={() => setOpenEdit(false)} handleEditEvent={handleEditEvent}/>
            <DeleteEventModal event={dataEvent} open={openDelete} onClose={() => setOpenDelete(false)} handleDeleteEvent={handleDeleteEvent}/>
            <div className="text-right mb-[20px]">
                <Button onClick={() => setOpenAdd(true)} variant="contained">Thêm event</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="!font-bold">#</TableCell>
                            <TableCell className="!font-bold">Tên chương trình</TableCell>
                            <TableCell className="!font-bold">Thời gian</TableCell>
                            <TableCell className="!font-bold">Mô tả</TableCell>
                            <TableCell className="!font-bold">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {event.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.from + ' - ' + row.to}</TableCell>
                                <TableCell>
                                    <div className="html-output ml-[30px]" dangerouslySetInnerHTML={{ __html: row.content }} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <IconButton color="primary" aria-label="Edit" onClick={() => handleOnClickEdit(row)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" aria-label="Delete" onClick={() => handleOnClickDelete(row)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdminEventPage