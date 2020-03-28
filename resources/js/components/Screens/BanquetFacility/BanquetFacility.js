import React, { useState, useEffect } from "react";
import { Upload, Button, Modal, Select, Card } from "antd";
import { capitalize } from "lodash";
import CreateDrawer from "./components/CreateDrawer";

const { Option } = Select;
const OPTIONS = ["all", "wedding", "birthday", "christening"];

const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const BanquetFacility = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [types, setTypes] = useState(OPTIONS);
    const [fileList, setFileList] = useState([]);
    const [showCreateDrawer, setShowCreateDrawer] = useState(false);
    const fetchAll = () => {
        axios
            .get("/api/banquet-facility/all")
            .then(({ data }) => setFileList(data))
            .catch(error => console.log(error));
    };

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleDeselect = value => {
        const updatedTypeList =
            value === "all"
                ? []
                : types.filter(type => ![value, "all"].includes(type));

        setTypes(updatedTypeList);
    };

    const handleSelect = value => {
        if (value === "all") {
            setTypes(OPTIONS);
        } else {
            setTypes([...types, value]);
        }
    };

    const handleRemove = async image => {
        try {
            await axios.delete(`/api/banquet-facility/${image.uid}`);
            fetchAll();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => fetchAll(), []);

    return (
        <Card className="container-card" title="Banquet Facility">
            <div style={{ marginBottom: 20 }}>
                <Select
                    value={types}
                    onSelect={handleSelect}
                    onDeselect={handleDeselect}
                    mode="multiple"
                    placeholder="Please select"
                    style={{ minWidth: 200 }}
                >
                    {OPTIONS.map((option, key) => (
                        <Option key={key} value={option}>
                            {capitalize(option)}
                        </Option>
                    ))}
                </Select>
            </div>

            <Button
                type="clear"
                icon="plus"
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20
                }}
                onClick={() => setShowCreateDrawer(true)}
            >
                Upload image
            </Button>

            <Upload
                action="/api/banquet-facility/create"
                listType="picture-card"
                fileList={fileList.filter(
                    file => types.includes("all") || types.includes(file.type)
                )}
                accept={"jpeg"}
                onPreview={handlePreview}
                onRemove={handleRemove}
            />
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt={previewImage}
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </Modal>
            <CreateDrawer
                visible={showCreateDrawer}
                onClose={() => {
                    fetchAll();
                    setShowCreateDrawer(false);
                }}
            />
        </Card>
    );
};

export default BanquetFacility;
