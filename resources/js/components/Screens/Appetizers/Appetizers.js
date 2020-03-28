import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Formik, FieldArray } from "formik";
import { message, Button, Card, Input, Typography, Icon } from "antd";
import validation from "./validation";

const { Text } = Typography;
const Appetizers = () => {
    const formRef = useRef();
    const handleSubmit = values => {
        axios
            .post("/api/appetizers/update", values)
            .then(() => message.success("Appetizers update success!"))
            .catch(() => message.error("Appetizers update failed!"));
    };

    const fetchData = () => {
        axios.get("/api/appetizers/all").then(({ data }) => {
            console.log(data);
            formRef.current && formRef.current.setValues({ appetizers: data });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="container-card" title="Appetizers">
            <Formik
                innerRef={formRef}
                initialValues={{
                    appetizers: [
                        {
                            title: "",
                            items: []
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
                            name="appetizers"
                            render={appetizersArrayHelpers => (
                                <>
                                    {values.appetizers.map(
                                        (appetizer, appetizerIndex) => (
                                            <Card
                                                key={appetizerIndex}
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
                                                                values
                                                                    .appetizers[
                                                                    appetizerIndex
                                                                ].title
                                                            }
                                                            onChange={({
                                                                target
                                                            }) =>
                                                                setFieldValue(
                                                                    `appetizers[${appetizerIndex}].title`,
                                                                    target.value
                                                                )
                                                            }
                                                        />
                                                        <Text type="danger">
                                                            {errors.appetizers &&
                                                                errors
                                                                    .appetizers[
                                                                    appetizerIndex
                                                                ] &&
                                                                errors
                                                                    .appetizers[
                                                                    appetizerIndex
                                                                ].title}
                                                        </Text>
                                                    </div>
                                                }
                                                extra={
                                                    isEmpty(
                                                        values.appetizers[
                                                            appetizerIndex
                                                        ].items
                                                    ) && (
                                                        <Button
                                                            type="link"
                                                            onClick={() =>
                                                                appetizersArrayHelpers.remove(
                                                                    appetizerIndex
                                                                )
                                                            }
                                                        >
                                                            <Icon
                                                                type="minus-square"
                                                                theme="twoTone"
                                                            />
                                                        </Button>
                                                    )
                                                }
                                            >
                                                <FieldArray
                                                    name={`appetizers[${appetizerIndex}].items`}
                                                    render={itemsArrayHelpers => (
                                                        <>
                                                            {values.appetizers[
                                                                appetizerIndex
                                                            ].items.map(
                                                                (
                                                                    item,
                                                                    itemIndex
                                                                ) => (
                                                                    <>
                                                                        <div
                                                                            key={
                                                                                itemIndex
                                                                            }
                                                                            style={{
                                                                                marginBottom: 10,
                                                                                display:
                                                                                    "flex"
                                                                            }}
                                                                        >
                                                                            <Input
                                                                                style={{
                                                                                    marginRight: 10
                                                                                }}
                                                                                placeholder="New item"
                                                                                value={
                                                                                    values
                                                                                        .appetizers[
                                                                                        appetizerIndex
                                                                                    ]
                                                                                        .items[
                                                                                        itemIndex
                                                                                    ]
                                                                                }
                                                                                onChange={({
                                                                                    target
                                                                                }) =>
                                                                                    setFieldValue(
                                                                                        `appetizers[${appetizerIndex}].items[${itemIndex}]`,
                                                                                        target.value
                                                                                    )
                                                                                }
                                                                            />

                                                                            <Button
                                                                                type="link"
                                                                                onClick={() => {
                                                                                    itemsArrayHelpers.remove(
                                                                                        itemIndex
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Icon
                                                                                    type="minus-square"
                                                                                    theme="twoTone"
                                                                                />
                                                                            </Button>
                                                                        </div>
                                                                        <Text type="danger">
                                                                            {errors.appetizers &&
                                                                                errors
                                                                                    .appetizers[
                                                                                    appetizerIndex
                                                                                ] &&
                                                                                errors
                                                                                    .appetizers[
                                                                                    appetizerIndex
                                                                                ]
                                                                                    .items &&
                                                                                errors
                                                                                    .appetizers[
                                                                                    appetizerIndex
                                                                                ]
                                                                                    .items[
                                                                                    itemIndex
                                                                                ]}
                                                                        </Text>
                                                                    </>
                                                                )
                                                            )}
                                                            <div>
                                                                <Button
                                                                    onClick={() =>
                                                                        itemsArrayHelpers.push(
                                                                            ""
                                                                        )
                                                                    }
                                                                    icon="plus"
                                                                >
                                                                    Add Item
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                                />
                                            </Card>
                                        )
                                    )}
                                    <div style={{ marginBottom: 20 }}>
                                        <Button
                                            icon="plus"
                                            onClick={() =>
                                                appetizersArrayHelpers.push({
                                                    title: "",
                                                    items: []
                                                })
                                            }
                                        >
                                            Add Category
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

export default Appetizers;
