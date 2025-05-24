import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
