import { Component, Input } from '@angular/core';
import { Programs } from '../programs.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-program-items',
  imports: [MatCardModule, CommonModule],
  templateUrl: './program-items.component.html',
  styleUrl: './program-items.component.scss'
})
export class ProgramItemsComponent {
  track = 0;
  @Input() program!: Programs;
}
