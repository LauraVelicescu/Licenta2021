import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ApplicationService} from '../../shared/services/application/application.service';
import {RouteInfo} from '../../shared/util/ApplicationRoutesInfo';
import {SecurityStorage} from '../../security/SecurityStorage';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  public parentPath = '';
  treeControl = new NestedTreeControl<RouteInfo>(node => node.subPaths);
  dataSource = new MatTreeNestedDataSource<RouteInfo>();

  constructor(private applicationService: ApplicationService, private securityStorage: SecurityStorage) {
  }

  ngOnInit() {
    if(this.securityStorage.getPermissions()) {
      this.dataSource.data = this.applicationService.buildNavbarStored()
    } else {
      this.applicationService.buildNavbarForUserNotStored().subscribe((result) => {
        this.dataSource.data = result
      });
    }
  }

  hasChild = (_: number, node: RouteInfo) => !!node.subPaths && node.subPaths.length > 0;
}
