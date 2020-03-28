import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import { isEqual, map } from "lodash";
import {
    Input,
    Form,
    Modal,
    Typography,
    Drawer,
    Button,
    DatePicker
} from "antd";
import moment from "moment";
import validation from "../validation";

const { Text } = Typography;
const { confirm } = Modal;

const EditDrawer = ({ data, onClose, onSubmit, visible }) => {
    const [cover, setCover] = useState(null);
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
        formRef.current && formRef.current.resetForm(data);
    }, [visible]);

    return (
        <Drawer
            title="Edit"
            placement="right"
            closable={false}
            onClose={handleClose}
            visible={visible}
            width={720}
        >
            <Text>Cover</Text>
            <img src={data.cover_thumbnail} />
            <input
                type="file"
                onChange={event => {
                    setCover(event.target.files[0]);
                }}
                required
            />
            <Formik
                innerRef={formRef}
                initialValues={data}
                validationSchema={validation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={values => {
                    const newValues = new FormData();
                    map(values, (val, key) => {
                        newValues.append(key, val);
                    });
                    newValues.append("cover", cover);
                    onSubmit(newValues);
                }}
            >
                {({ values, errors, setFieldValue, handleSubmit }) => (
                    <>
                        <Form.Item label="Title">
                            <Input
                                onChange={({ target }) =>
                                    setFieldValue("title", target.value)
                                }
                                value={values.title}
                            />
                            <Text type="danger">{errors.title}</Text>
                        </Form.Item>

                        <Form.Item label="Address">
                            <Input
                                onChange={({ target }) =>
                                    setFieldValue("address", target.value)
                                }
                                value={values.address}
                            />
                            <Text type="danger">{errors.address}</Text>
                        </Form.Item>

                        <Form.Item label="Time">
                            <DatePicker
                                format={"MM/DD/YYYY"}
                                onChange={value => {
                                    setFieldValue("time", value);
                                }}
                                defaultValue={moment(values.time)}
                                selectedValue={values.time}
                            />
                            <Text type="danger">{errors.time}</Text>
                        </Form.Item>

                        <Form.Item label="Contact">
                            <Input
                                onChange={({ target }) =>
                                    setFieldValue("contact", target.value)
                                }
                                value={values.contact}
                            />
                            <Text type="danger">{errors.contact}</Text>
                        </Form.Item>

                        <Form.Item label="Description">
                            <Input.TextArea
                                rows={4}
                                onChange={({ target }) =>
                                    setFieldValue("description", target.value)
                                }
                                value={values.description}
                            />
                            <Text type="danger">{errors.title}</Text>
                        </Form.Item>
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

export default EditDrawer;
