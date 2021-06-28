import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Opening} from '../shared/opening.model';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css'],
  providers: [SharedService]
})

export class Comp2Component implements OnInit {
  
  openingForm = new FormGroup({
    title: new FormControl(''),
    loc : new FormControl(0),
    Etype: new FormControl(0),
    eligibility: new FormControl(''),
    work: new FormControl(''),
    note: new FormControl(''),
    skills: new FormControl([])
  });



  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  selectedSkills: string[] = [];
  allFruits: string[] = ['JavaScript', 'NodeJs', 'AngularJs', 'MEAN Stack', 'Data Structures'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public service: SharedService,
   public dialogRef: MatDialogRef<Comp2Component>) { 
  
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  eligibility = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  loc =  new FormControl('', [Validators.required]);
  Etype = new FormControl('',[Validators.required])

  Locations=[
        {id: 1, value: 'Mumbai'},
        {id: 2, value: 'Pune'},
        {id: 3, value: 'Bangalure'}
  ];

  EmpTypes=[
    {id: 1, value: 'Full Time'},
    {id: 2, value: 'Part Time'},
    {id: 3, value: 'Trainee'}
  ];

     
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onReset() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }


  ngOnInit(): void {
  }
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.selectedSkills.push(value);
      }

      // Clear the input value
      event.chipInput!.clear();

      this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
      const index = this.selectedSkills.indexOf(fruit);

      if (index >= 0) {
        this.selectedSkills.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.selectedSkills.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }
    
    openings: Opening[] = [];
    opening : Opening;
    
    jobtitle        : string;
    location        : string;
    EmployementType : string;
    Eligibility     : string;
    Work            : string;
    Note            : string;
    skills          : Array<string>;
    

    addOpening(){
      
        const newOpening = {
          jobtitle        : this.jobtitle,
          location        : this.Locations[parseInt(this.location)-1].value,
          EmployementType : this.EmpTypes[parseInt(this.EmployementType)-1].value,
          Eligibility     : this.Eligibility,
          Work            : this.Work,
          Note            : this.Note,
          skills          : this.selectedSkills
      } 
       
       //console.log(this.selectedSkills);
        this.service.addOpening(newOpening)
            .subscribe((opening:any) => {
                this.openings.push(opening);
            });
        //console.log(this.openingForm.value);
        
        this.service.getOpenings()
           .subscribe((openings:any) => 
                   this.openings = openings)

    }

}


