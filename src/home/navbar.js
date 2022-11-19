import React, { useEffect } from 'react';
import { Sidenav, Nav } from 'rsuite';
import './navbar.css';

export const NavigationBar = ({adminuser}) => {
  // TODO: Call api for teams

  const headerStyles = {
    padding: 20,
    fontSize: 16,
    background: '#34c3ff',
    color: ' #fff'
  };

  const getTeamNav = (id, name) => {
    console.log(id)
    console.log(name)
    return (
      <Nav.Menu eventKey={id} title={name}>
        <Nav.Item eventKey={`${id}-1`}>Tasks</Nav.Item>
        <Nav.Item eventKey={`${id}-2`}>Teamboard</Nav.Item>
        <Nav.Item eventKey={`${id}-3`}>Meetings</Nav.Item>
      </Nav.Menu>
    )
  }
  
  const teams = [{name: "team 1"}, {name: "team 2"}, {name: "team3"}]

    return (
      <div style={{ width: 240 }}>
      <Sidenav defaultOpenKeys={['3', '4']}>
        <Sidenav.Header>
          <div style={headerStyles}>Teamster</div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey="1" style={{height: 900}}>
            {teams.map((team,index) => { 
                return getTeamNav(index, team.name)
              })
            }
            
            <Nav.Item eventKey="100">
              Planner
            </Nav.Item>
            <Nav.Item eventKey="200">
              Admin Configutaion
            </Nav.Item>
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

