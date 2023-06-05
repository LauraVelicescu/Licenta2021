import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ApplicationService} from '../../shared/services/application/application.service';
import {RouteInfo} from '../../shared/util/ApplicationRoutesInfo';


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

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applicationService.buildNavbarForUser().subscribe((result) => {
      this.dataSource.data = result
    });
  }

  hasChild = (_: number, node: RouteInfo) => !!node.subPaths && node.subPaths.length > 0;
}
