import {ApplicationRoutes} from "./ApplicationRoutes";

export interface RouteInfo {

  path: string,
  title: string,
  icon: string,
  subPaths?: RouteInfo[]
  privileges?: string[],
  parentPath?: string
}

export class ApplicationRoutesInfo {

  public static USER_ROUTE_INFO: RouteInfo = {
    path: 'user',
    title: 'Manage',
    icon: 'people',
    privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
    subPaths: [{
      path: 'me',
      title: 'My profile',
      icon: 'face',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'user'
    }, {
      path: 'manage',
      title: 'Manage users',
      icon: 'engineering',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'user'
    }, {
      path: 'roles',
      title: 'Roles',
      icon: 'shield',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'user'
    }, {
      path: 'apply',
      title: 'Become a member',
      icon: 'loupe',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'user'
    }]
  }

  public static NGO_ROUTE_INFO: RouteInfo = {
    path: 'ngo',
    title: 'NGOs',
    icon: 'public',
    privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
    subPaths: [{
      path: 'manage',
      title: 'Manage NGO',
      icon: 'build',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'ngo'
    }, {
      path: 'functions',
      title: 'Functions',
      icon: 'category',
      privileges:['privilegiu1'],
      parentPath: 'ngo'
    }, {
      path: 'members',
      title: 'Ngo Members',
      icon: 'people',
      privileges:['privilegiu1'],
      parentPath: 'ngo'
    }]
  }

  public static PROJECT_ROUTE_INFO: RouteInfo = {
    path: 'project',
    title: 'Projects',
    icon: 'feed',
    privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
    subPaths: [{
      path: 'manage',
      title: 'Manage projects',
      icon: 'manage_search',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'project'
    }, {
      path: 'board',
      title: 'Projects boards',
      icon: 'dashboard',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'project'
    }]
  }

  public static ADMIN_ROUTES: RouteInfo[] = [ApplicationRoutesInfo.USER_ROUTE_INFO, ApplicationRoutesInfo.NGO_ROUTE_INFO, ApplicationRoutesInfo.PROJECT_ROUTE_INFO];
}
