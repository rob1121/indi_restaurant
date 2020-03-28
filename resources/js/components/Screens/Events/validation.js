import * as Yup from "yup";
const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export default Yup.object().shape({
    title: Yup.string()
        .label("Title")
        .required(),
    address: Yup.string()
        .label("Address")
        .required(),
    time: Yup.string()
        .label("Time")
        .required(),
    contact: Yup.string()
        .label("Contact")
        .required(),
    description: Yup.string()
        .label("Description")
        .required()
});
