import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string()
        .label("Name")
        .required(),
    address: Yup.string()
        .label("Address")
        .required(),
    email: Yup.string()
        .email()
        .label("Email")
        .required(),
    longitude: Yup.number()
        .typeError("Invalid Longitude number")
        .label("Longitude")
        .required(),
    latitude: Yup.number()
        .typeError("Invalid Latitude number")
        .label("Latitude")
        .required(),
    contacts: Yup.array().of(
        Yup.object().shape({
            contact: Yup.string()
                .label("Contact")
                .required()
                .when("type", {
                    is: "email",
                    then: Yup.string().email()
                })
        })
    )
});
