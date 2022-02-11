import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {

  id: number = 25
  serverStatus: string = ""

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline'
  }

  getServerStatus():string {
    return this.serverStatus
  }

  getColor():string {
    return this.serverStatus === 'online' ? 'green' : 'red'
  }
}
