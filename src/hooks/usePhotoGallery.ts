import { useState, useEffect } from "react";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

export function usePhoto() {
  const [photo, setPhoto] = useState<Photo>();

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      presentationStyle: "fullscreen",
    });
    setPhoto(photo);
  };

  return {
    photo,
    takePhoto,
  };
}
