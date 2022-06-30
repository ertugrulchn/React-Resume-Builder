import React from "react";
import "./Home.css";
import Image from "../assets/resume_builder.svg";

function Home() {
  return (
    <div className="hero">
      <div className="hero_texts">
        <h1>Create Your Awesome Resume</h1>
        <p>
          Create Your Awesome Resume With Meraklı Coder Resume Builder For Free
        </p>
        <a href="/create-resume" className="button">
          Create Your Resume
        </a>
      </div>
      <img src={Image} className="builder_image" />
    </div>
  );
}

export default Home;
