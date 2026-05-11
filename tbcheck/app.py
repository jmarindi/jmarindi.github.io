import streamlit as st
import tensorflow as tf
from PIL import Image, ImageOps
import numpy as np
from fpdf import FPDF
import datetime
import os

#updated
# --- 1. Page Configuration ---
st.set_page_config(
    page_title="TB X-Ray Ensemble Diagnostic",
    page_icon="🩻",
    layout="wide"
)

# --- 2. Robust Model Loader ---
@st.cache_resource
def load_all_models():
    """Loads Custom CNN, MobileNetV2, and ResNet50 with path verification."""
    model_folder = 'models'
    
    # Check if folder exists
    if not os.path.exists(model_folder):
        st.error(f"❌ Folder '{model_folder}' not found. Please create it in your GitHub repo.")
        return None, None, None

    try:
        # Paths - Ensure these filenames match your GitHub exactly!
        path_cnn = os.path.join(model_folder, 'custom_cnn.h5')
        path_mobile = os.path.join(model_folder, 'mobilenetv2_tb.h5')
        path_resnet = os.path.join(model_folder, 'resnet50_tb.h5')

        cnn = tf.keras.models.load_model(path_cnn)
        mobile = tf.keras.models.load_model(path_mobile)
        resnet = tf.keras.models.load_model(path_resnet)
        
        return cnn, mobile, resnet
    except Exception as e:
        st.error(f"❌ Error loading files: {e}")
        st.info(f"Files detected in /models: {os.listdir(model_folder)}")
        return None, None, None

# --- 3. Specialized Preprocessing ---
def preprocess_image(image, model_type):
    """Specific normalization for each architecture."""
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)

    if model_type == "mobilenet":
        # MobileNetV2 expects scaling between -1 and 1
        return tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    elif model_type == "resnet":
        # ResNet50 standard preprocess (zero-centering)
        return tf.keras.applications.resnet50.preprocess_input(img_array)
    else:
        # Custom CNN typically uses 0-1 scaling
        return img_array / 255.0

# --- 4. PDF Generation ---
def create_pdf(results, final_verdict):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, "TB X-Ray AI Analysis Report", ln=True, align='C')
    pdf.set_font("Arial", size=10)
    pdf.cell(200, 10, f"Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}", ln=True, align='C')
    pdf.ln(10)
    
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(0, 10, "Individual Model Predictions:", ln=True)
    pdf.set_font("Arial", size=12)
    for name, score in results.items():
        label = "POSITIVE" if score > 0.5 else "NEGATIVE"
        pdf.cell(0, 10, f"- {name}: {label} ({score*100:.2f}%)", ln=True)
    
    pdf.ln(10)
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, f"Final Ensemble Verdict: {final_verdict}", ln=True)
    pdf.ln(20)
    pdf.set_font("Arial", 'I', 8)
    pdf.multi_cell(0, 10, "DISCLAIMER: This is a prototype AI screening tool. Results must be validated by a radiologist.")
    
    return pdf.output(dest='S').encode('latin-1')

# --- 5. Main Application UI ---
def main():
    st.title("🩻 TB X-Ray Ensemble Diagnostic System")
    st.markdown("---")
    
    # Load Models
    cnn_model, mobile_model, res_model = load_all_models()
    
    # Sidebar Info
    st.sidebar.header("System Status")
    if cnn_model and mobile_model and res_model:
        st.sidebar.success("All models loaded successfully.")
    else:
        st.sidebar.warning("Models not fully loaded.")

    # File Upload
    uploaded_file = st.file_uploader("Upload Chest X-ray Image...", type=["jpg", "png", "jpeg"])

    if uploaded_file:
        image = Image.open(uploaded_file).convert('RGB')
        col_img, col_res = st.columns([1, 1])
        
        with col_img:
            st.image(image, caption="Uploaded X-ray", use_column_width=True)
        
<<<<<<< HEAD
        if st.button("🚀 Run Triple-Model Analysis"):
=======
        if st.button(" Run Triple-Model Analysis"):
>>>>>>> master
            if not (cnn_model and mobile_model and res_model):
                st.error("Cannot run analysis. Please check model paths.")
                return

            with st.spinner("Processing image through ensemble..."):
                # 1. Individual Predictions
                s1 = cnn_model.predict(preprocess_image(image, "custom"))[0][0]
                s2 = mobile_model.predict(preprocess_image(image, "mobilenet"))[0][0]
                s3 = res_model.predict(preprocess_image(image, "resnet"))[0][0]
                
                results_map = {"Custom CNN": s1, "MobileNetV2": s2, "ResNet50": s3}
                avg_score = (s1 + s2 + s3) / 3
                verdict = "TB POSITIVE" if avg_score > 0.5 else "NORMAL/NEGATIVE"

                # 2. Display results
                with col_res:
                    st.subheader("Diagnostic Results")
                    for name, score in results_map.items():
                        st.write(f"**{name}:** {score*100:.1f}% Positive Probability")
                    
                    st.divider()
                    if avg_score > 0.5:
                        st.error(f"### FINAL VERDICT: {verdict}")
                    else:
                        st.success(f"### FINAL VERDICT: {verdict}")

                    # 3. PDF Download
                    pdf_bytes = create_pdf(results_map, verdict)
                    st.download_button(
                        label="📥 Download PDF Report",
                        data=pdf_bytes,
                        file_name="tb_diagnosis_report.pdf",
                        mime="application/pdf"
                    )

if __name__ == "__main__":
    main()
