 import React from 'react';
 import { Formik } from 'formik';
 
 export const BasicForm = () => (
   <div>
     <h1>Formulář</h1>
     <Formik
       initialValues={{ name: '', email: '', message: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Povinné pole';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Špatný email';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           console.log(values);
           const resultFromSubmit = setSubmitting(false);
           console.log(resultFromSubmit);
         }, 400);
         const added = sendToContentful(values);
         console.log(added);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <label>Jméno</label>
            <input
             type="name"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
           />
           {errors.email && touched.email && errors.email}<br/>
           <label>Email</label>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}<br/>
           <label>Zpráva</label>
           <input
             type="message"
             name="message"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.message}
           />
           {errors.message && touched.message && errors.message}<br/>
           <button type="submit" disabled={isSubmitting}>
             Odeslat
           </button>
         </form>
       )}
     </Formik>
   </div>
 );



 const sendToContentful = async function(props){
  const contentful = require('contentful-management')
  const client = contentful.createClient({
    accessToken: 'CFPAT-nh3h6uqrneRA-i3QnAunBSXu06EZ_SllOQkW-ZZaM8Y'
  })
  
  // Create entry
  const dataCreate = client.getSpace('ugjhw3umzt7r')
  .then((space) => space.getEnvironment('master'))
  .then((environment) => environment.createEntry('form', {
    fields: {
      name: {
        'en-US': props.name
      },
      email: {
       'en-US': props.email
     },
     message: {
       'en-US': {
         content: [
             {
                 nodeType:"paragraph",
                 data: {},
                 content: [
                     {
                         value: props.message,
                         nodeType:"text",
                         marks: [],
                         data: {}
                     }
                 ]
             }
         ],
         data: {},
nodeType: 'document'
}
     }
    }
  }))
  .then((response) => response.json())
  .catch(console.error)

  return dataCreate
 }