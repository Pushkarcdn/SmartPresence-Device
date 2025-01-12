import cv2
import face_recognition
import pickle
import requests
import time
import logging

# Configuration
MAKE_PRESENT_API = 'http://yourserver.com/make-present'  # Replace with your API URL
ENCODINGS_FILE = 'known_faces_encodings.pkl'
TOLERANCE = 0.6  # Adjust based on accuracy needs
FRAME_THICKNESS = 3
FONT_THICKNESS = 2
MODEL = 'hog'  # or 'cnn' for GPU acceleration if available

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def load_known_faces():
    try:
        with open(ENCODINGS_FILE, 'rb') as f:
            data = pickle.load(f)
        logging.info(f"Loaded {len(data['encodings'])} known face encodings.")
        return data['encodings'], data['ids']
    except FileNotFoundError:
        logging.error(f"Encoding file {ENCODINGS_FILE} not found. Please provide a valid file.")
        exit(1)
    except Exception as e:
        logging.error(f"Error loading known faces: {e}")
        exit(1)


def mark_present(unique_id):
    try:
        logging.info(f"Marking present: {unique_id}")
        # Uncomment this when API is ready
        # response = requests.post(MAKE_PRESENT_API, json={'unique_id': unique_id})
        # if response.status_code == 200:
        #     logging.info(f"Successfully marked present for ID: {unique_id}")
        # else:
        #     logging.error(f"Failed to mark present for ID {unique_id}: {response.text}")
    except Exception as e:
        logging.error(f"Error sending data to API: {e}")


def attendance_tracking():
    known_encodings, known_ids = load_known_faces()

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        logging.error("Could not open the camera. Ensure it is connected and accessible.")
        exit(1)

    process_every_n_frames = 2
    frame_count = 0
    already_present = set()

    while True:
        ret, frame = cap.read()
        if not ret:
            logging.error("Failed to grab frame from the camera.")
            break

        # Resize frame for faster processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]

        face_locations = []
        face_encodings = []
        face_ids = []

        if frame_count % process_every_n_frames == 0:
            face_locations = face_recognition.face_locations(rgb_small_frame, model=MODEL)
            logging.info(f"Detected face locations: {face_locations}")

            if face_locations:
                face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
                logging.info(f"Encoded {len(face_encodings)} faces.")

                for face_encoding in face_encodings:
                    matches = face_recognition.compare_faces(known_encodings, face_encoding, TOLERANCE)
                    face_distances = face_recognition.face_distance(known_encodings, face_encoding)
                    best_match_index = face_distances.argmin() if face_distances.size > 0 else None

                    if best_match_index is not None and matches[best_match_index]:
                        unique_id = known_ids[best_match_index]
                        face_ids.append(unique_id)
                        if unique_id not in already_present:
                            mark_present(unique_id)
                            already_present.add(unique_id)
                    else:
                        face_ids.append(None)
            else:
                logging.info("No faces detected in the current frame.")

        frame_count += 1

        # Display the results
        for (top, right, bottom, left), unique_id in zip(face_locations, face_ids):
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            if unique_id:
                color = (0, 255, 0)  # Green for recognized
                label = f"ID: {unique_id}"
            else:
                color = (0, 0, 255)  # Red for unrecognized
                label = "Unknown"

            cv2.rectangle(frame, (left, top), (right, bottom), color, FRAME_THICKNESS)
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), color, cv2.FILLED)
            cv2.putText(frame, label, (left + 6, bottom - 6), cv2.FONT_HERSHEY_DUPLEX, 1.0, (255, 255, 255), FONT_THICKNESS)

        cv2.imshow('Attendance Tracker', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            logging.info("Exiting attendance tracker.")
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    attendance_tracking()
