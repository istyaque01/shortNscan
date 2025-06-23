import React from 'react'
import Hero from "../components/Hero"
import Products from "../components/Products"
import Trusted from "../components/Trusted"
import FAQs from "../components/FAQs"

const Home = () => {
  return (
    <div className='main  bg-stone-200'>
        <Hero/>
        <Products/>
        <Trusted/>
        <FAQs/>
    </div>
  )
}

export default Home