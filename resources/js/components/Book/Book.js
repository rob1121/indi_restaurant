import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import { Form, Button, Modal, Input, InputNumber, DatePicker } from "antd";
import validation from "./validation";
import moment from "moment";

const Book = () => {
    const formRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const handleOk = async values => {
        await formRef.current.submitForm();
        if (formRef.current.isValid) {
            setShowModal(false);
        }
    };
    const handleCancel = () => {
        setShowModal(false);
    };
    const handleSubmit = values => {
        axios
            .put("/api/reserve/create")
            .then(() => Message.success("Table reserved"))
            .catch(() => Message.error("Table reservation failed"));
    };

    useEffect(() => {
        formRef.current && formRef.current.resetForm();
    }, [showModal]);

    return (
        <>
            <Button type="primary" onClick={() => setShowModal(true)}>
                Open Modal
            </Button>
            <Modal
                title="Reserve table"
                visible={showModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        name: "",
                        number: "",
                        email: "",
                        message: "",
                        reserve_date: "",
                        count: 0
                    }}
                    validationSchema={validation}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, errors, values }) => (
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            layout="horizontal"
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                validateStatus={errors.name ? "error" : ""}
                                help={errors.name}
                            >
                                <Input
                                    onChange={({ target }) =>
                                        setFieldValue("name", target.value)
                                    }
                                    value={values.name}
                                />
                            </Form.Item>

                            <Form.Item
                                name="nunber"
                                label="Number"
                                validateStatus={errors.number ? "error" : ""}
                                help={errors.number}
                            >
                                <Input
                                    onChange={({ target }) =>
                                        setFieldValue("number", target.value)
                                    }
                                    value={values.number}
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                validateStatus={errors.email ? "error" : ""}
                                help={errors.email}
                            >
                                <Input
                                    onChange={({ target }) =>
                                        setFieldValue("email", target.value)
                                    }
                                    value={values.email}
                                />
                            </Form.Item>

                            <Form.Item
                                name="count"
                                label="Count"
                                validateStatus={errors.count ? "error" : ""}
                                help={errors.count}
                            >
                                <InputNumber
                                    onChange={val =>
                                        setFieldValue("count", val)
                                    }
                                    value={values.count}
                                />
                            </Form.Item>
                            <Form.Item
                                name="reserve_date"
                                label="Date/Time"
                                validateStatus={
                                    errors.reserve_date ? "error" : ""
                                }
                                help={errors.reserve_date}
                            >
                                <DatePicker
                                    onChange={val =>
                                        setFieldValue("reserve_date", val)
                                    }
                                    use12Hours
                                    showTime
                                    onOk={val =>
                                        setFieldValue("reserve_date", val)
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name="message"
                                label="Message"
                                validateStatus={errors.message ? "error" : ""}
                                help={errors.message}
                            >
                                <Input.TextArea
                                    rows={4}
                                    onChange={({ target }) =>
                                        setFieldValue("message", target.value)
                                    }
                                    value={values.message}
                                />
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default Book;
