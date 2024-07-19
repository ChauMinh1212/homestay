import { LocationOnOutlined, Search, SupervisorAccountOutlined } from '@mui/icons-material';
import { IconButton, styled, TextField } from '@mui/material';
import DateRangePickerWithButtonField from '../DateRangePicker/DateRangePicker';
import { useState } from 'react';

const CssTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        fontSize: '14px'
    },

    '& .MuiInput-underline:after, & .MuiInput-underline:before,  & .MuiInputBase-root:hover .MuiInput-underline:before': {
        border: 'none',
        borderBottom: 'none!important'
    },
});



const DateTimeBooking = () => {
    const [selectItem, setSelectItem] = useState<number>(null)
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto flex justify-center rounded-[50px] border-[2px] max-w-[930px]" style={{color: selectItem ? '#'}}>
                <div onClick={() => setSelectItem(1)} className='cursor-pointer relative flex basis-1/4 items-center gap-[10px] px-[10px] py-[20px] after:absolute after:right-0 after:border-[1px] after:h-[30px] after:w-[1px]' style={selectItem == 1 ? {backgroundColor: '#444'} : {backgroundColor: 'transparent'}}>
                    <div>
                        <LocationOnOutlined className='!text-[30px]'></LocationOnOutlined>
                    </div>
                    <div className='flex-1 pb-[5px]'>
                        <p>Điểm đến</p>
                        <p className='text-[14px] text-[#0000008c]'>Bạn muốn đi đâu?</p>
                    </div>
                </div>
                <DateRangePickerWithButtonField />
                <div onClick={() => setSelectItem(4)} className='flex basis-1/5 items-center gap-[10px] px-[10px] py-[20px]' style={selectItem == 4 ? {backgroundColor: '#444'} : {backgroundColor: 'transparent'}}>
                    <div>
                        <SupervisorAccountOutlined className='!text-[30px]'></SupervisorAccountOutlined>
                    </div>
                    <div className='flex-1'>
                        <p>Khách</p>
                        <CssTextField
                            className="w-[40px] !text-[15px]"
                            defaultValue={1}
                            variant="standard"
                            type='number'
                            inputProps={{ min: 1, max: 10, className: '!text-[#0000008c]' }}
                            
                        />
                    </div>
                </div>
                <div className='flex items-center justify-center p-[20px]'>
                    <IconButton type='submit' className='!bg-primary'>
                        <Search className='text-white !text-[30px]'/>
                    </IconButton>
                </div>
            </form>
        </>
    );
};

export default DateTimeBooking;
