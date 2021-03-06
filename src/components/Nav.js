import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Weather from "./Weather.js"



function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const pushToLogout = (props) => {
  props.handleLogout()
  props.history.push("/login")
}


export default function HideAppBar(props) {
  console.log(props)
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="secondary">
          <Toolbar>
            <p id="nav-logo"> YN </p>
            <Weather currentUser={props.currentUser} />
            {props.currentUser ? <span className="nav-current-user"> CURRENTLY LOGGED IN AS: {props.currentUser.name}</span> : null}
            { props.history.location.pathname === "/home" ? <Button id="select-interests" color="inherit" onClick={() => props.history.push("/selectinterests")}> Add More Interests</Button> : <Button id="home-button" color="inherit" onClick={() => props.history.push("/home")}> Home </Button>}
            <Button color="inherit" onClick={() => pushToLogout(props)}> Logout</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}

