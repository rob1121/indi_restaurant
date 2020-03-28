import * as Yup from "yup";

export default Yup.object().shape({
    packages: Yup.array().of(
        Yup.object()
            .shape({
                title: Yup.string()
                    .label("Package")
                    .required(),
                price: Yup.number()
                    .label("Price")
                    .required(),
                items: Yup.array()
                    .of(
                        Yup.string()
                            .label("Item")
                            .required()
                    )
                    .label("Items")
                    .required()
            })
            .label("Wedding Packages")
            .required()
    )
});
