import { useStore } from "../store";

const dictionary: any = {
  "welcome to the ''meet your peer'' tool!":
    "Bienvenu dans l'outil ''Rencontre tes pairs''",
  "the tool that will help you make a more personal introduction to the team":
    "l'outil qui t'aidera à te présenter à l'équipe de façon plus personnelle",
  English: "Français",
  "and what’s your name?": "et quel est ton nom?",
  "type your e-mail": "tapez votre e-mail",
  "type your password": "tapez votre mot de passe",
  "e-mail format is invalid!": "le format de l'e-mail n'est pas valide !",
  Next: "Suivant",
  Back: "Retour",
  "You have no access to service, please contact your curator":
    "Vous n'avez pas accès au service, veuillez contacter votre curateur",
  "first name": "prénom",
  "last name": "nom",
  "job title": "ta fonction",
  "please type your first name": "s'il vous plaît tapez votre prénom",
  "please type your last name": "s'il vous plaît tapez votre nom",
  "please type your job title": "s'il vous plaît tapez votre fonction",
  "Introduce yourself": "Présentation",
  "How it works": "Comment ça fonctionne",
  "Select questions": "Sélectionner des questions",
  "Upload and edit": "Téléchargement et éditer",
  Ready: "Prêt",
  "We felt a little disconnected while working remotely and found it hard to meet new people through emails.":
    "Avec le travail à distance, nous trouvons difficile de rencontrer nos nouveaux collègues par courriels.",
  "This tool is designed to improve comfort and enhance collaboration among all team members. Wherever you are.":
    "Cet outil est conçu pour.",
  "step 1 - select questions": "Étape 1 - Sélectionne les questions",
  "You will have around 15-30 seconds to answer them.":
    "Tu auras entre 15 à 30 secondes pour y réponde",
  "step 2 - pick your method": "Étape 2 - Choisis la méthode que tu préfères",
  "We have two options - record a video with a webcam or upload it. If you select to upload it, you can use your phone to record it.":
    "Nous avons deux options - enregistrer une vidéo avec une webcam ou la télécharger. Si vous choisissez de le télécharger, vous pouvez utiliser votre téléphone pour l'enregistrer.",
  "step 3 - select the mood": "Étape 3 - Choisis ton ambiance",
  "Last step is to select the music. Find one that can desribe your character, whether you are active or calm, rocky or jazzy.":
    "La dernière étape consiste à choisir une musique. Trouve celle qui te décrit le mieux, que tu sois dynamique ou calme, rock ou jazzy.",
  "watch an example that we’ve made":
    "Visionnement d'une vidéo produite à titre d'exemple",
  "to answer them, we recommend about 10-20 sec per question.":
    "pour y répondre, nous recommandons environ 10 à 20 secondes par question.",
  "upload video": "télécharger une vidéo",
  "upload another video": "télécharger une autre vidéo",
  "record with a web camera": "enregistrer avec une camera web",
  "record another video with a web camera":
    "enregistrer une autre vidéo avec une camera web",
  ".mp4 of .mov format, less than 10 mb": "format mp4 ou mov, moins de 10 mb",
  "Select the mood": "Choisis ton ambiance",
  "this music will be in the background of your video":
    "cette musique sera le fond sonore de ta vidéo",
  "select the mood": "Choisis ton ambiance",
  "video length is too big, please upload video less then 30s.":
    "la longueur de la vidéo est trop grande, veuillez télécharger la vidéo moins de 30s.",
};

const useLang = () => {
  const lang = useStore((state) => state.lang);
  const setLang = useStore((state) => state.setLang);

  const toggleLang = () => {
    if (lang === "en") setLang("fr");
    else setLang("en");
  };

  const tr = (text: string) => {
    if (lang == "en") {
      return text;
    } else {
      return dictionary[text];
    }
  };

  return { toggleLang, tr, lang };
};

export default useLang;
