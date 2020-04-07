import React from "react";
import Popup from "reactjs-popup";
export default () => (
  <Popup trigger={<button className="button" id="modal-button"> First Time? Click here for instructions </button>} modal>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Welcome to YourNews! </div>
        <div className="content">
          {" "}
          <p>
          YourNews is for you by you! Allowing you to curate the world's news to your speficiations! 
          </p>
          <p>
          On this page you are able to follow specific sources, countries, and even keywords of your choice. 
          </p>
          <p>
          Use the form below to make your selections, once done click "Add Selections" then click home to be directed to your News hub!
          </p>
        </div>
        <div className="actions">
          <Popup
            // trigger={<button className="button"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close 
          </button>
        </div>
      </div>
    )}
  </Popup>
);