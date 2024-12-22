'use client'

import MyComponent from '../components/CTA'
import NavBar from '../components/NavBar'

export default function WithSubnavigation() {
  return (
    <div bg='white'>
    <NavBar/>
    <MyComponent/>
    </div>
  )
}