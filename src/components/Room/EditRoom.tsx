import { Clear, CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as yup from 'yup';
import axiosInstance from "~/axios/axiosConfig";
import SnackBarContext from "~/contexts/SnackBarContext";
import { IRoomData } from "~/pages/HomestayPage/HomestayPage";
import TextEditor from "../Editor/Editor";
import { VisuallyHiddenInput } from "./AddRoom";
import { TYPE_ROOM } from "~/common/contants";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    overflow: 'auto',
    height: '90%'
};

const validationSchema = yup.object({
    id: yup
        .number()
        .required('id is required'),
    code: yup
        .string()
        .required('code is required'),
    name: yup
        .string()
        .required('name is required'),
    description: yup
        .string(),
    address: yup
        .string(),
    price: yup
        .string(),
    quantity: yup
        .number(),
    capacity: yup
        .number(),
    color: yup
        .string()
});

const EditRoomModal = ({ open, onClose, room, handleUpdateRoom }) => {
    const [loading, setLoading] = useState(false)
    const { snackBar, setSnackBar } = useContext(SnackBarContext)
    const [image, setImage] = useState([])
    const [newImage, setNewImage] = useState([])
    const [description, setDescription] = useState(room?.description || '')
    const [district, setDistrict] = useState([])
    const [selectDistrict, setSelectDistrict] = useState(0)
    const [typeRoom, setTypeRoom] = useState(0)

    useEffect(() => {
        setSelectDistrict(room?.district.id || 0)
        setDescription(room?.description || '');
        setImage(room?.img || [])
        setTypeRoom(room?.type || 0)
    }, [room]);

    const formik = useFormik<IRoomData>({
        initialValues: {
            id: room?.id || 0,
            code: room?.code || '',
            name: room?.name || '',
            description: room?.description || '',
            address: room?.address || '',
            price: room?.price || '',
            quantity: room?.quantity || 0,
            capacity: room?.capacity || 0,
            color: room?.color || ''
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleDeleteImageRoom = (index: number) => {

        setImage(prev => {
            const newListImg = [...prev]
            newListImg.splice(index, 1)
            return newListImg
        })
    }

    const handleDeleteNewImageRoom = (index: number) => {
        setNewImage(prev => {
            const newListImg = [...prev]
            newListImg.splice(index, 1)
            return newListImg
        })
    }

    const getDistrictValid = async () => {
        try {
            const res = await axiosInstance.get(`district`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        (async () => {
            const district = await getDistrictValid()
            setDistrict(district)
        })();
    }, [])

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files
        const listImg = []
        for (let i = 0; i < selectedFile.length; i++) {
            listImg.push(selectedFile[i])
        }
        setNewImage(listImg)
    }

    const handleSubmit = async (values) => {
        const data = new FormData();
        newImage.length != 0 && newImage.map((item, index) => {
            data.append(`file[${index}]`, item)
        })
        try {
            setLoading(true)
            const upload = newImage.length != 0 ? await axiosInstance.post('upload', data, { headers: { 'Content-Type': 'multipart/form-data' } }) : { data: [] }
            await axiosInstance.post('room/update', {
                id: values.id,
                code: values.code,
                name: values.name,
                description,
                address: values.address,
                price: values.price,
                quantity: values.quantity,
                capacity: values.capacity,
                color: values.color,
                district_id: selectDistrict,
                img: [...image, ...upload.data],
                type: typeRoom
            })
            onClose()
            handleUpdateRoom({
                ...values,
                description,
                img: [...image, ...upload.data],
                district: district.find(item => item.id == selectDistrict),
                type: typeRoom
            })
            setSnackBar({
                ...snackBar,
                message: 'Cập nhật phòng thành công',
                open: true,
                status: 'success'
            })
            setNewImage([])
        } catch (e) {
            console.log(e);
            setSnackBar({
                ...snackBar,
                message: e.message,
                open: true,
                status: 'error'
            })
        }
        setLoading(false)
    }

    const handleChangeSelect = (e) => {
        setSelectDistrict(e.target.value)
    }

    const handleChangeSelectType = (e) => {
        setTypeRoom(e.target.value)
    }

    return (
        <Modal
            open={open}
            onClose={() => { onClose(); setNewImage([]) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        id="code"
                        name="code"
                        label="Code"
                        className="!mb-[20px]"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code ? (formik.errors.code || '') : ''}
                    />
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Tên phòng"
                        className="!mb-[20px]"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name ? (formik.errors.name || '') : ''}
                    />
                    <FormControl fullWidth className="!mb-[20px]">
                        <InputLabel id="demo-simple-select-label">Quận</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectDistrict}
                            label="Quận"
                            onChange={handleChangeSelect}
                        >
                            {
                                district.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))
                            }
                            <MenuItem key={981203} value={0}>None</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className="!mb-[20px]">
                        <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                        <Select
                            labelId="demo-simple-select-label-type"
                            id="demo-simple-select-type"
                            value={typeRoom}
                            label="Loại"
                            onChange={handleChangeSelectType}
                        >
                            {
                                TYPE_ROOM.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))
                            }
                            {/* <MenuItem key={981203} value={0}>None</MenuItem> */}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Giá"
                        className="!mb-[20px]"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price ? (formik.errors.price || '') : ''}
                    />
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="Địa chỉ"
                        className="!mb-[20px]"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address ? (formik.errors.address || '') : ''}
                    />
                    {/* <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Mô ta"
                        className="!mb-[20px]"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description ? (formik.errors.description || '') : ''}
                    /> */}
                    <TextEditor defaultValue={description} setDescription={setDescription}></TextEditor>
                    <TextField
                        fullWidth
                        id="capacity"
                        name="capacity"
                        label="Sức chứa"
                        className="!mb-[20px] !mt-[20px]"
                        value={formik.values.capacity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                        helperText={formik.touched.capacity ? (formik.errors.capacity || '') : ''}
                    />
                    <TextField
                        fullWidth
                        id="quantity"
                        name="quantity"
                        className="!mb-[20px]"
                        label="Số lượng"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                        helperText={formik.touched.quantity ? (formik.errors.quantity || '') : ''}
                    />
                    {/* <TextField
                        fullWidth
                        id="color"
                        name="color"
                        label="Màu nền"
                        className="!mb-[20px]"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color ? (formik.errors.color || '') : ''}
                    /> */}
                    {(
                        <div className="flex gap-[5px] flex-nowrap overflow-x-auto mb-[20px]">
                            {image.length != 0 && image.map((item, index) => (
                                <div key={index} className="flex-[0_0_130px] h-[130px] relative">
                                    <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item}`} alt="" className="object-cover" />
                                    <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteImageRoom(index)}>
                                        <IconButton>
                                            <Clear ></Clear>
                                        </IconButton>
                                    </div>
                                </div>
                            ))}

                            {newImage.length != 0 && newImage.map((item, index) => (
                                <div key={index} className="flex-[0_0_130px] h-[130px] relative">
                                    <img src={URL.createObjectURL(item)} alt="" className="object-cover" />
                                    <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteNewImageRoom(index)}>
                                        <IconButton>
                                            <Clear ></Clear>
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                    >
                        Thêm hình
                        <VisuallyHiddenInput type="file" multiple onChange={handleUploadImage} />
                    </Button>
                    <LoadingButton color="primary" variant="contained" fullWidth type="submit" className="!mt-[20px]" loading={loading}>
                        Cập nhật
                    </LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default EditRoomModal