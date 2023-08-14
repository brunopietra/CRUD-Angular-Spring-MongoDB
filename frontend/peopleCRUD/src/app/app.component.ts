import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { PeopleService } from './services/people.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['image', 'firstName', 'lastName', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private peopleService: PeopleService) {}
  ngOnInit(): void {
    this.getPeopleList();
  }

  openPersonAddEdit(){
    const personAddEdit = this.dialog.open(PersonAddEditComponent);
    personAddEdit.afterClosed().subscribe({
      next: (val) => {
        this.getPeopleList();
      }
    })
  }

  getPeopleList(){
    this.peopleService.getPeopleList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res._embedded.people);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editPerson(data: any) {
    const personAddEdit = this.dialog.open(PersonAddEditComponent, {
      data: data
    });

    personAddEdit.afterClosed().subscribe({
      next: (val) => {
        this.getPeopleList();
      }
    });
  }

  deletePerson(id: String){
    this.peopleService.deletePerson(id).subscribe({
      next: (res)=> {
        this.getPeopleList();
      },
      error: console.log,
    })
  }
}
