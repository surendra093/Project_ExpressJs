import {FormGroup, FormControl,Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {Opening} from './shared/opening.model';
import { Injectable } from '@angular/core';
//import { BehaviorSubject,Observable } from 'rxjs';

@Injectable()
export class SharedService {
  
  selectedOpening : Opening;  // (to be verified)
  openings : Opening[];

  constructor(private http: HttpClient){ }
  

  getOpenings(){
      return this.http.get("http://localhost:3000/openings/")
            // .pipe(map((res: any) => res.json()));

  }

  addOpening(newOpening:any){
        
      var headers = new HttpHeaders();
      headers.append('content-type','application/json');
      return this.http.post("http://localhost:3000/openings",newOpening,{headers:headers})
              // .pipe(map((res: any) => res.json()));        
  }
 
  deleteOpening(id:any){

       return this.http.delete('http://localhost:3000/openings/'+id)
            .pipe(map((res: any) => res.json()));
  }
 
  












  form: FormGroup = new FormGroup({
        //$key: new FormControl(null),
        JobTitle: new FormControl(''),
        Location: new FormControl(0),
        EmployementType: new FormControl(0),
        Eligibility: new FormControl(''),
        Work: new FormControl(''),
        Note: new FormControl(''),
        Skills: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      //$key: null,
      JobTitle: '',
      Location: 0,
      EmployementType:0,
      Eligibility: '',
      Work: '',
      Note: '',
      Skills: ''
    });
  }

}
