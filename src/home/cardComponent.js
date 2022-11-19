import { CCard, CCardBody, CCardSubtitle, CCardText, CCardLink, CCardTitle } from '@coreui/react';
import { Button } from '@mui/material';
import '@coreui/coreui/dist/css/coreui.min.css'
// import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
const CardComponent = ({title, subtitle, text, link, handleModalOpen}) => {

  const getLink = (name, link) => {
    return (
      <div>
      <Button onClick = {wrapHandleModalOpen} class='button'>{name}</Button>
    </div>
    )
  }
  function wrapHandleModalOpen() {
    handleModalOpen();
  }
  return (
    <CCard style={{ width: '18rem', margin: 15 }}>
      <CCardBody>
        <CCardTitle>{title}</CCardTitle>
        {subtitle && <CCardSubtitle className="mb-2 text-medium-emphasis">{subtitle}</CCardSubtitle>}
        {text && <CCardText>
          {text}
        </CCardText>}
          {getLink(link)}
      </CCardBody>
    </CCard>
  );
}

export default CardComponent;