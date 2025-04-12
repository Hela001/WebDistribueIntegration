export interface Commande {
    id: number | null; // L'ID peut être nul lors de la création d'une nouvelle commande
    statut: 'Preparation' | 'EnCours' | 'Livré';
    dateCommande: string;
    total: number;
    remise: number;
    dateLivraisonEstimee: string;
    notes: string;
 

}