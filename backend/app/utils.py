import base64
import io
import torch
from PIL import Image
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((28, 28)),
    transforms.Grayscale(),
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

def preprocess_base64_image(base64_str: str) -> torch.Tensor:
    """
    Converts base64 canvas image to torch tensor
    """
    image_bytes = base64.b64decode(base64_str.split(",")[-1])
    image = Image.open(io.BytesIO(image_bytes)).convert("L")

    tensor = transform(image)
    tensor = tensor.unsqueeze(0)  # shape: [1, 1, 28, 28]

    return tensor
