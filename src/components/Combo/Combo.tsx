import styled from "@emotion/styled";
import { Menu } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";

const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 0;
  }
  .MuiPaper-root {
    border-radius: 10px;
  }
`;

const Combo = ({ handleComboClickEx, combo_list }) => {
    const [combo, setCombo] = useState(['COMBO', 'THỜI GIAN'])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickIn = (name, time, inday, disabled) => {
        if(disabled){
            return
        }
        setCombo([name, time[0] + ' - ' + time[1] + (inday == 1 ? '' : ' hôm sau')])
        handleComboClickEx(time, inday)
        handleClose()
    }
    return (
        <div>
            <div className="w-[70%] mx-auto cursor-pointer mb-[10px]" onClick={handleClick}>
                <div className="flex border-[1px] border-black rounded-[20px]">
                    <div className="flex-1 border-r-[1px] border-r-black px-[20px] py-[10px] flex justify-between items-center">
                        <p className="font-semibold text-[14px] text-[#8f7a5a]">{combo[0]}</p>
                        <div className="rectangle-down-picker"></div>
                    </div>
                    <div className="flex-1 px-[20px] py-[10px] text-right flex justify-center items-center">
                        <p className="font-semibold text-[14px]">{combo[1]}</p>
                    </div>
                </div>
            </div>
            <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <div className="w-[400px] border-t-[1px] border-l-[1px] border-r-[1px] border-black rounded-[10px] overflow-hidden">
                    {
                        combo_list && combo_list.map((item, index) => (
                            <div key={index} className={clsx(
                                'flex px-[10px] py-[5px] justify-between border-b-[1px] border-b-black',
                                item.disabled ? 'cursor-not-allowed bg-[#d3d3d3]' : 'cursor-pointer'
                                )} onClick={() => handleClickIn(item.name, item.time, item.inday, item?.disabled)}>
                                <div className="text-[#8f7a5a] font-semibold">
                                    {item.name}
                                </div>
                                <div className="font-semibold">
                                    {item.time[0] + ' - ' + item.time[1] + (item.inday == 1 ? '' : ' hôm sau')}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </StyledMenu>
        </div>
    )
}

export default Combo