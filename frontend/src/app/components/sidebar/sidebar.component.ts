import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "icons",
    title: "Projects",
    rtlTitle: "الرموز",
    icon: "icon-components",
    class: ""
  },
  {
    path: "maps",
    title: "Calendar",
    rtlTitle: "خرائط",
    icon: "icon-calendar-60",
    class: "" },

  {
    path: "user",
    title: "User Profile",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "typography",
    title: "Settings",
    rtlTitle: "طباعة",
    icon: "icon-settings",
    class: ""
  },
  {
    path: "ngo",
    title: "Create NGO",
    rtlTitle: "طباعة",
    icon: "icon-simple-add",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
