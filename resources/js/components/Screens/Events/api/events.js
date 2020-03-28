export const fetchEvents = () => axios.get("/api/events/all");

export const addEvent = events =>
    axios.post(`/api/events/create`, events, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const saveEvent = (events, id) =>
    axios.post(`/api/events/${id}`, events, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
export const destroyEvent = id => axios.delete(`/api/events/${id}`);
