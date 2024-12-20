import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About iNotebook</h1>
      <p>
        Welcome to <strong>iNotebook</strong>, your personal digital notebook built with the power of the MERN stack (MongoDB, Express.js, React.js, Node.js).
      </p>
      <p>
        iNotebook is a simple and efficient web application that allows you to create, edit, and delete your notes securely and effortlessly. Whether you're keeping track of important tasks, jotting down ideas, or organizing your thoughts, iNotebook makes it easy to manage your personal notes anytime, anywhere.
      </p>
      <h2>Features:</h2>
      <ul>
        <li>Create and save your personal notes with ease</li>
        <li>Edit and update notes whenever necessary</li>
        <li>Delete notes that are no longer needed</li>
        <li>Secure and simple user experience</li>
      </ul>
      <p>
        iNotebook is designed with simplicity in mind, offering a user-friendly interface that helps you stay organized without unnecessary complexity. Your notes are stored securely and can be accessed only by you.
      </p>
      <h2>Built with:</h2>
      <ul>
        <li><strong>React.js</strong> for the frontend</li>
        <li><strong>Node.js</strong> and <strong>Express.js</strong> for the backend</li>
        <li><strong>MongoDB</strong> for storing your notes</li>
      </ul>
      <p>
        Whether you're using it for personal tasks, studying, or just capturing thoughts on the go, iNotebook is here to make note-taking easier and more organized. We hope you enjoy using it!
      </p>
    </div>
  );
};

export default About;
