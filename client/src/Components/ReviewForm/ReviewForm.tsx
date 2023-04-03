import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import React from 'react'
import { InputWrapper, ReviewContainer } from './ReviewForm.style';

function ReviewForm() {
    const router = useRouter();


    const formik = useFormik({
        initialValues: {
          title: '',
          comment: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                      .required('Title is required!'), 
            comment: Yup.string()
                         .required('Please write your review!')
        }),
        onSubmit: async values => {
          console.log(values);
        },
      });
  return (
        <ReviewContainer>
            <InputWrapper type="email" name="email" value={formik.values.title} onChange={formik.handleChange} placeholder="Enter Email Address"/>
            <InputWrapper type="password" name="password" value={formik.values.comment} onChange={formik.handleChange}placeholder="Enter Password"/>
        </ReviewContainer>

  )
}

export default ReviewForm