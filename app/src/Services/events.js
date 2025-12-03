export async function SearchAndFilter (keywords, minDate, maxDate, role) {
    try {
        const token = localStorage.getItem("Authorization");
        let url = "http://localhost:3000/api/events/search?";
        if(keywords !== ""){
            url+=`keywords=${keywords}`;
        }
        if(minDate !== ""){
            if(!url.endsWith('?'))url+="&";
            url+=`startDate=${minDate}`;
        }
        if(maxDate !== ""){
            if(!url.endsWith('?'))url+="&";
            url+=`endDate=${maxDate}`;
        }
        if(role !== ""){
            if(!url.endsWith('?'))url+="&";
            url+=`role=${role}`;
        }
        const res = await fetch(url, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Searching for events failed, Error code: ${res.status}`);
        console.log("Search successful")
        return data.data;
    } catch (error) {
        console.log(error);
    }
}
export async function getAttendees(event_id){
    try {
        const token = localStorage.getItem("Authorization");
        const res = await fetch(`http://localhost:3000/api/events/${event_id}/attendees`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Getting attendees for events failed, Error code: ${res.status}`);
        console.log("Getting attendees was successful")
        return data.data;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
export async function updateStatus(id, selectedStatus){
    try {
        console.log(id +" "+ selectedStatus);
        const token = localStorage.getItem("Authorization");
        const res = await fetch(`http://localhost:3000/api/events/${id}/attendance`, {
            method: "PUT",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ status: selectedStatus })
        });
        const text = await res.text();
        console.log("STATUS:", res.status, "RESPONSE:", text);
        if (!res.ok) throw new Error(`Updating Status failed: ${res.status}`);
        const data = JSON.parse(text);
        console.log("Update successful:", data);
        return data.status;
    } catch (error) {
        console.error(error);
    }
}


export async function inviteAttendee(event_id,email){
    try {
        const token = localStorage.getItem("Authorization");
        const res = await fetch(`http://localhost:3000/api/events/${event_id}/invite`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
            body: JSON.stringify({
                email: email
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Invite attendee to event failed, Error code: ${res.status}, ${res.message}`);
        console.log("Invite attendee to event was successful")
        return data.status;
    } catch (error) {
        console.log(error)
    }
}
export async function deleteEvent(id){
    try {
        const token = localStorage.getItem("Authorization");
        const res = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}`},
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Delete event failed, Error code: ${res.status}, ${res.message}`);
        console.log("Delete event was successful")
        return data.status;
    } catch (error) {
        console.log(error)
    }
}