# prepare_known_faces.py
import os
import face_recognition
import pickle

IMAGE_DIR = 'registered_faces'
ENCODINGS_FILE = 'known_faces_encodings.pkl'

def prepare_encodings():
    known_encodings = []
    known_ids = []

    for filename in os.listdir(IMAGE_DIR):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            unique_id = os.path.splitext(filename)[0]
            img_path = os.path.join(IMAGE_DIR, filename)
            image = face_recognition.load_image_file(img_path)
            encodings = face_recognition.face_encodings(image)

            if len(encodings) > 0:
                known_encodings.append(encodings[0])
                known_ids.append(unique_id)
                print(f"Encoded face for ID: {unique_id}")
            else:
                print(f"No face found in image: {filename}")

    with open(ENCODINGS_FILE, 'wb') as f:
        pickle.dump({'encodings': known_encodings, 'ids': known_ids}, f)
    print(f"Saved encodings to {ENCODINGS_FILE}")

if __name__ == "__main__":
    prepare_encodings()
