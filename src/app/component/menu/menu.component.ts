import { Component, OnInit } from '@angular/core';
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  
  
  constructor() { }

  //用户名
  userName = "ZHUHUI";
  color = colorList[0];
  ngOnInit() {
    
  }

}
