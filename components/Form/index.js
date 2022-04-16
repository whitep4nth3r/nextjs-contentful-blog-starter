 import React from 'react';
 import { Formik } from 'formik';

 import { Config } from "@utils/Config";

 export const BasicForm = () => (
   <div>
     <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-vk-red">Formulář</h2>
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
       onSubmit={async (values, { setSubmitting }) => {
         setTimeout(() => {
           //console.log('test');
           setSubmitting(false);
         }, 400);
         const added = await sendToContentful(values);
         console.log(added);
         const publish = await publishToContentful(added);
         console.log(publish);
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
           <label className="form-label inline-block mb-2 text-gray-700">Jméno</label>
            <input
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
             type="name"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
           />
           {errors.email && touched.email && errors.email}<br/>
           <label className="form-label inline-block mb-2 text-gray-700">Email</label>
           <input
             className="form-control
             block
             w-full
             px-3
             py-1.5
             text-base
             font-normal
             text-gray-700
             bg-white bg-clip-padding
             border border-solid border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}<br/>
           <label className="form-label inline-block mb-2 text-gray-700">Zpráva</label>
           <input
           className="        form-control
           block
           w-full
           px-3
           py-1.5
           text-base
           font-normal
           text-gray-700
           bg-white bg-clip-padding
           border border-solid border-gray-300
           rounded
           transition
           ease-in-out
           m-0
           focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
             type="message"
             name="message"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.message}
           />
           {errors.message && touched.message && errors.message}<br/>
           <button type="submit" disabled={isSubmitting} className="inline-block px-6 py-2.5 bg-vk-red text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
             Odeslat
           </button>
         </form>
       )}
     </Formik>
   </div>
 );


 const contentful = require('contentful-management')
 const client = contentful.createClient({
   accessToken: Config.contentful.accessToken
 })

 const sendToContentful = async function(props){

  // Create entry
  const dataCreate = client.getSpace(Config.contentful.space)
  .then((space) => space.getEnvironment(Config.contentful.entry))
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
  .then((response) => response)
  .catch(console.error)

  return dataCreate

  
 }

 const publishToContentful = async function({sys: {id}}){

 const dataUpdate = client.getSpace(Config.contentful.space)
.then((space) => space.getEnvironment(Config.contentful.entry))
.then((environment) => environment.getEntry(id))
.then((entry) => entry.publish())
.then((entry) => entry)
.catch(console.error)

return dataUpdate;

}