import { useStore } from '../store';

const dictionary: any = {
  "welcome to the ''meet the peer'' tool!": "Bienvenu dans l'outil ''Rencontre tes pairs''",
  'the tool that will help you make a more personal introduction to the team':
    "l'outil qui t'aidera à te présenter à l'équipe de façon plus personnelle",
  English: 'Français',
  'and what’s your name?': 'et quel est ton nom?',
  'type your e-mail': 'tapez votre e-mail',
  'e-mail format is invalid!': "le format de l'e-mail n'est pas valide !",
  Next: 'Suivant',
  'You have no access to service, please contact your curator':
    "Vous n'avez pas accès au service, veuillez contacter votre curateur",
  'first name': 'prénom',
  'last name': 'nom',
  'job title': 'ta fonction',
  'please type your first name': "s'il vous plaît tapez votre prénom",
  'please type your last name': "s'il vous plaît tapez votre nom",
  'please type your job title': "s'il vous plaît tapez votre fonction",
};

const useLang = () => {
  const lang = useStore(state => state.lang);
  const setLang = useStore(state => state.setLang);

  const toggleLang = () => {
    if (lang === 'en') setLang('fr');
    else setLang('en');
  };

  const tr = (text: string) => {
    if (lang == 'en') {
      return text;
    } else {
      return dictionary[text];
    }
  };

  return { toggleLang, tr };
};

export default useLang;
