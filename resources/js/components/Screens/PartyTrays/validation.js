import * as Yup from "yup";

export default Yup.object().shape({
    trays: Yup.array().of(
        Yup.object()
            .shape({
                tray: Yup.string()
                    .label("Tray")
                    .required(),
                veg: Yup.number()
                    .typeError("Veg invalid number")
                    .label("Veg")
                    .required(),
                non_veg: Yup.number()
                    .typeError("Non_veg invalid number")
                    .label("Non_veg")
                    .required(),
                seafood: Yup.number()
                    .typeError("Seafood invalid number")
                    .label("Seafood")
                    .required(),
                bread: Yup.number()
                    .typeError("Bread invalid number")
                    .label("Bread")
                    .required(),
                rice: Yup.number()
                    .typeError("Rice invalid number")
                    .label("Rice")
                    .required()
            })
            .label("Trays")
            .required()
    )
});
