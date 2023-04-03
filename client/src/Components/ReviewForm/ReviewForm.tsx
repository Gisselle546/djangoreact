import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { ButtonContainer, InputWrapper, ReviewContainer, ReviewHeader, TextArea } from './ReviewForm.style';
import StarRating from '../StarRating/StarRating';


function ReviewForm() {
    const router = useRouter();
    const [rating, setRating] = useState()

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
      console.log(rating);
  return (
        <ReviewContainer>
            <ReviewHeader>Leave a Review</ReviewHeader>
            <InputWrapper type="text" name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Enter title"/>
             Rating: <StarRating changable={true}ratingValue={rating} setRating={(e)=>setRating(e)} />
            <TextArea
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                rows={5} 
                cols={50}
                
                />
                <ButtonContainer>Submit</ButtonContainer>
        </ReviewContainer>

  )
}

export default ReviewForm