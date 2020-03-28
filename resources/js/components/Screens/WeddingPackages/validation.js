import * as Yup from "yup";

export default Yup.object().shape({
    packages: Yup.array().of(
        Yup.object()
            .shape({
                package: Yup.string()
                    .label("Package")
                    .required(),
                items: Yup.array()
                    .of(
                        Yup.object().shape({
                            category: Yup.string()
                                .label("Category")
                                .required(),
                            item: Yup.string()
                                .label("Item")
                                .required()
                        })
                    )
                    .label("Items")
                    .required()
            })
            .label("Wedding Packages")
            .required()
    )
});
