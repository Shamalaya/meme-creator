import { useFormik } from "formik";
import React from "react";
import { useMemesContext } from "../context/memes_context";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/user_context";

const MemeForm = ({ copy }) => {
  const { id } = useParams();

  let navigate = useNavigate();
  const { templates, memes, addMeme } = useMemesContext();
  const { myUser } = useUserContext();

  const meme = copy ? memes.find((el) => el.id === parseInt(id)) : {};
  const template = copy
    ? templates.find(
        (el) => el.id === memes.find((el) => el.id === parseInt(id)).template_id
      )
    : templates.find((el) => el.id === parseInt(id));

  let disableCheckbox = false;
  if (copy) {
    disableCheckbox = !!meme.protected === true && myUser.id !== meme.user_id;
  }

  const submitForm = (newMeme) => {
    addMeme(newMeme);
    navigate("/");
  };

  const validate = (values) => {
    // basic validation
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length > 15) {
      errors.title = "Must be 15 characters or less";
    }

    if (
      values.text[0] === "" &&
      values.text[1] === "" &&
      values.text[2] === ""
    ) {
      errors.text = "Write at least one text";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: copy ? meme.title : "",
      font: copy ? meme.font : "Arial",
      color: copy ? meme.color : "Black",
      myProtected: copy ? !!meme.protected : false,
      text: copy ? [meme.texts[0], meme.texts[1], meme.texts[2]] : ["", "", ""],
    },
    validate,
    onSubmit: (values) => {
      const templateId = id;
      const newMeme = {
        templateId: templateId,
        title: values.title,
        text: values.text,
        font: values.font,
        color: values.color,
        protected: values.myProtected,
      };
      submitForm(newMeme);
    },
  });
  return template && meme ? (
    <Wrapper>
      <h1>Create your meme</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title ? (
          <div className="error-message">{formik.errors.title}</div>
        ) : null}

        {template.textAreas
          .filter((el) => el[0] != null)
          .map((el, index) => {
            return (
              <div key={index}>
                <label htmlFor={`text[${index}]`}>{"Text" + (index + 1)}</label>
                <input
                  name={`text[${index}]`}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.text[index]}
                />
              </div>
            );
          })}
        {formik.errors.text ? (
          <div className="error-message">{formik.errors.text}</div>
        ) : null}

        <label htmlFor="font">Font</label>
        <select
          name="font"
          value={formik.values.font}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ display: "block" }}
        >
          <option value="Arial" label="Arial" />
          <option value="Verdana" label="Verdana" />
        </select>
        <label htmlFor="color">Color</label>
        <select
          name="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ display: "block" }}
        >
          <option value="Black" label="Black" />
          <option value="Blue" label="Blue" />
          <option value="Red" label="Red" />
          <option value="Green" label="Green" />
        </select>
        <div className="checkbox">
          <label htmlFor="myProtected" className="checks">
            Protected
          </label>
          <input
            type="checkbox"
            id="myProtected"
            name="myProtected"
            disabled={disableCheckbox}
            value={formik.values.myProtected}
            onChange={formik.handleChange}
          />
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div`
  margin-top: 5rem;
  text-align: center;
  width: 100%;
  padding-bottom: 4rem;

  form {
    display: inline-block;
    text-align: left;
    margin-left: -5rem;
  }
  label {
    display: block;
    margin-top: 1rem;
  }
  .checks label {
    margin-top: 0;
  }

  .text-input {
    padding: 0.5rem;
    border: solid 1px #999;
    width: 160%;
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
  }
  input,
  select {
    box-shadow: inset 1px 1px 3px #ccc;
    border-radius: 5px;
    margin-bottom: 0.9rem;
  }
  input[type="text"] {
    min-height: 2rem;
    padding: 0.5em;

    width: 150%;
  }

  input[type="checkbox"] {
    padding-top: 0;
    margin-top: 2rem;
  }

  button {
    margin-top: 2rem;
  }
  .checkbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45%;
  }
  .error-message {
    color: red;
  }
`;
export default MemeForm;
