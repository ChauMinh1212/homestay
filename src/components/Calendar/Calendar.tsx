import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

type ValuePiece = Date | null ;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarC = ({ onCalenderChange }) => {
  const [value, setValue] = useState<Value>([new Date(), new Date(new Date().getTime() + 86400000)]);
  
  const handleOnChange = (value, event) => {
    setValue(value)
    onCalenderChange(value.map(item => moment(item).format('YYYY/MM/DD')))
  }
  
  return (
    <div>
      <p><span className="font-semibold">Ngày đến, đi:</span> {Array.isArray(value) ? `${moment(value[0]).format('DD/MM/YYYY')} - ${moment(value[1]).format('DD/MM/YYYY')}` : value.toLocaleDateString()}</p>
      <p className="mb-[20px]"><span className="font-semibold">Số đêm:</span> {moment(value[1]).diff(value[0], 'day')}</p>
      <Calendar onChange={handleOnChange} defaultValue={value} selectRange={true} minDate={new Date()}/>
    </div>
  );
}

export default CalendarC