import cv2
import face_recognition
import os
import uuid
import requests

# Configuration
REGISTER_FACE_API = "http://yourserver.com/register-face"  # Replace with your API URL
IMAGE_DIR = "registered_faces"

# Create directory if not exists
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)


def capture_face():
    cap = cv2.VideoCapture(0)
    print("Press 'c' to capture a face or 'q' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame.")
            break
        cv2.imshow("Capture Face", frame)
        key = cv2.waitKey(1)

        if key & 0xFF == ord("c"):
            # Convert the image from BGR color (which OpenCV uses) to RGB color
            rgb_frame = frame[:, :, ::-1]
            face_locations = face_recognition.face_locations(rgb_frame)

            if len(face_locations) != 1:
                print("Please ensure exactly one face is in the frame.")
                continue

            while True:
                # Ask for the person's name
                name = input("Enter the person's name: ").strip()
                if len(name) < 3:
                    print("Please enter a valid name.")
                    continue
                break

            unique_id = str(uuid.uuid4())

            img_path = os.path.join(IMAGE_DIR, f"{unique_id}.jpg")
            cv2.imwrite(img_path, frame)
            print(f"Captured face and saved to {img_path}")

            # Send to /register-face API
            with open(img_path, "rb") as img_file:
                files = {"image": img_file}
                data = {"unique_id": unique_id, "name": name}
                try:
                    response = requests.post(REGISTER_FACE_API, files=files, data=data)
                    if response.status_code == 200:
                        print(
                            f"Successfully registered face with ID: {unique_id} and Name: {name}"
                        )
                    else:
                        print(f"Failed to register face: {response.text}")
                except Exception as e:
                    print(f"Error sending data to API: {e}")

        elif key & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    capture_face()
