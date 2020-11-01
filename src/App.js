import React from "react";
import "./App.css";
import SignUp from "./routes/SignUp.js";
import Login from "./routes/Login.js";
import Home from "./routes/Home.js";
import SelectInterests from "./routes/SelectInterests.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Nav from "./components/Nav.js";
import { connect } from "react-redux";
import {URL} from "./HostURL";

import {
  setAlertTrueRedux,
  clearCustom1Redux,
  clearCustom2Redux,
  currentUserFetch,
} from "./redux/actions";

class App extends React.Component {
  state = {
    sources: [],
    countries: [],
  };

  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      this.props.currentUserFetch(token)
    } else {
      this.props.history.push("/login")
    }
  }

  handleSelectInterests = (e) => {
    e.preventDefault();

    this.props.setAlertTrueRedux();

    if (this.props.custom1.length >= 2) {
      fetch(`${URL}/customqueries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: this.props.custom1,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          fetch(`${URL}/customqueryusers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              user_id: this.props.currentUser.id,
              custom_query_id: response.id,
            }),
          });
        })
        .then(() => {
          this.props.clearCustom1Redux();
        });
    }

    if (this.props.custom2.length >= 2) {
      fetch(`${URL}/customqueries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: this.props.custom2,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          fetch(`${URL}/customqueryusers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              user_id: this.props.currentUser.id,
              custom_query_id: response.id,
            }),
          });
        })
        .then(() => {
          this.props.clearCustom2Redux();
        });
    }

    this.state.countries.forEach((country) => {
      fetch(`${URL}/countries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: country,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          fetch(`${URL}/countryusers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              user_id: this.props.currentUser.id,
              country_id: response.id,
            }),
          });
        });
    });

    this.state.sources.forEach((source) => {
      fetch(`${URL}/sources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: source,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          fetch(`${URL}/usersources`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              user_id: this.props.currentUser.id,
              source_id: response.id,
            }),
          });
        });
    });
  };

  setUser = (response) => {
    this.setState(
      {
        currentUser: response.user,
      },
      () => {
        localStorage.token = response.token;
      }
    );
  };

  //moved to store
  // setAlertFalse = () => {
  //   this.setState({
  //     alertTriggered: false
  //   })
  // }

  checkChecked = (name) => {
    return this.state.sources.includes(name);
  };

  checkCountryChecked = (name) => {
    return this.state.countries.includes(name.split(":")[0]);
  };

  handleSourcesInputChange = (e) => {
    if (e.target.checked === true) {
      this.setState({
        sources: [...this.state.sources, e.target.name],
      });
    } else if (e.target.checked === false) {
      this.setState({
        sources: this.state.sources.filter((source) => source != e.target.name),
      });
    }
  };

  handleAppStateSourceRemoval = (e) => {
    this.setState({
      sources: this.state.sources.filter(
        (name) => name != e.target.innerText.split(" ")[1]
      ),
    });
  };

  handleAppStateCountryRemoval = (e) => {
    this.setState({
      countries: this.state.countries.filter(
        (name) => name != e.target.innerText.split(" ")[1].toLowerCase()
      ),
    });
  };

  handleCountriesInputChange = (e) => {
    if (e.target.checked === true) {
      this.setState({
        countries: [...this.state.countries, e.target.name.split(":")[0]],
      });
    } else if (e.target.checked === false) {
      this.setState({
        countries: this.state.countries.filter(
          (country) => country != e.target.name.split(":")[0]
        ),
      });
    }
  };

  //moved to store
  // handleCustomFormChange = e => {
  //   this.setState({
  //     [e.target.name] : e.target.value
  //   })
  // }

  handleLogout = () => {
    this.setState(
      {
        currentUser: "",
      },
      () => {
        localStorage.removeItem("token");
      }
    );
  };

  render() {
    console.log(this.props);
    return (
      <Router>
        <Route
          exact
          path="https://yournewsfrontend.herokuapp.com/signup"
          render={(props) => <SignUp {...props} setUser={this.setUser} />}
        />
        <Route
          exact
          path="https://yournewsfrontend.herokuapp.com/login"
          render={(props) => <Login {...props} setUser={this.setUser} />}
        />
        <Route
          exact
          path="/selectinterests"
          render={(props) =>
            localStorage.token ? (
              <SelectInterests
                handleLogout={this.handleLogout}
                checkCountryChecked={this.checkCountryChecked}
                checkChecked={this.checkChecked}
                {...props}
                handleSelectInterests={this.handleSelectInterests}
                handleSourcesInputChange={this.handleSourcesInputChange}
                handleCountriesInputChange={this.handleCountriesInputChange}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/home"
          render={(props) =>
            localStorage.token ? (
              <Home
                handleLogout={this.handleLogout}
                handleAppStateCountryRemoval={this.handleAppStateCountryRemoval}
                handleAppStateSourceRemoval={this.handleAppStateSourceRemoval}
                {...props}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Router>
    );
  }
}

function msp(state) {
  return {
    currentUser: state.currentUser,
    custom1: state.custom1,
    custom2: state.custom2,
  };
}

const mdp = {
  currentUserFetch,
  setAlertTrueRedux,
  clearCustom1Redux,
  clearCustom2Redux,
};

export default connect(msp, mdp)(App);
