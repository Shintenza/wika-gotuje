export const Filters = {
  category: {
    displayName: 'Rodzaj przepisu',
    options: [
      'Śniadanie',
      'Danie główne',
      'Deser',
      'Kolacja',
      'Przekąski',
      'Sałatki',
      'Zupy',
    ],
  },
  availability: {
    displayName: 'Dostępność składników',
    options: ['Łatwa', 'Średnia', 'Trudna'],
  },
  diet: {
    displayName: 'Rodzaj diety',
    options: ['Wegetariańska', 'Wegańska', 'Niskokaloryczna', 'Bezglutenowa'],
  },
  region: {
    displayName: 'Region pochodzenia',
    options: [
      'Ameryka Południowa',
      'Ameryka Północna',
      'Azja',
      'Afryka',
      'Australia',
      'Europa',
    ],
  },
  difficulty: {
    displayName: 'Poziom zaawansowania',
    options: ['Łatwy', 'Średniozaawansowany', 'Trudny'],
  },
  prep_time: {
    displayName: 'Czas przygotowania',
    min: 0,
    max: 1440,
  },
};
