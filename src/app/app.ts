import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppToolbar } from './shared/layout/app-toolbar/app-toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Party-Management-System';
}
