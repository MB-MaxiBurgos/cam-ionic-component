import { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import "./Tab2.css";
import { isPlatform } from "@ionic/react";
import { usePhoto } from "../hooks/usePhotoGallery";
import { camera } from "ionicons/icons";

const Tab2: React.FC = () => {
  const { photo, takePhoto } = usePhoto();

  function showPhoto(): string {
    // If running on the web...
    if (!isPlatform("hybrid")) {
      // Web platform only: Load the photo as base64 data
      return `data:image/jpeg;base64,${photo?.base64String}`;
    } else {
      return `${photo?.base64String}`;
    }
  }

  async function changeToBlob(base64Data: any) {
    //const base64 = await fetch(base64Data);
    const base64Response = await fetch(`data:image/jpeg;base64,${base64Data}`);
    return await base64Response.blob();
  }

  const convertBlobToBase64: any = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    //console.log(photo);
    //esto es para el back
    photo &&
      (async () => {
        await changeToBlob(photo?.base64String).then((res) => {
          convertBlobToBase64(res).then((res: any) => console.log(res));
        });
      })();
  }, [photo]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard mode={isPlatform("hybrid") ? "md" : undefined}>
          <IonCardContent>
            {photo ? (
              <IonImg
                src={photo && `data:image/jpeg;base64,${photo?.base64String}`}
              />
            ) : (
              "aca se va a mostrar la foto de la firma"
            )}
          </IonCardContent>
        </IonCard>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
