import { Component } from "@angular/core"
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router"


@Component({
  selector: 'app-rootClientes',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(private router:Router,
    private route:ActivatedRoute
  ){}

}
