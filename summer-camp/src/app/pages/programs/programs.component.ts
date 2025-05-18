import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProgramItemsComponent } from './program-items/program-items.component';

export interface Programs{
  id: number;
  name: string;
  date: string;
  place: string;
}

@Component({
  selector: 'app-programs',
  imports: [CommonModule,MatCardModule,MatButtonModule,ProgramItemsComponent],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
  standalone: true
})
export class ProgramsComponent {

  @Output()selectedPage: EventEmitter<string>=new EventEmitter();
  constructor(private router:Router){
    console.log("construtor called");
  }
  programs:Programs[]=[
    {
      id: 1,
      name: '🏕️ Tábori játékok',
      date:'10:00 - 12:00',
      place:'Sportpálya'
    },
    {
      id: 2,
      name: '🎨 Kézműves foglalkozás',
      date:'13:00 - 14:30',
      place:'Kézműves sátor'
    },
    {
      id: 3,
      name: '🔥 Tábortűz és éneklés',
      date:'20:00 - 21:30',
      place:'Tűzrakóhely'
    },
    {
      id: 4,
      name: '🎭 Színházi előadás',
      date:'16:00 - 17:00',
      place:'Előadósátor'
    },
    {
      id: 5,
      name: '🚴‍♀️ Kincskereső túra',
      date:'14:00 - 15:30',
      place:'Erdei ösvény'
    },
    {
      id: 6,
      name: '🎬 Moziest',
      date:'21:30 - 23:00',
      place:'Vetítővászon a réten'
    }
  ];

  trackById(index: number, item: Programs): number {
    return item.id;
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  /*menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }*/

  changePage() {
    this.router.navigateByUrl("/reg");
  }
  handleProgramClick(program: Programs) {
    console.log('Program clicked:', program);
  }


}