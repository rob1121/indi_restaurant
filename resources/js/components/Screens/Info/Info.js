import React, { useRef, useEffect } from "react";
import { message, Typography, Select } from "antd";
import { FieldArray, Formik } from "formik";
import { Button, Input, Card } from "antd";
import validation from "./validation";
import { updateInfo, getInfo } from "./api/info";

const { Text } = Typography;
const { Option } = Select;
const Info = () => {
    const formRef = useRef();
    const fetchInfo = () => {
        getInfo().then(({ data }) => {
            formRef.current && formRef.current.setValues(data);
        });
    };

    const handleSubmit = values => {
        updateInfo(values)
            .then(() => message.success("Update success"))
            .catch(() => message.error("Update failed"));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <Card title="Info">
            <Formik
                innerRef={formRef}
                initialValues={{
                    name: "",
                    address: "",
                    email: "",
                    longitude: "",
                    latitude: "",
                    contacts: []
                }}
                validationSchema={validation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {({
                    initialValues,
                    values,
                    errors,
                    setFieldValue,
                    resetForm,
                    handleSubmit
                }) => (
                    <>
                        <div className="col-6" style={{ marginBottom: 20 }}>
                            <Text>Name</Text>
                            <Input
                                onChange={({ target }) =>
                                    setFieldValue("name", target.value)
                                }
                                value={values.name}
                            />
                            <Text type="danger">{errors.name}</Text>
                        </div>
                        <div className="col-6" style={{ marginBottom: 20 }}>
                            <Text>Address</Text>
                            <Input
                                onChange={({ target }) =>
                                    setFieldValue("address", target.value)
                                }
                                value={values.address}
                            />
                            <Text type="danger">{errors.address}</Text>
                        </div>
                        <div className="col-6" style={{ marginBottom: 20 }}>
                            <Text>Email</Text>
                            <Input
                                onChange={({ target }) =>
                                    setFieldValue("email", target.value)
                                }
                                value={values.email}
                            />
                            <Text type="danger">{errors.email}</Text>
                        </div>
                        <div className="col-6" style={{ marginBottom: 20 }}>
                            <Text>Coordinates</Text>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "stretch"
                                }}
                            >
                                <div
                                    style={{
                                        marginRight: 10
                                    }}
                                >
                                    <Input
                                        onChange={({ target }) =>
                                            setFieldValue(
                                                "longitude",
                                                target.value
                                            )
                                        }
                                        value={values.longitude}
                                        placeholder="Longitude"
                                    />
                                    <Text type="danger">
                                        {errors.longitude}
                                    </Text>
                                </div>
                                <div>
                                    <Input
                                        onChange={({ target }) =>
                                            setFieldValue(
                                                "latitude",
                                                target.value
                                            )
                                        }
                                        value={values.latitude}
                                        placeholder="Latitude"
                                    />
                                    <Text type="danger">{errors.latitude}</Text>
                                </div>
                            </div>
                        </div>
                        <div className="col-6" style={{ marginBottom: 20 }}>
                            <Text>Contacts</Text>
                            <FieldArray
                                name="contacts"
                                render={arrayHelpers => (
                                    <div>
                                        {values.contacts.map((contact, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    marginBottom: 20
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex"
                                                    }}
                                                >
                                                    <Select
                                                        onChange={val =>
                                                            setFieldValue(
                                                                `contacts[${i}].type`,
                                                                val
                                                            )
                                                        }
                                                        value={
                                                            values.contacts[i]
                                                                .type
                                                        }
                                                    >
                                                        <Option value="email">
                                                            Email
                                                        </Option>
                                                        <Option value="telephone">
                                                            Telephone
                                                        </Option>
                                                        <Option value="mobile">
                                                            Mobile
                                                        </Option>
                                                        <Option value="Fax">
                                                            Fax
                                                        </Option>
                                                    </Select>
                                                    <Input
                                                        onChange={({
                                                            target
                                                        }) =>
                                                            setFieldValue(
                                                                `contacts[${i}].contact`,
                                                                target.value
                                                            )
                                                        }
                                                        value={
                                                            values.contacts[i]
                                                                .contact
                                                        }
                                                        placeholder="Contact"
                                                        style={{
                                                            marginLeft: 10
                                                        }}
                                                    />
                                                    <Button
                                                        style={{
                                                            marginLeft: 10
                                                        }}
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                i
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                </div>

                                                <Text type="danger">
                                                    {errors.contacts &&
                                                        errors.contacts[i] &&
                                                        errors.contacts[i]
                                                            .contact}
                                                </Text>
                                            </div>
                                        ))}
                                        {values.contacts.length < 5 && (
                                            <Button
                                                onClick={() =>
                                                    arrayHelpers.push({
                                                        type: "email",
                                                        contact: ""
                                                    })
                                                }
                                            >
                                                +
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="col-6" style={{ display: "flex" }}>
                            <Button
                                onClick={() => resetForm(initialValues)}
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
        </Card>
    );
};

export default Info;
