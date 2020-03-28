export const updateInfo = async values => {
    return axios.post("/api/admin/1", { ...values });
};

export const getInfo = () => {
    return axios.get("/api/admin/1");
};
