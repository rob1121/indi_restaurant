import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Formik, FieldArray } from "formik";
import { Button, Card, Input, Typography, Icon, message, Divider } from "antd";
import validation from "./validation";

const { Text } = Typography;
const PartyTrays = () => {
    const formRef = useRef();
    const handleSubmit = values => {
        axios
            .post("/api/party-trays/update", values)
            .then(() => message.success("Party trays update success!"))
            .catch(() => message.error("Party trays update failed!"));
    };

    const fetchData = () => {
        axios.get("/api/party-trays/all").then(({ data }) => {
            formRef.current && formRef.current.setValues({ trays: data });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="container-card" title="Party Tray">
            <Formik
                innerRef={formRef}
                initialValues={{
                    trays: [
                        {
                            tray: "",
                            veg: 0,
                            non_veg: 0,
                            seafood: 0,
                            bread: 0,
                            rice: 0
                        }
                    ]
                }}
                validationSchema={validation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {({ values, errors, setFieldValue, handleSubmit }) => (
                    <>
                        <FieldArray
                            name="trays"
                            render={packagesArrayHelpers => (
                                <>
                                    {values.trays &&
                                        values.trays.map((pkg, trayIndex) => (
                                            <Card
                                                key={trayIndex}
                                                style={{ marginBottom: 20 }}
                                                title={
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column"
                                                        }}
                                                    >
                                                        <Input
                                                            style={{
                                                                border: 0
                                                            }}
                                                            placeholder="Title"
                                                            value={
                                                                values.trays[
                                                                    trayIndex
                                                                ].tray
                                                            }
                                                            onChange={({
                                                                target
                                                            }) =>
                                                                setFieldValue(
                                                                    `trays[${trayIndex}].tray`,
                                                                    target.value
                                                                )
                                                            }
                                                        />
                                                        <Text type="danger">
                                                            {errors.trays &&
                                                                errors.trays[
                                                                    trayIndex
                                                                ] &&
                                                                errors.trays[
                                                                    trayIndex
                                                                ].tray}
                                                        </Text>
                                                    </div>
                                                }
                                                extra={
                                                    <Button
                                                        type="link"
                                                        onClick={() =>
                                                            packagesArrayHelpers.remove(
                                                                trayIndex
                                                            )
                                                        }
                                                    >
                                                        <Icon
                                                            type="minus-square"
                                                            theme="twoTone"
                                                        />
                                                    </Button>
                                                }
                                            >
                                                <div
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    <Text>veg</Text>
                                                    <Input
                                                        prefix="$"
                                                        placeholder="Title"
                                                        value={
                                                            values.trays[
                                                                trayIndex
                                                            ].veg
                                                        }
                                                        onChange={({
                                                            target
                                                        }) =>
                                                            setFieldValue(
                                                                `trays[${trayIndex}].veg`,
                                                                target.value
                                                            )
                                                        }
                                                    />
                                                    <Text type="danger">
                                                        {errors &&
                                                            errors.trays &&
                                                            errors.trays[
                                                                trayIndex
                                                            ] &&
                                                            errors.trays[
                                                                trayIndex
                                                            ].veg}
                                                    </Text>
                                                </div>
                                                <div
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    <Text>non_veg</Text>
                                                    <Input
                                                        prefix="$"
                                                        placeholder="non_veg"
                                                        value={
                                                            values.trays[
                                                                trayIndex
                                                            ].non_veg
                                                        }
                                                        onChange={({
                                                            target
                                                        }) =>
                                                            setFieldValue(
                                                                `trays[${trayIndex}].non_veg`,
                                                                target.value
                                                            )
                                                        }
                                                    />
                                                    <Text type="danger">
                                                        {errors &&
                                                            errors.trays &&
                                                            errors.trays[
                                                                trayIndex
                                                            ] &&
                                                            errors.trays[
                                                                trayIndex
                                                            ].non_veg}
                                                    </Text>
                                                </div>
                                                <div
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    <Text>seafood</Text>
                                                    <Input
                                                        prefix="$"
                                                        placeholder="seafood"
                                                        value={
                                                            values.trays[
                                                                trayIndex
                                                            ].seafood
                                                        }
                                                        onChange={({
                                                            target
                                                        }) =>
                                                            setFieldValue(
                                                                `trays[${trayIndex}].seafood`,
                                                                target.value
                                                            )
                                                        }
                                                    />
                                                    <Text type="danger">
                                                        {errors &&
                                                            errors.trays &&
                                                            errors.trays[
                                                                trayIndex
                                                            ] &&
                                                            errors.trays[
                                                                trayIndex
                                                            ].seafood}
                                                    </Text>
                                                </div>
                                                <div
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    <Text>bread</Text>
                                                    <Input
                                                        prefix="$"
                                                        placeholder="bread"
                                                        value={
                                                            values.trays[
                                                                trayIndex
                                                            ].bread
                                                        }
                                                        onChange={({
                                                            target
                                                        }) =>
                                                            setFieldValue(
                                                                `trays[${trayIndex}].bread`,
                                                                target.value
                                                            )
                                                        }
                                                    />
                                                    <Text type="danger">
                                                        {errors &&
                                                            errors.trays &&
                                                            errors.trays[
                                                                trayIndex
                                                            ] &&
                                                            errors.trays[
                                                                trayIndex
                                                            ].bread}
                                                    </Text>
                                                </div>
                                                <div
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    <Text>rice</Text>
                                                    <Input
                                                        prefix="$"
                                                        placeholder="rice"
                                                        value={
                                                            values.trays[
                                                                trayIndex
                                                            ].rice
                                                        }
                                                        onChange={({
                                                            target
                                                        }) =>
                                                            setFieldValue(
                                                                `trays[${trayIndex}].rice`,
                                                                target.value
                                                            )
                                                        }
                                                    />
                                                    <Text type="danger">
                                                        {errors &&
                                                            errors.trays &&
                                                            errors.trays[
                                                                trayIndex
                                                            ] &&
                                                            errors.trays[
                                                                trayIndex
                                                            ].rice}
                                                    </Text>
                                                </div>
                                                <Text type="danger">
                                                    {errors &&
                                                        errors.trays &&
                                                        errors.trays[
                                                            trayIndex
                                                        ] &&
                                                        typeof errors.trays[
                                                            trayIndex
                                                        ] === "string" &&
                                                        errors.trays[trayIndex]}
                                                </Text>
                                            </Card>
                                        ))}
                                    <div style={{ marginBottom: 20 }}>
                                        <Button
                                            icon="plus"
                                            onClick={() =>
                                                packagesArrayHelpers.push({
                                                    tray: "",
                                                    veg: 0,
                                                    non_veg: 0,
                                                    seafood: 0,
                                                    bread: 0,
                                                    rice: 0
                                                })
                                            }
                                        >
                                            Add Tray
                                        </Button>
                                    </div>
                                </>
                            )}
                        />
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            icon="save"
                        >
                            Save
                        </Button>
                    </>
                )}
            </Formik>
        </Card>
    );
};

export default PartyTrays;
