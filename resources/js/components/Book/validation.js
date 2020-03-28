import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string()
        .label("Name")
        .required(),
    number: Yup.string()
        .label("Number")
        .required(),
    count: Yup.number()
        .label("Count")
        .required(),
    message: Yup.string()
        .label("Message")
        .required(),
    email: Yup.string()
        .email()
        .label("Email")
        .required(),
    reserve_date: Yup.date()
        .label("Reserve Date")
        .required()
});
