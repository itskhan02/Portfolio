import React from "react";
import About from "./About";
import Skill from "./Skill";
import Education from "./Education";
import Project from "./Project";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {


  // const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
    <Header/>
      <section id="home">
      <div className="info">
          <h3>Hi! There...</h3>
          <h1>I'm MD Wasim <span>Akram</span></h1>
          <h2>And I'm a <span>Frontend Developer</span></h2>
          <a href="#about" className="btn"><span>About Me</span>
          <i class="fas fa-arrow-circle-right"></i></a>
          <div className="socials">
        <ul className="social-icons">
          <li><a className="linkedin" aria-label="LinkedIn" href="https://www.linkedin.com/in/wasim-akram-ab7224345/" target="_blank"><i className="fab fa-linkedin"></i></a></li> 
          <li><a className="github" aria-label="GitHub" href="https://github.com/Wasimakram1923" target="_blank"><i class="fab fa-github"></i></a></li>
          {/* <li><a className="twitter" aria-label="Twitter" href="" target="_blank"><i class="fab fa-twitter"></i></a></li> */}
          <li><a className="telegram" aria-label="Telegram" href="" target="_blank"><i class="fab fa-telegram-plane"></i></a></li>
          <li><a className="instagram" aria-label="Instagram" href="https://www.instagram.com/itz_khan_.09"><i class="fab fa-instagram" target="_blank"></i></a></li>
        </ul>
      </div>
        </div> 
        <div className="hero">
          <img src={"src/images/hero.png"}></img>
        </div> 

      </section>
      

      <About/>
      <Skill/>
      <Education/>
      <Project/>
      <Contact/>
      <Footer/>
    </>
  );
};

export default Home;
