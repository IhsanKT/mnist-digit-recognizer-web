# 🧠 MNIST Digit Recognition Web App

A full-stack machine learning web application that recognizes handwritten digits (0–9) using a Convolutional Neural Network (CNN) trained on the MNIST dataset.  
The project demonstrates an end-to-end ML workflow: **model training → API deployment → frontend integration → cloud hosting**.

---

## 🚀 Live Demo

- **Frontend (Netlify):** https://mnist-classifier.netlify.app  
- **Backend API (Render):** https://mnist-backend-95j0.onrender.com  

> ⚠️ Note: The backend is hosted on Render's free tier, so the first request may take ~30–60 seconds due to cold start.

---

## 📌 Project Overview

This project allows users to:
- Draw a digit directly on a canvas in the browser
- Send the drawing to a backend API
- Receive a predicted digit along with confidence score
- Visualize prediction confidence in a clean UI

The focus is on **practical ML deployment**, not just model accuracy.

---

## 🧠 Model Training

- **Dataset:** MNIST handwritten digits
- **Model:** Convolutional Neural Network (CNN)
- **Framework:** PyTorch
- **Training Environment:** Google Colab

The model was trained offline using Google Colab and then exported as a `.pt` file for inference.

### Training Notebook
The full training code is available in this repository:
```
mnist_model.ipynb
```

This notebook covers:
- Data loading & preprocessing
- CNN architecture
- Training & evaluation
- Model export for deployment

---

## 🏗️ System Architecture
```
React Frontend (Netlify)
|
|  HTTPS (JSON, Base64 image)
v
FastAPI Backend (Render)
|
v
PyTorch CNN Model (MNIST)
```

---

## 🖥️ Frontend

- **Framework:** React
- **Styling:** Tailwind CSS
- **Runtime:** Node.js
- **Features:**
  - Canvas-based digit drawing
  - Mobile-responsive design
  - Prediction confidence bar
  - Loading & cold-start handling
  - Clean, minimal UI

The frontend sends the drawn digit as a Base64-encoded image to the backend API.

---

## ⚙️ Backend

- **Framework:** FastAPI
- **ML Framework:** PyTorch
- **Responsibilities:**
  - Accept image input from frontend
  - Preprocess image to MNIST format (28×28 grayscale)
  - Run model inference
  - Return predicted digit and confidence score
- **Deployment:** Render (Free Tier)

CORS is properly configured to allow requests from the Netlify frontend.

---

## ☁️ Deployment

| Component | Platform |
|---------|----------|
| Frontend | Netlify |
| Backend | Render |
| Model Training | Google Colab |
| Version Control | GitHub |

Environment variables are managed securely via Netlify settings (`REACT_APP_API_URL`).

---

## 🎯 Key Highlights

- End-to-end ML system (training → deployment → UI)
- Clean separation of concerns (model, API, frontend)
- Real cloud deployment (no local-only demo)
- Mobile-responsive and user-friendly UI
- Proper handling of CORS, cold starts, and environment variables

---

## 🛠️ Tech Stack

- **Machine Learning:** PyTorch
- **Backend:** FastAPI
- **Frontend:** React, Tailwind CSS
- **Hosting:** Render, Netlify
- **Training:** Google Colab
- **Version Control:** Git & GitHub

---

## 📈 Future Improvements

- Show top-3 predictions with probabilities
- Display preprocessed 28×28 input image
- Add model confidence warnings for low certainty
- Improve drawing smoothing for mobile devices

---

## 👤 Author

**Ihsan Afroz KT**

---

## 📄 License

This project is for educational and portfolio purposes.
