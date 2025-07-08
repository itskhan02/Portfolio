import React from "react";

const Education = () => {
  return (
  <>
      <section id="education">
    <div>
      <h1><i class="fas fa-graduation-cap"></i>Education <span>&</span> Qualification</h1>
      <h2>
        The purpose of education is to replace an empty mind with an open one.
      </h2>
    </div>
    <div className="edu">
        <div className="college">
          <div className="img">
            <img src={"../public/College.jpg"} alt=""/>
          </div>
          <div className="content">
            <h2>Bachelor of Technology in Computer Science</h2>
            <p>Sri Sukhmani Institute of Engineering & Technology | I.K.G PTU</p>
            <h3>2023-2026 | Pursuing </h3>
          </div>
        </div>

        <div className="college">
          <div className="img">
            <img src={"../public/College.jpg"} alt=""/>
          </div>
          <div className="content">
            <h2>Diploma in Electrical Engineering</h2>
            <p>Sri Sukhmani Institute of Engineering & Technology | I.K.G PTU</p>
            <h3>2019-2021 | Completed</h3>
          </div>
        </div>

        <div className="college">
          <div className="img">
          <img src={"../public/School.png"} alt=""/>
          </div>
          <div className="content">
            <h2>Secondary Education (+1 & +2)</h2>
            <p>St. Attri Senior Secondary Public School | CBSE</p>
            <h3>2017-2019 | Completed</h3>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Education;
