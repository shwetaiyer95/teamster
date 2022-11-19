import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import './navbar.css';

export const NavigationBar = ({adminuser}) => {
  // TODO: Call api for teams
  
const teams = [{name: "team 1"}, {name: "team 2"}, {name: "team3"}]

  return (
    <div style={{ width: 240 }}>
    <Sidenav defaultOpenKeys={['3', '4']}>
      <Sidenav.Body>
        <Nav activeKey="1" style={{height: 900}}>
          <Nav.Menu eventKey="1" title="Settings">
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>
          <Nav.Item eventKey="1-1">
            Tasks
          </Nav.Item>
          <Nav.Item eventKey="1-2">
            Teamboard
          </Nav.Item>
          <Nav.Item eventKey="1-3">
            Meetings
          </Nav.Item>
          {/* <Nav.Menu eventKey="4" title="Settings">
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu> */}
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>
  )
}

// // import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
// // import styled from 'styled-components';
// import SidebarMenu from 'react-bootstrap-sidebar-menu';
// // import 'react-bootstrap-sidebar-menu/dist/sidebar-menu.scss'

// // const Styles = styled.div`
// //   .navbar { background-color: #222; }
// //   a, .navbar-nav, .navbar-light .nav-link {
// //     color: #9FFFCB;
// //     &:hover { color: white; }
// //   }
// //   .navbar-brand {
// //     font-size: 1.4em;
// //     color: #9FFFCB;
// //     &:hover { color: white; }
// //   }
// //   .form-center {
// //     position: absolute !important;
// //     left: 25%;
// //     right: 25%;
// //   }
// // `;

// export const NavigationBar = () => {
//   return (
//     <SidebarMenu>
//       <SidebarMenu.Header>
//         <SidebarMenu.Brand>
//           Teamster
//         </SidebarMenu.Brand>
//         {/* <SidebarMenu.Toggle /> */}
//       </SidebarMenu.Header>
//       <SidebarMenu.Body>
//         <SidebarMenu.Nav>
//           <SidebarMenu.Nav.Link>
//             {/* <SidebarMenu.Nav.Icon>
//               Tasks
//             </SidebarMenu.Nav.Icon> */}
//             <SidebarMenu.Nav.Title>
//               Tasks
//             </SidebarMenu.Nav.Title>
//           </SidebarMenu.Nav.Link>
//         </SidebarMenu.Nav>
//         <SidebarMenu.Nav>
//           <SidebarMenu.Nav.Link>
//             {/* <SidebarMenu.Nav.Icon>
//               Tasks
//             </SidebarMenu.Nav.Icon> */}
//             <SidebarMenu.Nav.Title>
//               Board
//             </SidebarMenu.Nav.Title>
//           </SidebarMenu.Nav.Link>
//         </SidebarMenu.Nav>
//         <SidebarMenu.Nav>
//           <SidebarMenu.Nav.Link>
//             {/* <SidebarMenu.Nav.Icon>
//               Tasks
//             </SidebarMenu.Nav.Icon> */}
//             <SidebarMenu.Nav.Title>
//               Meetings
//             </SidebarMenu.Nav.Title>
//           </SidebarMenu.Nav.Link>
//         </SidebarMenu.Nav>
//       </SidebarMenu.Body>
//     </SidebarMenu>
//   )
// }

