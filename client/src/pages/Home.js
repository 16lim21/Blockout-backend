/**
 * Home page that users see once they have logged in
 * @exports Home
 */
import React, { useState } from "react";
import GoogleButton from "../components/GoogleButton";
import axios from "axios";

const Home = () => {
    const [events, setEvents] = useState([]);

    const getData = () => {
        axios
            .get(process.env.REACT_APP_API_URL + "blockout/events", {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response.data);
                setEvents(response.data);
            })
            .catch((error) => {
                console.log("Some error found" + error.message);
            });
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={getData}>Click Me</button>
            <div>
                {events.map((event) => (
                    <div key={event.id}>
                        {event.summary} created by {event.creator.email}
                    </div>
                ))}
            </div>
            <GoogleButton />
        </div>
    );
};

export default Home;
