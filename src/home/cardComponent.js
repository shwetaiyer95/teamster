import { CCard, CCardBody, CCardSubtitle, CCardText, CCardLink, CCardTitle } from '@coreui/react';
import { Button } from '@mui/material';
import '@coreui/coreui/dist/css/coreui.min.css'
const CardComponent = ({title, subtitle, text, link, handleModalOpen}) => {

  const getButton = (name) => {
    return (
      <div>
      <Button onClick = {wrapHandleModalOpen} class='button'>{name}</Button>
    </div>
    )
  }

  const getLink = (link) => {
    return (
      <CCardLink href={link}>View Event on Calendar</CCardLink>
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
          {handleModalOpen && getButton(link)}
          {!handleModalOpen && getLink(link)}
      </CCardBody>
    </CCard>
  );
}

export default CardComponent;