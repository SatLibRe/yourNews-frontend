import React from "react";
import { css } from "@emotion/core";
import RiseLoader from "react-spinners/RiseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class Spinner extends React.Component {

  render() {
    return (
      <div className="spinner">
        <RiseLoader
          css={override}
          size={60}
        //   color={"f50057"}
        />
      </div>
    );
  }
}