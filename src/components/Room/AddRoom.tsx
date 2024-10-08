import { Clear, Close, CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import axiosInstance from "~/axios/axiosConfig";
import { TYPE_ROOM } from "~/common/contants";
import { IRoomData } from "~/pages/HomestayPage/HomestayPage";
import TextEditor from "../Editor/Editor";
import { showSnackbar } from "../SnackBarCustom/SnackBarSlice";

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    pt: 7,
    borderRadius: '10px',
    overflow: 'auto',
    height: '90%'
    // maxHeight: '700px',
};

const validationSchema = yup.object({
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

const AddRoomModal = ({ open, onClose, handleAddRoom }) => {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([])

    const [description, setDescription] = useState('')
    const [district, setDistrict] = useState([])
    const [selectDistrict, setSelectDistrict] = useState(0)
    const [typeRoom, setTypeRoom] = useState(0)
    const dispatch = useDispatch()

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

    const formik = useFormik<IRoomData>({
        initialValues: {
            code: '',
            name: '',
            description: '',
            address: '',
            price: '',
            quantity: 0,
            capacity: 0,
            color: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files
        const listImg = []
        for (let i = 0; i < selectedFile.length; i++) {
            listImg.push(selectedFile[i])
        }
        setImage(listImg)
    }

    const handleDeleteImageRoom = (index: number) => {
        const newListImg = [...image]
        newListImg.splice(index, 1)
        setImage(newListImg)
    }

    const handleSubmit = async (values) => {
        try {
            const data = new FormData();
            data.append('code', values.code);
            data.append('name', values.name);
            data.append('description', description);
            data.append('address', values.address);
            data.append('price', values.price);
            data.append('quantity', values.quantity);
            data.append('capacity', values.capacity);
            data.append('color', values.color);
            data.append('type', `${typeRoom}`);
            selectDistrict && data.append('district_id', selectDistrict.toString());
            image.map((item, index) => {
                data.append(`img[${index}]`, item)
            })
            setLoading(true)
            const res = await axiosInstance.post('room/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setLoading(false)
            onClose()
            handleAddRoom({
                ...values,
                id: res.data.id,
                img: res.data.img
            })
            dispatch(showSnackbar({message: 'Thêm phòng thành công', status: 'success'}))
        } catch (error) {
            setLoading(false)
            dispatch(showSnackbar({message: error.message, status: 'error'}))

        }
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
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
        >

            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>
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
                        className="!mb-[20px]"
                        label="Màu nền"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color ? (formik.errors.color || '') : ''}
                    /> */}

                    {image.length != 0 && (
                        <div className="flex gap-[5px] flex-nowrap overflow-x-auto mb-[20px]">
                            {image.map((item, index) => (
                                <div key={index} className="flex-[0_0_130px] h-[130px] relative">
                                    <img src={URL.createObjectURL(item)} alt="" className="object-cover" />
                                    <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteImageRoom(index)}>
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
                        <VisuallyHiddenInput type="file" onChange={handleUploadImage} multiple />
                    </Button>
                    <LoadingButton color="primary" variant="contained" fullWidth type="submit" className="!mt-[20px]" loading={loading}>
                        Thêm mới
                    </LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default AddRoomModal