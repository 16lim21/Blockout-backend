/**
 * Home page that users see once they have logged in
 * @exports Home
 */
import { useState } from "react";
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
                console.log(response);
                return response;
            })
            .then((data) => setEvents([data]))
            .catch((error) => {
                console.log("Some error found" + error.message);
            });
    };

    const Events = () => {
        return (
            <h2>
                {events.map((event) => (
                    <div>
                        {event.id} + {event.description}
                    </div>
                ))}
            </h2>
        );
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={getData}>Click Me</button>
            <Events></Events>
            <GoogleButton />
        </div>
    );
};

export default Home;
