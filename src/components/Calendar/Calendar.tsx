import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import moment from 'moment'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarC = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div>
      <p><span className="font-semibold">Ngày đến, đi:</span> {Array.isArray(value) ? `${moment(value[0]).format('DD/MM/YYYY')} - ${moment(value[1]).format('DD/MM/YYYY')}` : value.toLocaleDateString()}</p>
      <p className="mb-[20px]"><span className="font-semibold">Số đêm:</span> {moment(value[1]).diff(value[0], 'day')}</p>
      <Calendar onChange={onChange} value={value} selectRange={true}/>
    </div>
  );
}

export default CalendarC