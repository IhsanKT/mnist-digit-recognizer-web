from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch

from app.model import MNIST_CNN
from app.utils import preprocess_base64_image

app = FastAPI(title="MNIST Digit Predictor")

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mnist-classifier.netlify.app"],  # later restrict to Netlify domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Load Model ----------
device = torch.device("cpu")

model = MNIST_CNN().to(device)
model.load_state_dict(
    torch.load("model/mnist_cnn.pt", map_location=device)
)
model.eval()

# ---------- Request Schema ----------
class PredictRequest(BaseModel):
    image: str  # base64 encoded image

# ---------- Routes ----------
@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict_digit(data: PredictRequest):
    tensor = preprocess_base64_image(data.image).to(device)

    with torch.no_grad():
        outputs = model(tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probs, 1)

    return {
        "digit": predicted.item(),
        "confidence": round(confidence.item(), 4)
    }
