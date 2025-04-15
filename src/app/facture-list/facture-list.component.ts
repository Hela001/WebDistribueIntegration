import { Component , OnInit } from '@angular/core';
import { Facture, StatutFacture } from '../models/facture';
import { FactureService } from '../services/facture.service';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  factures: Facture[] = [];
  searchTerm: string = '';
 loading: boolean = false;
  error: string | null = null;
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;
  selectedStatus: StatutFacture | null = null;  // Modifiez le type pour accepter null
  statusList: (StatutFacture | null)[] = [null, StatutFacture.NON_PAYEE, StatutFacture.PAYEE];
    

  constructor(private factureService: FactureService) { }

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures(): void {
    this.loading = true;
    this.factureService.getAll(this.page, this.size).subscribe(
      (data: Page<Facture>) => {
        this.factures = data.content;
        this.totalPages = data.totalPages;
        this.loading = false;
      },
    
    );
  }
  
  searchByNumero(): void {
    if (this.searchTerm) {
      this.factureService.searchByNumero(this.searchTerm).subscribe({
        next: (data) => {
          this.factures = data;
        },
        error: (e) => console.error(e)
      });
    } else {
      this.loadFactures();
    }
  }

  deleteFacture(id?: number): void {
    if (!id) return;
    
    if(confirm('Êtes-vous sûr de vouloir supprimer cette facture?')) {
      this.factureService.deleteFacture(id).subscribe({
        next: () => {
          this.factures = this.factures.filter(f => f.id_facture === id);
        },
        error: (e) => console.error(e)
      });
    }
  }
  downloadPdf(id_facture?: number): void {
    if (!id_facture) return;
    
    this.factureService.getPdf(id_facture).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `facture_${id_facture}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadFactures();
    }
  }

}