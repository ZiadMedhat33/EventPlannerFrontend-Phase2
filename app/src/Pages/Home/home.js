import React, { useEffect, useState } from "react";
import { SearchAndFilter } from '../../Services/events';
import Card from '../../Components/Card/card';
import EventFilter from "../../Components/Filter/Filter";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [keywords, setKeywords] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [role, setRole] = useState("");
    async function loadEvents() {
        const data = await SearchAndFilter(keywords, minDate, maxDate, role);
        setEvents(data);
    }
    function handleFilterChange(filters) {
        setKeywords(filters.keywords);
        setMinDate(filters.minDate);
        setMaxDate(filters.maxDate);
        setRole(filters.roles);
    }
    useEffect(() => {
        loadEvents();
    }, [keywords, maxDate, minDate, role]);
    return (
        <>
            <EventFilter onFilterChange={handleFilterChange} />
            <h1><center>Events</center></h1>
            <div className="cards-grid">
                {!Array.isArray(events) || events.length === 0 ? (
                    <h1>No events</h1>
                ) : (
                    events.map(event => (
                        <Card
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.event_date}
                            time={event.event_time}
                            location={event.location}
                            description={event.description}
                            role={event.role}
                            status={event.status}
                        />
                    ))
                )}
            </div>
        </>
    );
}
