import '../styles/globals.css'
import React from 'react'
import { AppWrapper } from '../context/state';


export default function App({ Component, pageProps }) {
  
  return (
    <AppWrapper>
  <Component {...pageProps} />
  </AppWrapper>
  )
}