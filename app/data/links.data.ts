export type ProfileType = {
  img: string;
  title: string;
  username: string;
  link: string;
};

export type ProfileDataType = {
  [key: string]: ProfileType;
};

export const PROFILE_DATA: ProfileDataType = {
  github: {
    img: '/icons/github.png',
    title: 'GitHub',
    username: 'ahampriyanshu',
    link: 'https://github.com/ahampriyanshu',
  },
  linkedin: {
    img: '/icons/linkedin.png',
    title: 'LinkedIn',
    username: 'ahampriyanshu',
    link: 'https://www.linkedin.com/in/ahampriyanshu',
  },
  kosh: {
    img: '/icons/kosh.svg',
    title: 'Kosh',
    username: 'market briefs',
    link: 'https://kosh.ahampriyanshu.com',
  },
  supertrips: {
    img: '/icons/supertrips.svg',
    title: 'SuperTrips',
    username: 'curated routes',
    link: 'https://supertrips.ahampriyanshu.com',
  },
  kaggle: {
    img: '/icons/kaggle.png',
    title: 'Kaggle',
    username: 'ahampriyanshu',
    link: 'https://www.kaggle.com/ahampriyanshu',
  },
};

export const HEADER = {
  SUPPORT: 'https://github.com/ahampriyanshu/zmail',
  APPS: 'https://gist.github.com/ahampriyanshu/7c38b9370b8c1baf009f868ac775134e',
  SETUP: 'https://github.com/ahampriyanshu/zmail#setup',
  ACCOUNT: 'https://ahampriyanshu.com',
  FEEDBACK_FORM: 'https://qke8euxur5q.typeform.com/to/wMrmQrsQ',
  UPDATE_HISTORY: 'https://github.com/ahampriyanshu/zmail/commits/main',
  WORKSPACE: 'https://links.ahampriyanshu.com',
};

export const MAIL_DATA = {
  NAME: 'Priyanshu',
  EMAIL: 'avampriyanshu@gmail.com',
  SUBJECT: 'Hi Priyanshu',
  BODY: 'Hello, hope you are doing well.',
};
