import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function JoinEvent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('Making request to /send-data');
        axios.get("/send-data")
            .then(response => {
                console.log('Response received');
                console.log(response);
                jfdnv(response.data);
            })
            .catch(error => {
                console.log('Error in request');
                console.error(error);
            });
    }, []);
    const jfdnv = (x) => {
        setData(x);
    }
    useEffect(() => {
        console.log('Data updated');
        console.log(data[0]);
    }, [data]);

    return (
        <div>
            <h1>Join Event</h1>
           <div>
           {data.map(item => (
            console.log(item)
                // <div key={item.eventid}>
                //     <p>{item.name}</p>
                //     <p>{item.description}</p>
                // </div>
            ))}
           </div>
        </div>
    );
}

const domContainer = document.querySelector('#je');
const root = ReactDOM.createRoot(domContainer);
root.render(<JoinEvent />);