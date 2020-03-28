import React from "react";
import "./welcome.style.scss";

const onChange = (a, b, c) => {
    console.log(a, b, c);
};

const Welcome = () => (
    <div className="message">
        At Guru Palace Indian Restaurant, we offer distinctive cuisine in an
        informal, friendly setting. Our restaurant enjoys a reputation for
        impeccable service, elegant Asian-style décor, and exquisite Indian
        food. Dining at our restaurant is like visiting India without leaving
        your hometown–an exciting blend of authentic Indian food, culture, and
        atmosphere awaits.
    </div>
);

export default Welcome;
