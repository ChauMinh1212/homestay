import { Clear, CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from 'yup';
import axiosInstance from "~/axios/axiosConfig";
import SnackBarContext from "~/contexts/SnackBarContext";
import TextEditor from "../Editor/Editor";
import { VisuallyHiddenInput } from "../Room/AddRoom";

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
    maxHeight: '90%'
    // maxHeight: '700px',
};

interface IEvent {
    title: string
    from: Dayjs
    to: Dayjs
}

const validationSchema = yup.object({
    title: yup
        .string()
        .required('title is required'),
    from: yup
        .date()
        .required(' is required'),
    to: yup
        .date()
        .required('name is required'),

});

const AddEventModal = ({ onClose, open, handleAddEvent }) => {
    const [content, setContent] = useState('')
    const [image, setImage] = useState([])
    const [loading, setLoading] = useState(false)
    const {snackBar, setSnackBar} = useContext(SnackBarContext)

    const formik = useFormik<IEvent>({
        initialValues: {
            title: '',
            from: dayjs(),
            to: dayjs()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            let resUpload = []
            if (image.length != 0) {
                const formData = new FormData()
                image.map((item, index) => formData.append(`file[${index}]`, item))
                const res = await axiosInstance.post('upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                resUpload = res.data
            }
            const res = await axiosInstance.post('event/create', {
                ...values,
                from: dayjs(values.from).format('YYYY-MM-DD'),
                to: dayjs(values.to).format('YYYY-MM-DD'),
                img: resUpload[0] || '',
                content
            })
            handleAddEvent(res.data)
            setSnackBar({
                ...snackBar,
                open: true,
                message: 'Tạo chương trình thành công',
                status: 'success'
            })
            onClose()
        } catch (e) {
            setSnackBar({
                ...snackBar,
                open: true,
                message: e.message,
                status: 'error'
            })
        }
        setLoading(false)
    }

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
                        id="title"
                        name="title"
                        label="Tên chương trình"
                        className="!mb-[20px]"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title ? (formik.errors.title || '') : ''}
                    />
                    <TextEditor defaultValue={content} setDescription={setContent}></TextEditor>
                    <div className="mt-[20px]"></div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Từ ngày"
                                className="w-full"
                                value={formik.values.from}
                                onChange={formik.handleChange}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        helperText: (formik.touched.from ? (formik.errors.from || '') : '') as string,
                                        error: formik.touched.from && Boolean(formik.errors.from),
                                        onBlur: formik.handleBlur
                                    }
                                }}
                            />
                        </DemoContainer>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Đến ngày"
                                className="w-full !mt-[20px] !mb-[20px]"
                                value={formik.values.to}
                                onChange={formik.handleChange}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        helperText: (formik.touched.to ? (formik.errors.to || '') : '') as string,
                                        error: formik.touched.to && Boolean(formik.errors.to),
                                        onBlur: formik.handleBlur
                                    }
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
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

export default AddEventModal