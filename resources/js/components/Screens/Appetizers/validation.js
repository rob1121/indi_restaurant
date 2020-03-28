import * as Yup from "yup";

export default Yup.object().shape({
    appetizers: Yup.array().of(
        Yup.object()
            .shape({
                title: Yup.string()
                    .label("Title")
                    .required(),
                items: Yup.array()
                    .of(
                        Yup.string()
                            .label("Item")
                            .required()
                    )
                    .required()
            })
            .label("Appetizers")
            .required()
    )
});
