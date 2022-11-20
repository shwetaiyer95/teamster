import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardComponent from "./cardComponent"


export default function Tasks({funcNav}) {
useEffect(() => {
    // Update the document title using the browser API
    funcNav(true);
    });
  return (
    <div class ="taskContainer">
        <></>
    </div>
  );
}
