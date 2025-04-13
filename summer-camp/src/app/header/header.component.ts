import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
//RouterLinkActive

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit,AfterViewInit{
  @Output()selectedPage: EventEmitter<string>=new EventEmitter();
  constructor(){
    console.log("construtor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }
}
