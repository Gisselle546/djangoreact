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
          address: '',
          city: '',
          postalCode:'',
        },
        validationSchema: Yup.object({
            address: Yup.string()
                      .required('address is required'), 
            city: Yup.string()
                         .required('city is required'),
            postalCode: Yup.string()
                         .required('city is required'),
            
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
                <InputWrapper type="text" name="address" value={formik.values.address} onChange={formik.handleChange} placeholder="Enter address"/>
                {formik.errors.address && <div>{formik.errors.address}</div> }
                <InputWrapper type="text" name="city" value={formik.values.city} onChange={formik.handleChange}placeholder="Enter city"/>
                {formik.errors.city && <div>{formik.errors.city}</div> }
                <InputWrapper type="text" name="postalCode" value={formik.values.postalCode} onChange={formik.handleChange}placeholder="Enter postal code"/>
                {formik.errors.postalCode && <div>{formik.errors.postalCode}</div> }
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