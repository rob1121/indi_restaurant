import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Formik, FieldArray } from "formik";
import { Button, Card, Input, Typography, Icon, message, Divider } from "antd";
import validation from "./validation";

const { Text } = Typography;
const PromoPackages = () => {
    const formRef = useRef();
    const handleSubmit = values => {
        axios
            .post("/api/promo-packages/update", values)
            .then(() => message.success("Promo packages update success!"))
            .catch(() => message.error("Promo packages update failed!"));
    };

    const fetchData = () => {
        axios.get("/api/promo-packages/all").then(({ data }) => {
            formRef.current && formRef.current.setValues({ packages: data });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="container-card" title="packages">
            <Formik
                innerRef={formRef}
                initialValues={{
                    packages: [
                        {
                            title: "",
                            price: "",
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
                            name="packages"
                            render={packagesArrayHelpers => (
                                <>
                                    {values.packages.map(
                                        (pkg, packageIndex) => (
                                            <Card
                                                key={packageIndex}
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
                                                                values.packages[
                                                                    packageIndex
                                                                ].title
                                                            }
                                                            onChange={({
                                                                target
                                                            }) =>
                                                                setFieldValue(
                                                                    `packages[${packageIndex}].title`,
                                                                    target.value
                                                                )
                                                            }
                                                        />
                                                        <Text type="danger">
                                                            {errors.packages &&
                                                                errors.packages[
                                                                    packageIndex
                                                                ] &&
                                                                errors.packages[
                                                                    packageIndex
                                                                ].title}
                                                        </Text>
                                                    </div>
                                                }
                                                extra={
                                                    isEmpty(
                                                        values.packages[
                                                            packageIndex
                                                        ].items
                                                    ) && (
                                                        <Button
                                                            type="link"
                                                            onClick={() =>
                                                                packagesArrayHelpers.remove(
                                                                    packageIndex
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
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        marginBottom: 20
                                                    }}
                                                >
                                                    <Text>Price</Text>
                                                    <Input
                                                        prefix="$"
                                                        placeholder="Price"
                                                        value={
                                                            values.packages[
                                                                packageIndex
                                                            ].price
                                                        }
                                                        onChange={({
                                                            target
                                                        }) =>
                                                            setFieldValue(
                                                                `packages[${packageIndex}].price`,
                                                                target.value
                                                            )
                                                        }
                                                    />
                                                    <Text type="danger">
                                                        {errors.packages &&
                                                            errors.packages[
                                                                packageIndex
                                                            ] &&
                                                            errors.packages[
                                                                packageIndex
                                                            ].price}
                                                    </Text>
                                                </div>
                                                <Divider />
                                                <FieldArray
                                                    name={`packages[${packageIndex}].items`}
                                                    render={itemsArrayHelpers => (
                                                        <>
                                                            {values.packages[
                                                                packageIndex
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
                                                                                        .packages[
                                                                                        packageIndex
                                                                                    ]
                                                                                        .items[
                                                                                        itemIndex
                                                                                    ]
                                                                                }
                                                                                onChange={({
                                                                                    target
                                                                                }) =>
                                                                                    setFieldValue(
                                                                                        `packages[${packageIndex}].items[${itemIndex}]`,
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
                                                                            {errors.packages &&
                                                                                errors
                                                                                    .packages[
                                                                                    packageIndex
                                                                                ] &&
                                                                                errors
                                                                                    .packages[
                                                                                    packageIndex
                                                                                ]
                                                                                    .items &&
                                                                                errors
                                                                                    .packages[
                                                                                    packageIndex
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
                                                <Text type="danger">
                                                    {errors &&
                                                        errors.packages &&
                                                        errors.packages[
                                                            packageIndex
                                                        ] &&
                                                        typeof errors.packages[
                                                            packageIndex
                                                        ].items === "string" &&
                                                        errors.packages[
                                                            packageIndex
                                                        ].items}
                                                </Text>
                                            </Card>
                                        )
                                    )}
                                    <div style={{ marginBottom: 20 }}>
                                        <Button
                                            icon="plus"
                                            onClick={() =>
                                                packagesArrayHelpers.push({
                                                    title: "",
                                                    price: 0,
                                                    items: []
                                                })
                                            }
                                        >
                                            Add Package
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

export default PromoPackages;
