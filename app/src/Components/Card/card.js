import { Link } from 'react-router-dom';
import './card-style.css';
import { useRef, useEffect, useState } from 'react';
import { updateStatus } from '../../Services/events';
export default function Card({id,title, date, time, location,description,role, status}) {
    const [selectedStatus, setSelectedStatus] = useState(status==="null"?("Not Going"):(status));
    const firstRender = useRef(true);

useEffect(() => {
    if (firstRender.current) {
        firstRender.current = false;
        return;
    }
    const sendStatus = async () => {
        try {
            await updateStatus(id, selectedStatus);
        } catch (e) {
            console.log("Status update failed:", e);
        }
    };
    sendStatus();
}, [id, selectedStatus]);

    return (
        <>
        <div className={"card"} style={{width: "18rem"}}>
            <Link to={role==="organizer"?(`/event/${id}/${title}/${date}/${time}/${location}/${role}/${description}`):("/")} className={"card-link"}>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>{title}</h5>
                    <div className={"card-date-time-wrapper"}>
                        <h6 className={"card-date"}>{date}</h6>
                        <h6 className={"card-time"}>{time}</h6>
                    </div>
                    <h6 className={"card-location"}>{location}</h6>
                    <h6 className={"card-location"}>{role}</h6>
                    <p className={"card-description"}>{description}</p>
                    {role==="attendee"?(
                        <div class="card-status">
                            <p>Coming?</p>
                            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                <option value="Not Going">Not Going</option>
                                <option value="Going">Going</option>
                                <option value="Maybe">Maybe</option>
                            </select>
                        </div>
                    ):(<></>)}
                </div>
            </Link>
        </div>
        </>
    )
}