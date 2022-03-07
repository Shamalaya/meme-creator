import { useFormik } from 'formik';
import React from 'react'
import { useMemesContext } from '../context/memes_context';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import Loading from './Loading';

const MemeForm = () => {
    const { id } = useParams();

    const { templates, memes, addMeme } = useMemesContext();
    const template = templates.find(el => el.id === parseInt(id))

    const validate = values => {

        // basic validation
        const errors = {};
        if (!values.title) {
            errors.title = 'Required';
        } else if (values.title.length > 15) {
            errors.title = 'Must be 15 characters or less';
        }

        if (values.text[0] === '' && values.text[1] === "" && values.text[2] === "") {
            errors.text = 'Write at least one text';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            font: 'Arial',
            color: "Black",
            myProtected: false,
            text: ["", "", ""],
        },
        validate,
        onSubmit: values => {
            const templateId = id;
            const newMeme = { templateId: templateId, title: values.title, text: values.text, font: values.font, color: values.color, protected: values.myProtected }
            console.log(newMeme)
            addMeme(newMeme)
        },
    });
    return (template ? <Wrapper className='section'>
        <div className='section-center'>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.errors.title ? <div>{formik.errors.title}</div> : null}

                {template.textAreas
                    .filter((el) => el[0] != null)
                    .map((el, index) => {
                        return (<div key={index}>
                            <label
                                htmlFor={`text[${index}]`}>{'Text' + (index + 1)}</label>
                            <input
                                name={`text[${index}]`}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.text[index]} />
                        </div>)
                    })}
                {formik.errors.text ? <div>{formik.errors.text}</div> : null}

                <label htmlFor="font">Font</label>
                <select
                    name="font"
                    value={formik.values.font}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ display: 'block' }}
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
                    style={{ display: 'block' }}
                >
                    <option value="Black" label="Black" />
                    <option value="Blue" label="Blue" />
                    <option value="Red" label="Red" />
                    <option value="Green" label="Green" />


                </select>

                <label htmlFor='myProtected'>Protected</label>
                <input
                    type="checkbox"
                    id="myProtected"
                    name="myProtected"
                    value={formik.values.myProtected}
                    onChange={formik.handleChange} />


                <button className='btn' type="submit">Submit</button>

            </form ></div></Wrapper> : <Loading />
    );
}


const Wrapper = styled.div`



button, input, select, textarea {
  font-family: inherit;
  font-size: 100%;
}

input, textarea, select, button {
  width : 150px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


`
export default MemeForm;