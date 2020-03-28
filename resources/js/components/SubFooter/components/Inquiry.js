import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Typography, message } from "antd";

const { Text } = Typography;
const validation = Yup.object().shape({
    message: Yup.string()
        .label("Message")
        .required(),
    name: Yup.string()
        .label("Name")
        .required(),
    email: Yup.string()
        .email()
        .label("Email")
        .required(),
    number: Yup.string()
        .label("Number")
        .required()
});

export default () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (values, formik) => {
        setIsLoading(true);
        axios
            .post("/api/inquiry", values)
            .then(() => {
                message.success("Message sent!");
                formik.resetForm();
                setIsLoading(false);
            })
            .catch(() => {
                message.error("Sending failed!");
                setIsLoading(false);
            });
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    number: "",
                    message: ""
                }}
                validationSchema={validation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {({ values, errors, setFieldValue, handleSubmit }) => (
                    <>
                        <h3>Have Question?</h3>
                        <Input
                            placeholder="Name"
                            onChange={({ target }) =>
                                setFieldValue("name", target.value)
                            }
                            value={values.name}
                            disabled={isLoading}
                        />
                        <Text type="danger">{errors.name}</Text>
                        <br />
                        <br />
                        <Input
                            placeholder="Email"
                            onChange={({ target }) =>
                                setFieldValue("email", target.value)
                            }
                            value={values.email}
                            disabled={isLoading}
                        />
                        <Text type="danger">{errors.email}</Text>
                        <br />
                        <br />
                        <Input
                            placeholder="Number"
                            onChange={({ target }) =>
                                setFieldValue("number", target.value)
                            }
                            value={values.number}
                            disabled={isLoading}
                        />
                        <Text type="danger">{errors.number}</Text>
                        <br />
                        <br />
                        <Input.TextArea
                            row={4}
                            placeholder="Message"
                            onChange={({ target }) =>
                                setFieldValue("message", target.value)
                            }
                            value={values.message}
                            disabled={isLoading}
                        />
                        <Text type="danger">{errors.message}</Text>
                        <br />
                        <br />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                marginTop: 10
                            }}
                        >
                            <Button
                                loading={isLoading}
                                type="primary"
                                onClick={handleSubmit}
                            >
                                Send Inquiry
                            </Button>
                        </div>
                    </>
                )}
            </Formik>
        </>
    );
};
