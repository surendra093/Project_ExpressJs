import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SharedService} from '../shared.service';
import  { Comp2Component } from '../comp2/comp2.component';
import {Opening} from '../shared/opening.model';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css'],
  providers: [SharedService]
})

export class Comp1Component implements OnInit {

      openings: Opening[];
      opening : Opening;

      jobtitle        : string;
      location        : string;
      EmployementType : string;
      Eligibility     : string;
      Work            : string;
      Note            : string;
      skills          : Array<string>; 

      

    constructor(public service: SharedService,
      private dialog: MatDialog) {

    }
    
    onCreate() {
      
      this.service.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "100%";
      this.dialog.open(Comp2Component);
  }
      
  deleteOpening(id:any){
     
    var openings = this.openings;
     this.service.deleteOpening(id)
        .subscribe(data => {
              if(data.n == 1)
              {
                for(var i=0;i<openings.length;i++)
                {
                  if(openings[i]._id == id)
                  {
                    openings.splice(i,1);
                  }
                }
              }
        })
    }

    updateOpening(opening:any){
          this.service.selectedOpening = opening;
    }
  
      ngOnInit(): void {
      
        this.service.getOpenings()
            .subscribe((openings:any) => 
                this.openings = openings)
    }
    
}
