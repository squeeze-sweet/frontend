import useLang from '../hooks/useLang';

const useRouter = () => {
  const { tr } = useLang();
  const routes = [
    {
      path: 'introduce-yourself',
      name: tr('Introduce yourself'),
    },
    {
      path: 'how-it-works',
      name: tr('How it works'),
    },
    {
      path: 'select-questions',
      name: tr('Select questions'),
    },

    {
      path: 'upload-and-edit',
      name: tr('Upload and edit'),
    },
    {
      path: 'add-music',
      name: tr('Select the mood'),
    },
    {
      path: 'ready',
      name: tr('Ready'),
    },
  ];

  return { routes };
};

export default useRouter;
