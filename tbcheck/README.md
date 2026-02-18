# 🩻 TB X-Ray Diagnostic Ensemble System

This is a lightweight, web-based medical imaging application designed to screen chest X-rays for Tuberculosis (TB). The system utilizes an **Ensemble Learning** approach, combining predictions from three distinct deep learning architectures to improve diagnostic reliability.

## Live Demo
[Insert your Streamlit Cloud Link here, e.g., https://tb-detector.streamlit.app]

## Model Architectures
The system runs a simultaneous analysis across three models trained on chest X-ray datasets:
1. **Custom CNN:** A lightweight convolutional neural network optimized for specific feature extraction.
2. **MobileNetV2:** A highly efficient architecture utilizing depthwise separable convolutions, ideal for web deployment.
3. **ResNet50:** A deep residual network that uses skip connections to identify complex patterns in lung tissue.



## 🛠️ Technology Stack
- **Frontend/Backend:** [Streamlit](https://streamlit.io/)
- **Deep Learning:** [TensorFlow/Keras](https://www.tensorflow.org/)
- **Image Processing:** Pillow, NumPy
- **Report Generation:** FPDF

## 📂 Repository Structure
```text
├── models/
│   ├── custom_cnn.h5       # Your trained Custom CNN
│   ├── mobilenetv2_tb.h5   # Your trained MobileNetV2
│   └── resnet50_tb.h5      # Your trained ResNet50
├── app.py                  # Main Streamlit application
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation