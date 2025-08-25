[![CI/CD](https://github.com/carlosmaccarrone/HumanChecker/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosmaccarrone/HumanChecker/actions/workflows/ci.yml)
🎬 [Live Demo](https://carlosmaccarrone.github.io/HumanChecker/) – Check out the app running in your browser!

# HumanChecker Frontend – React interface for a TensorFlow-trained shape classifier

React frontend that consumes the **HumanCheckerBackend** deployed in the cloud.  

## Description

This project is the user interface for a **hand-drawn shape classifier** with three figures: triangles, squares, and circles.  

- The model is trained with **Quick, Draw!** dataset.  
- The frontend only handles drawing input, prompts, feedback, and sends data to the backend for predictions.  

## Technologies

- React  
- Webpack  
- Babel  
- React Router  
- Jest  
- cross-env  
- CSS Modules  
- copy-webpack-plugin  

## Model

- Dataset: **Quick, Draw!**  
- Framework: **TensorFlow**  
- The trained model is exported to **ONNX** and loaded by the backend for predictions.

## Usage

1. Make sure the backend is running in the cloud.  
2. Install dependencies and start the frontend:  

```bash
npm install
npm start
```

3. Open http://localhost:3000 and draw the prompted shapes

Note

The frontend does not contain the model logic; it relies entirely on the backend for predictions.
