import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';

// Register Spanish locale
registerLocale('es', es);

const CustomDatePicker = ({ placeholder, selectedDate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Custom header to match the design: < Month >   < Year >
    const renderCustomHeader = ({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
    }) => {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
        ];

        return (
            <div className="react-datepicker__header-custom">
                {/* Month Navigator */}
                <div className="header-nav-group">
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} type="button">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="header-label">{months[date.getMonth()]}</span>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type="button">
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Year Navigator */}
                <div className="header-nav-group">
                    <button onClick={() => changeYear(date.getFullYear() - 1)} type="button">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="header-label">{date.getFullYear()}</span>
                    <button onClick={() => changeYear(date.getFullYear() + 1)} type="button">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="custom-datepicker-container">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                    onChange(date);
                    setIsOpen(false);
                }}
                locale="es"
                dateFormat="dd/MM/yyyy"
                placeholderText={placeholder}
                className="custom-datepicker-input"
                renderCustomHeader={renderCustomHeader}
                formatWeekDay={nameOfDay => nameOfDay.substr(0, 2)}
                calendarClassName="custom-calendar-popup"
                onInputClick={() => setIsOpen(true)}
                onClickOutside={() => setIsOpen(false)}
                open={isOpen}
                shouldCloseOnSelect={true} // Close explicitly handled above but this helps too
                preventOpenOnFocus={true} // prevent default focus opening to handle with click
                autoComplete="off"
            />
            <div className="datepicker-icon" onClick={() => setIsOpen(!isOpen)}>
                <CalendarIcon size={18} color="#888" />
            </div>
        </div>
    );
};

export default CustomDatePicker;
