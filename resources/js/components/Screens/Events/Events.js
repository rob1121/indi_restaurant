import React, { useState, useEffect } from "react";
import { Button, Card, Icon, message, List } from "antd";
import moment from "moment";
import EditDrawer from "./components/EditDrawer";
import CreateDrawer from "./components/CreateDrawer";
import { fetchEvents, saveEvent, destroyEvent, addEvent } from "./api/events";

const IconText = ({ type, text, onClick }) => (
    <Button type="link" onClick={onClick}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </Button>
);

const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(undefined);
    const [showCreateDrawer, setShowCreateDrawer] = useState(false);

    const createEvent = event => {
        addEvent(event)
            .then(() => {
                fetchAll();
                message.success("Create Event success!");
                setShowCreateDrawer(false);
            })
            .catch(({ response }) =>
                message.error(response.data.errors.cover[0])
            );
    };

    const updateEvent = event => {
        return saveEvent(event, selectedEvent.id)
            .then(() => {
                fetchAll();
                message.success("Update Event success!");
            })
            .catch(() => message.error("Update Event failed!"));
    };

    const deleteEvent = id => {
        return destroyEvent(id)
            .then(() => {
                fetchAll();
                message.success("Delete Event success!");
            })
            .catch(() => message.error("Delete Event failed!"));
    };

    const editEvent = key => {
        setSelectedEvent(events[key]);
    };

    const fetchAll = () => {
        fetchEvents()
            .then(({ data = [] }) => {
                const newEvents = data.map((event, key) => {
                    event.key = key;
                    return event;
                });
                setEvents(newEvents);
            })
            .catch(({ response }) => alert(response.data.message));
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <Card title="Events">
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
                    Add Event
                </Button>
            </div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3
                }}
                dataSource={events}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText
                                type="edit"
                                text=""
                                onClick={() => editEvent(item.key)}
                            />,
                            <IconText
                                type="delete"
                                text=""
                                onClick={() => deleteEvent(item.id)}
                            />
                        ]}
                        extra={
                            <img
                                width={272}
                                alt={item.title}
                                src={item.cover}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={moment(item.time).fromNow()}
                        />
                        {item.description}
                    </List.Item>
                )}
            />
            {selectedEvent && (
                <EditDrawer
                    data={selectedEvent}
                    visible={!!selectedEvent}
                    onClose={() => setSelectedEvent(undefined)}
                    onSubmit={async updatedEvent => {
                        await updateEvent(updatedEvent);
                        setSelectedEvent(undefined);
                    }}
                />
            )}
            <CreateDrawer
                visible={showCreateDrawer}
                onClose={() => setShowCreateDrawer(false)}
                onSubmit={async event => {
                    await createEvent(event);
                }}
            />
        </Card>
    );
};

export default Events;
