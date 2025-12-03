import React, { useState, useEffect } from "react";
import "./filter.style.css";
export default function EventFilter({ onFilterChange }) {
    const [keywords, setKeywords] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [roles, setRoles] = useState("");
    useEffect(() => {
        onFilterChange({ keywords, minDate, maxDate, roles });
    }, [keywords, minDate, maxDate, roles, onFilterChange]);
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
            />
            <div className="date-group">
                <input
                type="date"
                value={minDate}
                onChange={(e) => setMinDate(e.target.value)}
                />
                <input
                    type="date"
                    value={maxDate}
                    min={minDate}
                    onChange={(e) => setMaxDate(e.target.value)}
                />
            </div>
            <select value={roles} onChange={(e) => setRoles(e.target.value)}>
                <option value="">All roles</option>
                <option value="organizer">Organizer</option>
                <option value="attendee">Attendee</option>
            </select>
        </div>
    );
}