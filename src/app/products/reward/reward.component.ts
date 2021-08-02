import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  @Input('number') number: number;
  constructor() { }

  ngOnInit(): void {
  }

}
