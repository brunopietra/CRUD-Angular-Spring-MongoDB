import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeopleService } from '../services/people.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit{
  personForm: FormGroup;


  constructor(private fb: FormBuilder,
    private peopleService: PeopleService,
    private dialogRef: DialogRef<PersonAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.personForm = this.fb.group({
      firstName: '',
      lastName: '',
      image: ''
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    if (this.data) {
      this.personForm.patchValue(this.data);
    }
  }

  onFormSubmit(){
    if(this.personForm.valid){
      if(this.data){
        console.log("Data:", this.data);
        console.log("ID:", this.data._links.person.href.split('/').pop());
        this.peopleService.editPerson(this.personForm.value,this.data._links.person.href.split('/').pop()).subscribe({
          next: (val: any) => {
            this.dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.peopleService.addPerson(this.personForm.value).subscribe({
          next: (val: any) => {
            alert('Person added succssfully');
            this.dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
