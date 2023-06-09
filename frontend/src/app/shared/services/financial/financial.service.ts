import {Injectable} from '@angular/core';
import {MainServiceService} from '../main/main-service.service';
import {catchError, map} from 'rxjs/operators';
import {NgoPartnersTypeDTO} from '../../dto/NgoPartnersTypeDTO';
import {NgoYearDTO} from '../../dto/NgoYearDTO';
import {PartnerDTO} from '../../dto/PartnerDTO';
import {ProjectExpenseDTO} from '../../dto/ProjectExpenseDTO';
import {ProjectPartnerDTO} from '../../dto/ProjectPartnerDTO';
import {ProjectBudgetIncreaseRequestDTO} from '../../dto/ProjectBudgetIncreaseRequestDTO';
import {NgoDTO} from '../../dto/NgoDTO';
import {MemberDTO} from '../../dto/MemberDTO';
import {ProjectDTO} from '../../dto/ProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  private rootURL = 'api/financial';
  private ngoPartnerTypURL = '/ngo-partner-types';
  private partnerURL: string = '/partners';
  private projectBudgetIncreaseRequestURL: string = '/projectBudgetIncreaseRequests';
  private projectExpenseURL: string = '/projectExpenses';
  private projectPartnerURL: string = '/projectPartners';
  private ngoYearURL: string = '/ngoYears';

  constructor(private mainService: MainServiceService) {
  }

  public getAllNgoPartnerTypes() {
    return this.mainService.get(this.rootURL + this.ngoPartnerTypURL).pipe(map((result: NgoPartnersTypeDTO[]) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public getNgoPartnersTypeByNgoId(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.ngoPartnerTypURL + '/' + ngo.id).pipe(map((result: NgoPartnersTypeDTO[]) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public getAllNgoYears() {
    return this.mainService.get(this.rootURL + this.ngoYearURL).pipe(
      map((result: NgoYearDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getNgoYearsByNgoId(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.ngoYearURL + '/' + ngo.id).pipe(
      map((result: NgoYearDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getAllPartners() {
    return this.mainService.get(this.rootURL + this.partnerURL).pipe(
      map((result: PartnerDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getAllProjectBudgetIncreaseRequests() {
    return this.mainService.get(this.rootURL + this.projectBudgetIncreaseRequestURL).pipe(
      map((result: ProjectBudgetIncreaseRequestDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getAllProjectBudgetIncreaseRequestsByProjectId(project: ProjectDTO) {
    return this.mainService.get(this.rootURL + this.projectBudgetIncreaseRequestURL + '/' + project.id).pipe(
      map((result: ProjectBudgetIncreaseRequestDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getAllProjectExpenses() {
    return this.mainService.get(this.rootURL + this.projectExpenseURL).pipe(
      map((result: ProjectExpenseDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getAllProjectExpensesByProjectId(project: ProjectDTO) {
    return this.mainService.get(this.rootURL + this.projectExpenseURL + '/' + project.id).pipe(
      map((result: ProjectExpenseDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getAllProjectPartners() {
    return this.mainService.get(this.rootURL + this.projectPartnerURL).pipe(
      map((result: ProjectPartnerDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public getAllProjectPartnersByProjectId(project: ProjectDTO) {
    return this.mainService.get(this.rootURL + this.projectPartnerURL + '/' + project.id).pipe(
      map((result: ProjectPartnerDTO[]) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public createNgoPartnerType(data: NgoPartnersTypeDTO) {
    return this.mainService.post(this.rootURL + this.ngoPartnerTypURL, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public createNgoYear(data: NgoYearDTO) {
    return this.mainService.post(this.rootURL + this.ngoYearURL, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public createPartner(data: PartnerDTO) {
    return this.mainService.post(this.rootURL + this.partnerURL, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public createProjectBudgetIncreaseRequest(data: ProjectBudgetIncreaseRequestDTO) {
    return this.mainService.post(this.rootURL + this.projectBudgetIncreaseRequestURL, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public createProjectExpense(data: ProjectExpenseDTO) {
    return this.mainService.post(this.rootURL + this.projectExpenseURL, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public createProjectPartner(data: ProjectPartnerDTO) {
    return this.mainService.post(this.rootURL + this.projectPartnerURL, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public updateNgoPartnerType(data: NgoPartnersTypeDTO) {
    return this.mainService.put(this.rootURL + this.ngoPartnerTypURL + '/' + data.id, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public updateNgoYear(data: NgoYearDTO) {
    return this.mainService.put(this.rootURL + this.ngoYearURL + '/' + data.id, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public updatePartner(data: PartnerDTO) {
    return this.mainService.put(this.rootURL + this.partnerURL + '/' + data.id, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public updateProjectBudgetIncreaseRequest(data: ProjectBudgetIncreaseRequestDTO) {
    return this.mainService.put(this.rootURL + this.projectBudgetIncreaseRequestURL + '/' + data.id, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public updateProjectExpense(data: ProjectExpenseDTO) {
    return this.mainService.put(this.rootURL + this.projectExpenseURL + '/' + data.id, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public updateProjectPartner(data: ProjectPartnerDTO) {
    return this.mainService.put(this.rootURL + this.projectPartnerURL + '/' + data.id, data).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public deleteNgoPartnerType(data: NgoPartnersTypeDTO) {
    return this.mainService.delete(this.rootURL + this.ngoPartnerTypURL + '/' + data.id).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public deleteNgoYear(data: NgoYearDTO) {
    return this.mainService.delete(this.rootURL + this.ngoYearURL + '/' + data.id).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public deletePartner(data: PartnerDTO) {
    return this.mainService.delete(this.rootURL + this.partnerURL + '/' + data.id).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public deleteProjectBudgetIncreaseRequest(data: ProjectBudgetIncreaseRequestDTO) {
    return this.mainService.delete(this.rootURL + this.projectBudgetIncreaseRequestURL + '/' + data.id).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public deleteProjectExpense(data: ProjectExpenseDTO) {
    return this.mainService.delete(this.rootURL + this.projectExpenseURL + '/' + data.id).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }

  public deleteProjectPartner(data: ProjectPartnerDTO) {
    return this.mainService.delete(this.rootURL + this.projectPartnerURL + '/' + data.id).pipe(
      map((result) => {
        return result;
      }),
      catchError(err => {
        throw new Error(err.error.message);
      })
    );
  }
}
