import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  allowNewServer: boolean = true
  serverCreationStatus: string = "Server not created"
  serverName: string = ""
  serverCreated: boolean = false
  servers: string[] = []

  constructor() {
    setTimeout(() => { this.allowNewServer = false }, 2000)
  }

  onCreateServer():void {
    this.serverCreated = true
    this.servers.push(this.serverName)
    this.serverCreationStatus = "Server was created : Name is " + this.serverName
  }

}
