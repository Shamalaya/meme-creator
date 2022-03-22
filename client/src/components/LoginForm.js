import { useFormik } from "formik";
import React from "react";
import { useUserContext } from "../context/user_context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { handleLogin } = useUserContext();
  const history = useNavigate();

  const validate = (values) => {
    // basic validation
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Write assword";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      handleLogin(values).then(history("/"));
    },
  });
  return (
    <Wrapper className="section">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username" className="form-text">
          Email
        </label>
        <input
          id="username"
          name="username"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="form-input"
        />
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}

        <label htmlFor="password" className="form-text">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="form-input"
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 4rem;

  form {
    display: flex;
    flex-direction: column;

    .form-text {
      font-size: 1.5rem;
    }

    .form-input {
      box-shadow: inset 1px 1px 3px #ccc;
      border-radius: 5px;
      margin-bottom: 0.9rem;
    }
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
  }

  input,
  textarea,
  select,
  button {
    width: 150px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
export default LoginForm;
