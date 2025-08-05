import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        about: string;
        experience: string;
        projects: string;
        contact: string;
        greeting: string;
        role: string;
        description: string;
        contactMe: string;
        viewProjects: string;
        aboutMe: string;
        aboutText1: string;
        aboutText2: string;
        skills: string;
      };
    };
  }
} 