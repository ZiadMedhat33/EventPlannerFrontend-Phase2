import './List-style.css';
import { useEffect, useState } from "react";
import { getAttendees, inviteAttendee } from '../../Services/events';
import { useNavigate } from 'react-router-dom';
import EventDetails from '../EventDetails/EventDetails';

export default function List({ event_id }) {
    const [rows, setRows] = useState([]);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    function makeRows(data) {
        return data.map((attendee, index) => (
            <tr key={index}>
                <td>{index}</td>
                <td>{(attendee.first_name== null)?(`User${index}`):(attendee.first_name)}</td>
                <td>{(attendee.last_name== null)?(`Pater${index}`):(attendee.last_name)}</td>
                <td>{(attendee.status == null)?("Not Going"):(attendee.status)}</td>
            </tr>
        ));
    }
    async function loadAttendees() {
        try {
            const data = await getAttendees(event_id);
            if (!Array.isArray(data) || data.length === 0) {
                setRows([]);
            } else {
                setRows(makeRows(data));
            }
        } catch (e) {
            navigate("/");
        }
    }
    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            await inviteAttendee(event_id, email);
            loadAttendees();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        loadAttendees();
    }, [event_id]);
    return (
        <>
            <form onSubmit={handleInvite}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Invite A New Attendee</button>
            </form>
            {(!Array.isArray(rows) || rows.length === 0) ? (
                <h3>No Attendees</h3>
            ) : (
                <table className="event-members-table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            )}
        </>
    );
}
