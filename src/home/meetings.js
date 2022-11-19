// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Card } from 'react-bootstrap';
// import { NavigationBar } from './navbar';

import CardComponent from "./cardComponent"

export const Meetings = () => {
    return (
        <CardComponent title="hello" subtitle="subtitle" text="text" links={[{name: "name", link: "link"}]}></CardComponent>
    )
}