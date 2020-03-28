import React, { useState, useEffect } from "react";
import { Upload, Modal, Card, Icon } from "antd";

const OPTIONS = ["all", "wedding", "birthday", "christening"];

const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const Menu = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const fetchAll = () => {
        axios
            .get("/api/menu/all")
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

    const handleRemove = async image => {
        try {
            await axios.delete(`/api/menu/${image.uid}`);
            fetchAll();
        } catch (error) {
            console.log(error);
        }
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

    useEffect(() => fetchAll(), []);

    return (
        <Card className="container-card" title="Banquet Facility">
            <Upload
                action="/api/menu/create"
                listType="picture-card"
                fileList={fileList}
                accept={"jpeg"}
                onPreview={handlePreview}
                onRemove={handleRemove}
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
                    alt={previewImage}
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </Modal>
        </Card>
    );
};

export default Menu;
