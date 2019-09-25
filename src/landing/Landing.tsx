import React from 'react'
import { Link } from 'react-router-dom'

const Landing: React.FC = () => (
  <div>
    Landing
    <br />
    <Link to="/auth/signin">Login page</Link>
    <Link to="/auth/signup">Registration page</Link>
    <Link to="/service/dashboard">Dashboard</Link>
  </div>
)

export default Landing
