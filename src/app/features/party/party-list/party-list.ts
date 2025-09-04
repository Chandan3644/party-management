import { Component, ViewChild } from '@angular/core';
import { Data } from '../models/data.model';
import { Party } from '../party';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material-module';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Snack } from '../../../core/notify/snack';


@Component({
  selector: 'app-party-list',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './party-list.html',
  styleUrls: ['./party-list.css']
})
export class PartyList {
  parties: Data[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'company_name',
    'mobile_no',
    'email',
    'gstin',
    'actions'
  ];
  dataSource = new MatTableDataSource<Data>();
  loading = false;
  isLoggedIn = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private party: Party,
    private router: Router,
    private snack: Snack
  ) { }

  ngOnInit(): void {
    this.fetchParties();
  }

  fetchParties(): void {
    this.loading = true;
    this.party.getAll().subscribe({
      next: (data) => {
        this.parties = data;
        this.dataSource = new MatTableDataSource<Data>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => {
        this.snack.err('Failed to load parties');
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd(): void {
    this.router.navigate(['/parties/new']);
  }

  onEdit(party: Data): void {
    this.snack.ok(`Editing ${party.name}`);
    this.router.navigate(['/parties', party.id, 'edit']);
  }


  onView(party: Data): void {
    this.snack.warn(`Viewing ${party.name}`);
    this.router.navigate(['/parties', party.id, 'view']);
  }

  onDelete(party: Data): void {
    if (confirm(`Are you sure you want to delete "${party.name}"?`)) {
      this.party.delete(party.id!).subscribe({
        next: () => {
          this.snack.ok('Party deleted successfully');
          this.fetchParties();
        },
        error: () => {
          this.snack.err('Failed to delete party');
        }
      });
    }
  }
}
