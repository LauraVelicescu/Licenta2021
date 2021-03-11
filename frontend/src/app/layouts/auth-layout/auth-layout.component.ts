import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from '../../components/sidebar/sidebar.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private modalService: NgbModal) {
  }


  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
