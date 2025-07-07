import React, { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  // Close menu on window resize (if user resizes to desktop)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header>
        <div className="logo">
          <a href="/">
          <img src={"src/images/logo.png"} alt="Logo" />
            Wasim Akram{" "}
          </a>
        </div>
        <div
          id="menu"
          className={`menu show-mobile${open ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </div>
        <nav className={`navbar${open ? ' is-open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
            <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
            <li><a href="#education" onClick={() => setOpen(false)}>Education</a></li>
            <li><a href="#project" onClick={() => setOpen(false)}>Projects</a></li>
            {/* <li><a href="#experience" onClick={() => setOpen(false)}>Experience</a></li> */}
            <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
