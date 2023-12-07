import { useState } from "react";
import { storage } from "../firebase";
import { useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import ImageResizer from "react-image-file-resizer";

function EditProfilePage({ currentUser }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;
    var src = URL.createObjectURL(file);

    setSelected(src);
  };

  const handleToggle = async (url) => {
    try {
      console.log(url);
      const response = await axios.put(
        `http://localhost:8080/api/users/${currentUser.id}`,
        {
          avatar_url: url,
        }
      );
      if (response.status === 200) {
        console.log("success");
        navigate(`/users/${currentUser.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (imgUrl) {
      handleToggle(imgUrl);
    }
  }, [imgUrl]);

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      ImageResizer.imageFileResizer(
        file,
        400,
        undefined,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const file = e.target[0]?.files[0];

    if (!file) return;
    const resizedImage = await resizeImage(file);

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, resizedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          console.log(imgUrl);
        });
      }
    );
  };

  return (
    <section className="signup-page">
      <form onSubmit={handleSubmit} className="signup">
        <h1 className="signup__title">Edit profile</h1>
        <p className="signup__prompt">
          Please upload a profile picture to complete your profile set-up.
        </p>
        <Input
          type="file"
          onChange={handleChange}
          name="avatar_url"
          label="Upload Profile Photo"
          accept="image/*"
          alt="alt"
        />
        {selected && (
          <div className="signup__image-wrapper">
            <img src={selected} alt="uploaded file" className="signup__image" />
          </div>
        )}
        {submitted && !imgUrl && (
          <div className="signup__outerbar">
            <div
              className="signup__innerbar"
              style={{ width: `${progresspercent}%` }}
            ></div>
          </div>
        )}
        <button className="signup__button" type="submit">
          Upload
        </button>
      </form>
    </section>
  );
}

export default EditProfilePage;
