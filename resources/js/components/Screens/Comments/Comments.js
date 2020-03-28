import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import {
    Button,
    Card,
    Table,
    Typography,
    Icon,
    Divider,
    Checkbox,
    message
} from "antd";
import EditDrawer from "./components/EditDrawer";
import CreateDrawer from "./components/CreateDrawer";
import {
    fetchComments,
    saveComment,
    destroyComment,
    addComment
} from "./api/comments";

const { Text } = Typography;
const Comments = () => {
    const [comments, setComments] = useState([]);
    const [selectedComment, setSelectedComment] = useState(undefined);
    const [showCreateDrawer, setShowCreateDrawer] = useState(false);
    const columns = [
        {
            title: "",
            key: "visible",
            render: ({ visible, key }) => (
                <Checkbox
                    onChange={() => toggleCheck(key)}
                    checked={!!visible}
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <span style={{ whiteSpace: "nowrap" }}>{text}</span>
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message"
        },
        {
            title: "",
            key: "actions",
            render: ({ id, key }) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => deleteComment(id)}
                    >
                        <Icon type="delete" theme="twoTone" />
                    </Button>
                    <Divider type="vertical" />
                    <Button
                        type="link"
                        size="small"
                        onClick={() => editComment(key)}
                    >
                        <Icon type="edit" theme="twoTone" />
                    </Button>
                </div>
            )
        }
    ];

    const toggleCheck = key => {
        console.log(key);
        const updateComments = cloneDeep(comments);
        updateComments[key].visible = !updateComments[key].visible;
        updateComment(updateComments[key]).then(fetchAll);
    };

    const createComment = comment =>
        addComment(comment)
            .then(() => {
                fetchAll();
                message.success("Create comment success!");
            })
            .catch(() => message.error("Create comment failed!"));
    const updateComment = comment => {
        return saveComment(comment)
            .then(() => {
                fetchAll();
                message.success("Update comment success!");
            })
            .catch(() => message.error("Update comment failed!"));
    };

    const deleteComment = id => {
        return destroyComment(id)
            .then(() => {
                fetchAll();
                message.success("Delete comment success!");
            })
            .catch(() => message.error("Delete comment failed!"));
    };

    const editComment = key => {
        setSelectedComment(comments[key]);
    };

    const fetchAll = () => {
        fetchComments()
            .then(({ data = [] }) => {
                const newComments = data.map((comment, key) => {
                    comment.key = key;
                    return comment;
                });

                setComments(newComments);
            })
            .catch(({ response }) => alert(response.data.message));
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <Card title="Comments">
            <div style={{ marginBottom: 20 }}>
                <Button
                    type="primary"
                    icon="plus"
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                    onClick={() => setShowCreateDrawer(true)}
                >
                    Add Comment
                </Button>
            </div>
            <Table dataSource={comments} columns={columns} />;
            <EditDrawer
                data={selectedComment}
                visible={!!selectedComment}
                onClose={() => setSelectedComment(undefined)}
                onSubmit={async updatedComment => {
                    setSelectedComment(undefined);
                    await updateComment(updatedComment);
                }}
            />
            <CreateDrawer
                visible={showCreateDrawer}
                onClose={() => setShowCreateDrawer(false)}
                onSubmit={async comment => {
                    setShowCreateDrawer(false);
                    await createComment(comment);
                }}
            />
        </Card>
    );
};

export default Comments;
