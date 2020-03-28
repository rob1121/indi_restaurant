import React, { useEffect, useState } from "react";
import { Icon, Upload, Modal, Select, Drawer } from "antd";

const { Option } = Select;

const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const CreateDrawer = ({ onClose, visible }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [type, setType] = useState("wedding");

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList.map(file => file.response || file));
    };

    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    useEffect(() => {
        setFileList([]);
    }, [type]);

    return (
        <Drawer
            title="Upload facilities"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={720}
        >
            <div style={{ marginBottom: 20 }}>
                <Select value={type} onChange={setType}>
                    <Option value="wedding">Wedding</Option>
                    <Option value="birthday">Birthday</Option>
                    <Option value="christening">Christening</Option>
                </Select>
            </div>

            <Upload
                action="/api/banquet-facility/create"
                listType="picture-card"
                fileList={fileList}
                data={{ type }}
                accept={"jpeg"}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple
            >
                {uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </Modal>
        </Drawer>
    );
};

export default CreateDrawer;
