import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Formik, FieldArray } from "formik";
import { Button, Card, Input, Typography, Icon, Select, message } from "antd";
import validation from "./validation";

const { Text } = Typography;
const { Option } = Select;
const WeddingPackages = () => {
    const formRef = useRef();
    const handleSubmit = values => {
        axios
            .post("/api/wedding-packages/update", values)
            .then(() => message.success("Wedding packages update success!"))
            .catch(() => message.error("Wedding packages update failed!"));
    };

    const fetchData = () => {
        axios.get("/api/wedding-packages/all").then(({ data }) => {
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
                            package: "",
                            items: [
                                {
                                    category: "wedding buffet dinner",
                                    item: ""
                                }
                            ]
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
                                                            placeholder="Package"
                                                            value={
                                                                values.packages[
                                                                    packageIndex
                                                                ].package
                                                            }
                                                            onChange={({
                                                                target
                                                            }) =>
                                                                setFieldValue(
                                                                    `packages[${packageIndex}].package`,
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
                                                                ].package}
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
                                                <FieldArray
                                                    name={`packages[${packageIndex}].items`}
                                                    render={itemsArrayHelpers => (
                                                        <>
                                                            {values.packages[
                                                                packageIndex
                                                            ].items &&
                                                                values.packages[
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
                                                                                <Select
                                                                                    style={{
                                                                                        marginRight: 10
                                                                                    }}
                                                                                    onChange={val =>
                                                                                        setFieldValue(
                                                                                            `packages[${packageIndex}].items[${itemIndex}].category`,
                                                                                            val
                                                                                        )
                                                                                    }
                                                                                    value={
                                                                                        values
                                                                                            .packages[
                                                                                            packageIndex
                                                                                        ]
                                                                                            .items[
                                                                                            itemIndex
                                                                                        ]
                                                                                            .category
                                                                                    }
                                                                                >
                                                                                    <Option value="wedding buffet dinner">
                                                                                        Wedding
                                                                                        Buffet
                                                                                        Dinner
                                                                                    </Option>
                                                                                    <Option value="cocktail hour">
                                                                                        Cocktail
                                                                                        Hour
                                                                                    </Option>
                                                                                    <Option value="desserts">
                                                                                        Desserts
                                                                                    </Option>
                                                                                    <Option value="extras">
                                                                                        Extras
                                                                                    </Option>
                                                                                </Select>
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
                                                                                            .item
                                                                                    }
                                                                                    onChange={({
                                                                                        target
                                                                                    }) =>
                                                                                        setFieldValue(
                                                                                            `packages[${packageIndex}].items[${itemIndex}].item`,
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
                                                                                    ] &&
                                                                                    errors
                                                                                        .packages[
                                                                                        packageIndex
                                                                                    ]
                                                                                        .items[
                                                                                        itemIndex
                                                                                    ]
                                                                                        .item}
                                                                            </Text>
                                                                        </>
                                                                    )
                                                                )}
                                                            <div>
                                                                <Button
                                                                    onClick={() =>
                                                                        itemsArrayHelpers.push(
                                                                            {
                                                                                category:
                                                                                    "wedding buffet dinner",
                                                                                item:
                                                                                    ""
                                                                            }
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
                                                    package: "",
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

export default WeddingPackages;
