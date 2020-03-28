import * as Yup from "yup";

export default Yup.object().shape({
    message: Yup.string()
        .label("Message")
        .required(),
    name: Yup.string()
        .label("Name")
        .required()
});
