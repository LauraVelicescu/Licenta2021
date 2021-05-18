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
    title: 'Administrare',
    icon: 'people',
    privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
    subPaths: [{
      path: 'manage',
      title: 'Administrare utilizatori',
      icon: 'engineering',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'user'
    }, {
      path: 'roles',
      title: 'Roluri',
      icon: 'shield',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'user'
    }, {
      path: 'nomenclature',
      title: 'Nomenclatoare',
      icon: 'collections',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'user'
    }]
  }

  public static NGO_ROUTE_INFO: RouteInfo = {
    path: 'ngo',
    title: 'Organizatii Non-Guvernamentale',
    icon: 'public',
    privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
    subPaths: [{
      path: 'manage',
      title: 'Administrare ONG',
      icon: 'build',
      privileges: ['privilegiu1', 'privilegiu2', 'privilegiu3'],
      parentPath: 'ngo'
    }, {
      path: 'users',
      title: 'Utilizatori ONG',
      icon: 'person_search',
      privileges: ['privilegiu5'],
      parentPath: 'ngo'
    }]
  }

  public static ADMIN_ROUTES: RouteInfo[] = [ApplicationRoutesInfo.USER_ROUTE_INFO, ApplicationRoutesInfo.NGO_ROUTE_INFO];
}
