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
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
        correctOrientation: false,
        webUseInput: true,
      });
      setPhoto(photo);
    } catch {
      console.log("Usuario cerro el dialogo");
    }
  };
  /* const fileName = new Date().getTime() + ".jpeg";
  Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) }); */

  return {
    photo,
    takePhoto,
  };
}
