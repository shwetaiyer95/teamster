import { CCard, CCardBody, CCardSubtitle, CCardText, CCardLink, CCardTitle } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
// import Card from 'react-bootstrap/Card';

const CardComponent = ({title, subtitle, text, links}) => {

  const getLink = (name, link) => {
    return (
      <CCardLink key={name} href={link}>{name}</CCardLink>
    )
  }

  return (
    <CCard style={{ width: '18rem', margin: 15 }}>
      <CCardBody>
        <CCardTitle>{title}</CCardTitle>
        <CCardSubtitle className="mb-2 text-medium-emphasis">{subtitle}</CCardSubtitle>
        <CCardText>
          {text}
        </CCardText>
        {links.map(link => {
          return getLink(link.name, link.link)
        })}
      </CCardBody>
    </CCard>
  );
}

export default CardComponent;