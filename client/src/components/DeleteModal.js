import React from "react";
import styled from "styled-components";

const DeleteModal = ({ setShowModal, deleteMeme, id }) => {
  return (
    <Wrapper>
      <div className="darkBG" onClick={() => setShowModal(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Confirm delete</h5>
          </div>
          <div className="modalContent">
            Are you sure you want to delete this meme?
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="btn-delete btn"
                onClick={() => {
                  deleteMeme(id);
                  setShowModal(false);
                }}
              >
                Delete
              </button>
              <button
                className="btn cancelBtn "
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DeleteModal;

const Wrapper = styled.div`
  .darkBG {
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }

  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .modal {
    width: 250px;
    height: 170px;
    background: white;
    color: white;
    z-index: 10;
    border-radius: 16px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  }

  .modalHeader {
    height: 50px;
    background: white;
    overflow: hidden;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  .heading {
    margin: 0;
    padding: 10px;
    color: #2c3e50;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
  }

  .modalContent {
    padding: 10px;
    font-size: 14px;
    color: #2c3e50;
    text-align: center;
  }

  .modalActions {
    position: absolute;
    bottom: 2px;
    margin-bottom: 10px;
    width: 100%;
  }

  .actionsContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .closeBtn:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-4px, 4px);
  }

  .btn-delete {
    background-color: var(--clr-red-dark);
  }

  .cancelBtn {
    cursor: pointer;
    border: none;
    color: #2c3e50;
    background: white;
    transition: all 0.25s ease;
  }

  .cancelBtn:hover {
    box-shadow: none;
    transform: none;
    background: whitesmoke;
  }
  .primaryBtn {
    margin: 20px 10px;
    cursor: pointer;
    font-weight: 500;
    padding: 13px 25px;
    border-radius: 15px;
    font-size: 0.8rem;
    border: none;
    color: white;
    background: #185adb;
    transition: all 0.25s ease;
  }

  .primaryBtn:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -10px rgba(24, 90, 219, 0.6);
  }
`;
