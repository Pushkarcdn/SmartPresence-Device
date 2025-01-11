import base64
import uuid
import os
import face_recognition  # For face detection
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

REGISTERED_DIR = "registered_faces"

if not os.path.exists(REGISTERED_DIR):
    os.makedirs(REGISTERED_DIR)


def get_registered_faces():
    """Load all registered faces and their encodings."""
    face_encodings = []
    face_ids = []

    for file_name in os.listdir(REGISTERED_DIR):
        if file_name.endswith(".jpg") or file_name.endswith(".png"):
            image_path = os.path.join(REGISTERED_DIR, file_name)
            image = face_recognition.load_image_file(image_path)
            encoding = face_recognition.face_encodings(image)

            if encoding:  # Ensure at least one face encoding exists
                face_encodings.append(encoding[0])
                face_ids.append(file_name.split(".")[0])  # Use the file name as the ID

    return face_encodings, face_ids


@app.route("/register-face", methods=["POST"])
def register_face():
    data = request.get_json()
    name = data.get("name")
    image_data = data.get("image")

    if not name or not image_data:
        return jsonify({"error": "All fields along with the image are required!"}), 422

    # Decode Base64 image
    try:
        image_data = image_data.split(",")[1]
        image_bytes = base64.b64decode(image_data)
    except Exception as e:
        return jsonify({"error": "Invalid image format"}), 422

    # Load image for face detection
    try:
        with open("temp_image.jpg", "wb") as f:
            f.write(image_bytes)
        image = face_recognition.load_image_file("temp_image.jpg")
        face_locations = face_recognition.face_locations(image)
    except Exception as e:
        return jsonify({"error": "Error processing the image"}), 500
    finally:
        if os.path.exists("temp_image.jpg"):
            os.remove("temp_image.jpg")

    # Check the number of faces detected
    if len(face_locations) == 0:
        return jsonify({"error": "No face detected. Please try again."}), 422
    elif len(face_locations) > 1:
        return (
            jsonify(
                {
                    "error": "Multiple faces detected. Please ensure only one face is in the frame."
                }
            ),
            422,
        )

    # Save the valid image
    unique_id = str(uuid.uuid4())
    image_path = os.path.join(REGISTERED_DIR, f"{unique_id}.jpg")

    with open(image_path, "wb") as f:
        f.write(image_bytes)

    return (
        jsonify({"message": "Face registered successfully", "unique_id": unique_id}),
        201,
    )


@app.route("/identify-face", methods=["POST"])
def identify_face():
    """Identify if the given face matches any registered face."""
    data = request.get_json()
    image_data = data.get("image")

    if not image_data:
        return jsonify({"error": "Image data is required"}), 400

    # Decode Base64 image
    try:
        image_data = image_data.split(",")[1]
        image_bytes = base64.b64decode(image_data)
    except Exception:
        return jsonify({"error": "Invalid image format"}), 400

    # Load and encode the incoming face
    try:
        with open("temp_image.jpg", "wb") as f:
            f.write(image_bytes)
        image = face_recognition.load_image_file("temp_image.jpg")
        face_encodings = face_recognition.face_encodings(image)
    except Exception:
        return jsonify({"error": "Error processing the image"}), 500
    finally:
        if os.path.exists("temp_image.jpg"):
            os.remove("temp_image.jpg")

    if len(face_encodings) != 1:
        return jsonify({"error": "Ensure exactly one face is in the frame"}), 400

    # Compare against registered faces
    registered_encodings, registered_ids = get_registered_faces()
    matches = face_recognition.compare_faces(registered_encodings, face_encodings[0])

    if True in matches:
        match_index = matches.index(True)
        return (
            jsonify(
                {"message": "Face recognized", "unique_id": registered_ids[match_index]}
            ),
            200,
        )
    else:
        return jsonify({"error": "Face not recognized"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
