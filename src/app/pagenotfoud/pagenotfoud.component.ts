import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material-module/material-module.module';

@Component({
  selector: 'app-pagenotfoud',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './pagenotfoud.component.html',
  styleUrl: './pagenotfoud.component.css'
})
export class PagenotfoudComponent {

constructor(private route:Router){}

  iraloggin(){
    this.route.navigateByUrl("/login")
  }
}
