export const fetchComments = () => axios.get("/api/comment/all");

export const addComment = comment => axios.put(`/api/comment/create`, comment);

export const saveComment = comment =>
    axios.post(`/api/comment/${comment.id}`, comment);
export const destroyComment = id => axios.delete(`/api/comment/${id}`);
