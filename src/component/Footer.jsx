import React from 'react'

const Footer = () => {
  return (
  <>
      <section id="footer">
    <div className="footer">
      <div className="foot">
        <h2>Wasim Portfolio</h2>
        <p>
        Thank you for visiting my personal portfolio website. 
        Connect with me over socials.
          </p>
      </div>

      {/* <div className="foot">
        <h3>quick links</h3>
        <a href="#home"><i className="fas fa-chevron-circle-right"></i> home</a>
        <a href="#about"><i className="fas fa-chevron-circle-right"></i> about</a>
        <a href="#skills"><i className="fas fa-chevron-circle-right"></i> skills</a>
        <a href="#education"><i className="fas fa-chevron-circle-right"></i> education</a>
        <a href="#work"><i className="fas fa-chevron-circle-right"></i> work</a>
        <a href="#experience"><i className="fas fa-chevron-circle-right"></i> experience</a>
      </div> */}

      <div className="foot">
        <h2>contact info</h2>
        <p><i className="fas fa-phone"></i>+91 8847220962</p>
        <p><i className="fas fa-envelope"></i>akramwasim19799@gmail.com</p>
        <p><i className="fas fa-map-marked-alt"></i>Lalru, Chandigarh, Punjab, India - 140501</p>
        <div className="share">
          <a href="https://www.linkedin.com/in/wasim-akram-ab7224345/" className="fab fa-linkedin" aria-label="LinkedIn" target="_blank"></a>
          <a href="https://github.com/Wasimakram1923" className="fab fa-github" aria-label="GitHub" target="_blank"></a>
          <a href="mailto:akramwasim19799@gmail.com" className="fas fa-envelope" aria-label="Mail" target="_blank"></a>
          {/* <a href="" className="fab fa-twitter" aria-label="Twitter" target="_blank"></a>
          <a href="" className="fab fa-telegram-plane" aria-label="Telegram" target="_blank"></a> */}
          <a href="https://www.instagram.com/itz_khan_.09" className="fab fa-instagram " aria-label="Instagram" target="_blank"></a>
        </div>
      </div>
    </div>
    <br/>
    <h1 className="credit">
  <span> &copy;</span> 2025 Wasim Akram, All rights reserved.
    </h1>
  </section>
  </>
  )
}

export default Footer

