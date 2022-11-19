// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Card } from 'react-bootstrap';
// import { NavigationBar } from './navbar';

import CardComponent from "./cardComponent"
import './cardComponent.css'

export const Meetings = () => {
    return (
        <div className="cardDiv">
            <CardComponent title="hello" subtitle="subtitle" text="text" links={[{name: "name", link: "link"}]}></CardComponent>
            <CardComponent title="hello2" subtitle="subtitle2" text="text2" links={[{name: "name", link: "link"}]}></CardComponent>
        </div>
    )
}