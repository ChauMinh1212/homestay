import { Box, Modal, TextField } from "@mui/material"
import { useFormik } from "formik";
import * as yup from 'yup'

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
    // maxHeight: '700px',
};

interface IEvent {
    title: string
    content: string
    img: string
    from: string
    to: string
}

const validationSchema = yup.object({
    title: yup
        .string()
        .required('code is required'),
    content: yup
        .string()
        .required('name is required'),
    img: yup
        .string(),
    from: yup
        .string(),
    to: yup
        .string()
});

const AddEventModal = ({ onClose, open, handleAddEvent }) => {
    const formik = useFormik<IEvent>({
        initialValues: {
            title: '',
            content: '',
            img: '',
            from: '',
            to: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleSubmit = (values) => {

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

export default AddEventModal