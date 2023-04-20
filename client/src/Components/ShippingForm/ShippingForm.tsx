import React, {useState} from 'react'
import {useFormik} from 'formik';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import * as Yup from 'yup';
import { FormBody, FormButton, FormContainer, HeaderContainer, InputWrapper, StyledSelect } from './ShippingForm.style';
import { shippingdetails } from '@/redux/reducer/orderSlice';


type Props = {
    onShipping: any
}

function ShippingForm({onShipping}: Props) {
    const dispatch = useAppDispatch();
  
  
    const formik = useFormik({
        initialValues: {
          street_address: '',
          city: '',
          state: '',
          zip_code:'',
          country: 'USA'
        },
        validationSchema: Yup.object({
          street_address: Yup.string()
                      .required('address is required'), 
            city: Yup.string()
                         .required('city is required'),
            zip_code: Yup.string()
                         .required('zip code is required'),
            state: Yup.string()
                         .required('state is required'),
            
        }),
        onSubmit: async values => {
          dispatch(shippingdetails(values))
          onShipping();
        },
      });


  return (
    <FormContainer>
           <form  style={{border:'0', margin:'0', padding:'0'}} onSubmit={formik.handleSubmit}>
            <FormBody>
                <HeaderContainer> Shipping</HeaderContainer>
                <InputWrapper type="text" name="street_address" value={formik.values.street_address} onChange={formik.handleChange} placeholder="Enter address"/>
                {formik.errors.street_address && <div>{formik.errors.street_address}</div> }
                <InputWrapper type="text" name="city" value={formik.values.city} onChange={formik.handleChange}placeholder="Enter city"/>
                {formik.errors.city && <div>{formik.errors.city}</div> }
                <InputWrapper type="text" name="state" value={formik.values.state} onChange={formik.handleChange}placeholder="Enter state"/>
                {formik.errors.state && <div>{formik.errors.state}</div> }
                <InputWrapper type="text" name="zip_code" value={formik.values.zip_code} onChange={formik.handleChange}placeholder="Enter zip code"/>
                {formik.errors.zip_code && <div>{formik.errors.zip_code}</div> }
                <StyledSelect defaultValue="USA">
                    <option value="USA">United States</option>
                </StyledSelect>
                <FormButton type="submit">Next&rarr; </FormButton>
            </FormBody>
           </form>
    </FormContainer>
  )
}

export default ShippingForm