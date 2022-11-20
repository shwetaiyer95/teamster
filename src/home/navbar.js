import React, { useEffect } from 'react';
import { Sidenav, Nav } from 'rsuite';
import './navbar.css';

const NavigationBar = ({adminuser}) => {
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
      <div style={{ width: 240 , marginRight: 10}}>
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

export default NavigationBar;