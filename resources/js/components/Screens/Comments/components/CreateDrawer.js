import React, { useRef, useEffect } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { Input, Modal, Typography, Drawer, Button } from "antd";
import validation from "../validation";

const { Text } = Typography;
const { confirm } = Modal;

const CreateDrawer = ({ onClose, onSubmit, visible }) => {
    const formRef = useRef();
    const showConfirm = ({ onCancel, onOk }) => {
        confirm({
            title: "Confirmation",
            content: "Do you want exit without saving?",
            onOk,
            onCancel
        });
    };

    const handleClose = () => {
        if (
            formRef.current &&
            !isEqual(formRef.current.values, formRef.current.initialValues)
        ) {
            showConfirm({
                onOk: onClose,
                onCancel: undefined
            });
        } else {
            onClose();
        }
    };

    useEffect(() => {
        formRef.current &&
            formRef.current.resetForm(formRef.current.initialValues);
    }, [visible]);

    return (
        <Drawer
            title="Add New Comment"
            placement="right"
            closable={false}
            onClose={handleClose}
            visible={visible}
            width={720}
        >
            <Formik
                innerRef={formRef}
                initialValues={{
                    name: "",
                    message: ""
                }}
                validationSchema={validation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
                {({ values, errors, setFieldValue, handleSubmit }) => (
                    <>
                        <div style={{ marginBottom: 20 }}>
                            <Text>Name</Text>
                            <Input
                                onChange={({ target }) =>
                                    setFieldValue("name", target.value)
                                }
                                value={values.name}
                            />
                            <Text type="danger">{errors.name}</Text>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <Text>Comment</Text>
                            <Input.TextArea
                                rows={4}
                                onChange={({ target }) =>
                                    setFieldValue("message", target.value)
                                }
                                value={values.message}
                            />
                            <Text type="danger">{errors.message}</Text>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Button
                                onClick={handleClose}
                                size="large"
                                style={{
                                    marginRight: 20
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                type="primary"
                                icon="save"
                                size="large"
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </Formik>
        </Drawer>
    );
};

export default CreateDrawer;
