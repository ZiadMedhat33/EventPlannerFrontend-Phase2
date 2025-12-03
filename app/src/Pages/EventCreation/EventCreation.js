import "./EventCreation.css"
import { useState } from "react";

export default function EventCreation() {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    async function createEvent(e) {
        e.preventDefault();
        const form = e.target;
        const data = {
            title: title.trim(),
            location: location.trim(),
            eventTime: time,
            eventDate: date,
            description: description.trim()
        };
        try {
            const response = await fetch("http://localhost:3000/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("Authorization")
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) {
                setErr(true);
                setSuccess(false);
                setMessage(
                    result.message ||
                    result.data?.validation ||
                    `Error ${response.status}`
                );
                return;
            }
            setSuccess(true);
            setErr(false);
            setMessage(result.message || "Event created successfully");
            form.reset();
        } catch (error) {
            setErr(true);
            setSuccess(false);
            setMessage(error.message || "Network error");
        }
    }
    return (
        <form onSubmit={createEvent}>
            <h1>Please fill the form to create an event</h1>
            <input type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required />
            <input type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required />
            <input type="time"
                onChange={(e) => setTime(e.target.value)}
                required />
            <input type="date"
                onChange={(e) => setDate(e.target.value)}
                required />
            <textarea
                rows="20"
                cols="100"
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit" className="submit">Create The Event</button>
            {success && <p className="success">{message}</p>}
            {err && <p className="err">{message}</p>}
        </form>
    );
}
