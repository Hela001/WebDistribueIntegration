export enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  SUSPENDED = 'SUSPENDED',
}

export interface Projet {
  idProjet: number;
  nom: string;
  description: string;
  status: Status;  // Enum pour le status, les valeurs sont maintenant des chaînes
  dateDebut: string;  // Format "yyyy-MM-dd"
  dateFinPrevue: string;  // Format "yyyy-MM-dd"
  dateFinReelle: string;  // Format "yyyy-MM-dd"
  budgetInitial: number;  // Remplacement de BigDecimal par number
  budgetReel: number;     // Remplacement de BigDecimal par number
  adresse: string;
  latitude: number;
  longitude: number;
  permisConstruction: boolean;
}
