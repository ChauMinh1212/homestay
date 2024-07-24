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
    const [description, setDescription] = useState(room?.description || '')
    const [district, setDistrict] = useState([])
    const [selectDistrict, setSelectDistrict] = useState(0)

    useEffect(() => {
        setSelectDistrict(room?.district.id || 0)
        setDescription(room?.description || '');
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
        const newListImg = [...image]
        newListImg.splice(index, 1)
        setImage(newListImg)
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
        setImage(listImg)
    }

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const data = new FormData();
            data.append('id', values.id);
            data.append('code', values.code);
            data.append('name', values.name);
            data.append('description', description);
            data.append('address', values.address);
            data.append('price', values.price);
            data.append('quantity', values.quantity);
            data.append('capacity', values.capacity);
            data.append('color', values.color);
            selectDistrict && data.append('district_id', selectDistrict.toString());
            image.length != 0 && image.map((item, index) => {
                data.append(`img[${index}]`, item)
            })
            const res = await axiosInstance.post('room/update', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setLoading(false)
            onClose()
            handleUpdateRoom({
                ...values,
                description,
                img: res.data.img
            })
            setSnackBar({
                ...snackBar,
                message: 'Cập nhật phòng thành công',
                open: true,
                status: 'success'
            })
        } catch (error) {
            setLoading(false)
            setSnackBar({
                ...snackBar,
                message: error.message,
                open: true,
                status: 'error'
            })
        }
    }

    const handleChangeSelect = (e) => {
        setSelectDistrict(e.target.value)
    }

    return (
        <Modal
            open={open}
            onClose={() => { onClose() }}
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