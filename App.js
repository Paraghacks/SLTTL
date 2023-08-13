import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import SignLanguageModel from './SignLanguageModel';
import './App.css';

const App = () => {
  const webcamRef = useRef(null);
  const [textOutput, setTextOutput] = useState('');
  const signLanguageModelRef = useRef(null); // Ref for the SignLanguageModel instance

  useEffect(() => {
    const initializeSignLanguageModel = async () => {
      const model = new SignLanguageModel();
      await model.loadModel();
      signLanguageModelRef.current = model; // Store the model in the ref
      startGestureRecognition();
    };

    initializeSignLanguageModel();
  }, []);

  const startGestureRecognition = () => {
    // Check if the model is properly initialized
    if (!signLanguageModelRef.current) return;

    const video = webcamRef.current.video;
    setInterval(async () => {
      const predictions = await signLanguageModelRef.current.predict(video);
      if (predictions && predictions.length > 0) {
        // Convert the predictions to text using a mapping or dictionary
        // For simplicity, let's assume we have a 'gesturesToText' mapping
        // where each gesture is associated with a specific text.
        const gesture = predictions[0].gesture;
        const text = gesturesToText[gesture] || '';
        setTextOutput(text);
      }
    }, 200);
  };

  const gesturesToText = {
    'thumbs_up': 'Hello!',
    'open_palm': 'Good job!',
    'victory_hand': 'Yes',
    'index_finger': 'ohh',
    // Add more gestures and their corresponding text here
  };


 return (
    <div className="App">
      <h1>Sign Language to Text</h1>
      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          videoConstraints={{
            facingMode: 'user', // Change this based on your camera
            width: 1280, // Adjust the width as needed
            height: 720, // Adjust the height as needed
          }}
        />
        <div className="text-output">{textOutput}</div>
      </div>
    </div>
  );
};

export default App;
