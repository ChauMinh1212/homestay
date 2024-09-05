import { Clear, Close, CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
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
    p: 3,
    pt: 7,
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

const EditEventModal = ({ onClose, open, handleEditEvent, event }) => {
    const [content, setContent] = useState('')
    const [oldImage, setOldImage] = useState(null)
    const [newImage, setNewImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { snackBar, setSnackBar } = useContext(SnackBarContext)

    const formik = useFormik<IEvent>({
        initialValues: {
            title: event?.title || '',
            from: event?.from ? dayjs(event.from, 'DD/MM/YYYY') : dayjs(),
            to: event?.to ? dayjs(event.to, 'DD/MM/YYYY') : dayjs()
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    useEffect(() => {
        setContent(event?.content || '')
        setOldImage(event?.img || null)
    }, [event])

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            let resUpload = []
            if (newImage) {
                const formData = new FormData()
                formData.append(`file[0]`, newImage)
                const res = await axiosInstance.post('upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                resUpload = res.data
            }
            const payload = {
                id: event?.id || 0,
                ...values,
                from: dayjs(values.from).format('YYYY-MM-DD'),
                to: dayjs(values.to).format('YYYY-MM-DD'),
                ...(!oldImage && { img: resUpload[0] || '' }),
                content
            }
            await axiosInstance.post('event/update', payload)
            handleEditEvent({
                ...payload,
                from: dayjs(values.from).format('DD/MM/YYYY'),
                to: dayjs(values.to).format('DD/MM/YYYY'),
                img: newImage ? (resUpload[0] || '') : oldImage
            })
            setSnackBar({
                ...snackBar,
                open: true,
                message: 'Cập nhật chương trình thành công',
                status: 'success'
            })
            onClose()
            setNewImage(null)
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
        setNewImage(selectedFile[0])
        setOldImage(null)
    }

    const handleDeleteImageRoom = (type: number) => { // 0 - old, 1 - new
        type == 0 ? setOldImage(null) : setNewImage(null)
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
                                onChange={(date) => formik.setFieldValue('from', date)}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        helperText: (formik.touched.from ? (formik.errors.from || '') : '') as string,
                                        error: formik.touched.from && Boolean(formik.errors.from),
                                        onBlur: formik.handleBlur,
                                    }
                                }}
                            />
                        </DemoContainer>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Đến ngày"
                                className="w-full !mt-[20px] !mb-[20px]"
                                value={formik.values.to}
                                onChange={(date) => formik.setFieldValue('to', date)}
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
                    {oldImage && (
                        <div className="w-[130px] h-[130px] relative mb-[20px]">
                            <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${oldImage}`} alt="" className="object-cover" />
                            <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteImageRoom(0)}>
                                <IconButton>
                                    <Clear ></Clear>
                                </IconButton>
                            </div>
                        </div>
                    )}
                    {newImage && (
                        <div className="w-[130px] h-[130px] relative mb-[20px]">
                            <img src={URL.createObjectURL(newImage)} alt="" className="object-cover" />
                            <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteImageRoom(1)}>
                                <IconButton>
                                    <Clear ></Clear>
                                </IconButton>
                            </div>
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
                        <VisuallyHiddenInput type="file" onChange={handleUploadImage} />
                    </Button>
                    <LoadingButton color="primary" variant="contained" fullWidth type="submit" className="!mt-[20px]" loading={loading}>
                        Cập nhật
                    </LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default EditEventModal