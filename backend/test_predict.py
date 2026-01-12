import base64
import requests

# Load a sample MNIST image
from torchvision import datasets
from PIL import Image
import io

dataset = datasets.MNIST(root="./data", train=False, download=True)
image, label = dataset[100]

# Convert PIL image to PNG bytes
buffer = io.BytesIO()
image.save(buffer, format="PNG")

# Encode to base64
img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

payload = {
    "image": f"data:image/png;base64,{img_base64}"
}

response = requests.post(
    "http://127.0.0.1:8000/predict",
    json=payload
)

print("True label:", label)
print("Response:", response.json())