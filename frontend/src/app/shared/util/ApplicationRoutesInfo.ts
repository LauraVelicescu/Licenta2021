export interface RouteInfo {

  path: string,
  title: string,
  icon: string,
  subPaths?: RouteInfo[]
  privileges?: string[],
  parentPath?: string
}

export enum Role {
  ADMIN = 'ADMIN',
  REPORTS = 'REPORTS',
  ACTIVE_MEMBER = 'ACTIVE_MEMBER',
  NGO_ADMIN = 'NGO_ADMIN',
  ANY = 'ANY'
}

export class ApplicationRoutesInfo {

  public static USER_ROUTE_INFO: RouteInfo = {
    path: 'user',
    title: 'Manage',
    icon: 'people',
    privileges: [Role.ANY],
    subPaths: [{
      path: 'me',
      title: 'My profile',
      icon: 'face',
      privileges: [Role.ANY],
      parentPath: 'user'
    }, {
      path: 'manage',
      title: 'Manage users',
      icon: 'engineering',
      privileges: [Role.ADMIN],
      parentPath: 'user'
    }, {
      path: 'roles',
      title: 'Roles',
      icon: 'shield',
      privileges: [Role.ADMIN],
      parentPath: 'user'
    }, {
      path: 'apply',
      title: 'Become a member',
      icon: 'loupe',
      privileges: [Role.ANY],
      parentPath: 'user'
    }]
  }

  public static NGO_ROUTE_INFO: RouteInfo = {
    path: 'ngo',
    title: 'NGOs',
    icon: 'public',
    privileges: [Role.ADMIN, Role.NGO_ADMIN],
    subPaths: [{
      path: 'manage',
      title: 'Manage NGO',
      icon: 'build',
      privileges: [Role.ADMIN, Role.NGO_ADMIN],
      parentPath: 'ngo'
    }, {
      path: 'functions',
      title: 'Functions',
      icon: 'category',
      privileges: [Role.ADMIN, Role.NGO_ADMIN],
      parentPath: 'ngo'
    }, {
      path: 'members',
      title: 'Ngo Members',
      icon: 'people',
      privileges: [Role.ADMIN, Role.NGO_ADMIN],
      parentPath: 'ngo'
    }, {
      path: 'ngo-year',
      title: 'Ngo years',
      icon: 'calendar_today',
      privileges: [Role.ADMIN, Role.NGO_ADMIN],
      parentPath: 'ngo'
    }, {
      path: 'ngo-partner-type',
      title: 'Ngo partners type',
      icon: 'attach_money',
      privileges: [Role.ADMIN, Role.NGO_ADMIN],
      parentPath: 'ngo'
    }]
  }

  public static PROJECT_ROUTE_INFO: RouteInfo = {
    path: 'project',
    title: 'Projects',
    icon: 'feed',
    privileges: [Role.ADMIN, Role.NGO_ADMIN, Role.ACTIVE_MEMBER, Role.REPORTS],
    subPaths: [{
      path: 'manage',
      title: 'Manage projects',
      icon: 'manage_search',
      privileges: [Role.ADMIN, Role.NGO_ADMIN, Role.REPORTS],
      parentPath: 'project'
    }, {
      path: 'board',
      title: 'Projects boards',
      icon: 'dashboard',
      privileges: [Role.ADMIN, Role.NGO_ADMIN, Role.ACTIVE_MEMBER, Role.REPORTS],
      parentPath: 'project'
    }]
  }

  public static ADMIN_ROUTES: RouteInfo[] = [ApplicationRoutesInfo.USER_ROUTE_INFO, ApplicationRoutesInfo.NGO_ROUTE_INFO, ApplicationRoutesInfo.PROJECT_ROUTE_INFO];
}
