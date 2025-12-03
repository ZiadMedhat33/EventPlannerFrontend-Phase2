import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import List from "../../Components/EventMembersList/List";
import EventDetails from "../../Components/EventDetails/EventDetails";
import { deleteEvent } from "../../Services/events";
import "./event-style.css";
export default function Event() {
    const {
        id,
        title,
        date,
        time,
        location,
        role,
        description
    } = useParams();
    const navigate = useNavigate();
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteEvent(id);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        
    }, []);
    return (
        <>
            <form onSubmit={handleDelete}>
                <button className="delete-button" type="submit">Delete Event</button>
            </form>
            <EventDetails
                givenId={id}
                givenTitle={title}
                givenDate={date}
                givenTime={time}
                givenLocation={location}
                givenRole={role}
                givenDescription={description}
                onSubmit={(updated) => console.log("Updated event:", updated)}
            />

            <h1>Attendees List</h1>
            <List event_id={id}/>
        </>
    );
}