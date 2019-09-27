import React from 'react'
import { Link } from 'react-router-dom'

const Landing: React.FC = () => (
  <div className="container landing">
    <div className="landing_photos">
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/0.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/1.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/2.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/3.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/4.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/5.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/6.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/7.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/8.jpg')} alt=""/></div>
      <div className="landing_photo-wrapper"><img className="landing_photo" src={require('./images/9.jpg')} alt=""/></div>
    </div>
    <Link to="/auth/signup" className="landing_btn">
      Join to us
    </Link>
  </div>
)

export default Landing
