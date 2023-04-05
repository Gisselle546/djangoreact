import React, {useState} from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { FormBody, FormButton, FormContainer, HeaderContainer, InputWrapper, StyledSelect } from './ShippingForm.style';

type Props = {
    onShipping: any
}

function ShippingForm({onShipping}: Props) {

    const formik = useFormik({
        initialValues: {
          address: '',
          city: '',
          postalCode:'',
          country:'USA'
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
          console.log(values);
        },
      });


  return (
    <FormContainer>
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
           
    </FormContainer>
  )
}

export default ShippingForm