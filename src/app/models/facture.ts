export enum StatutFacture {
  PAYEE ='PAYEE',
  NON_PAYEE = 'NON_PAYEE',
}
export enum ModePayement {
  CARTE_BANCAIRE ='CARTE_BANCAIRE',
  VIREMENT = 'VIREMENT',
  CHEQUE = 'CHEQUE',
  PAYPAL = 'PAYPAL',
  ESPECE = 'ESPECE',
}
export interface Facture {
    id_facture: number;
    numero_facture: string;
    date_facture: Date;
    statut: StatutFacture;
    montant_total: number;
    mode_payement: ModePayement;
  }