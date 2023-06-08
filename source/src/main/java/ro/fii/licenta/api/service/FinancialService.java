package ro.fii.licenta.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.fii.licenta.api.dao.NgoPartnersType;
import ro.fii.licenta.api.dao.NgoYear;
import ro.fii.licenta.api.dao.Partner;
import ro.fii.licenta.api.dao.ProjectBudgetIncreaseRequest;
import ro.fii.licenta.api.dao.ProjectExpense;
import ro.fii.licenta.api.dao.ProjectPartner;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.exception.NotFoundException;
import ro.fii.licenta.api.repository.NgoPartnersTypeRepository;
import ro.fii.licenta.api.repository.NgoYearRepository;
import ro.fii.licenta.api.repository.PartnerRepository;
import ro.fii.licenta.api.repository.ProjectBudgetIncreaseRequestRepository;
import ro.fii.licenta.api.repository.ProjectExpenseRepository;
import ro.fii.licenta.api.repository.ProjectPartnerRepository;

@Service
public class FinancialService {


	@Autowired
	private ProjectPartnerRepository projectPartnerRepository;
	
	@Autowired
	private NgoYearRepository ngoYearRepository;

	@Autowired
	private ProjectExpenseRepository projectExpenseRepository;

	@Autowired
	private NgoPartnersTypeRepository ngoPartnersTypeRepository;

	@Autowired
	private PartnerRepository partnerRepository;

	@Autowired
	private ProjectBudgetIncreaseRequestRepository projectBudgetIncreaseRequestRepository;

	public List<NgoPartnersType> getAllNgoPartnersTypes() {
		return ngoPartnersTypeRepository.findAll();
	}

	public NgoPartnersType getNgoPartnersTypeById(Long id) {
		return ngoPartnersTypeRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoPartnersType not found with id: " + id));
	}

	public void createNgoPartnersType(NgoPartnersType ngoPartnersType) {
		validateUniqueNgoPartnersTypeName(ngoPartnersType.getName(), null);
		ngoPartnersTypeRepository.save(ngoPartnersType);
	}

	public void updateNgoPartnersType(Long id, NgoPartnersType ngoPartnersType) {
		NgoPartnersType existingNgoPartnersType = ngoPartnersTypeRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoPartnersType not found with id: " + id));
		validateUniqueNgoPartnersTypeName(ngoPartnersType.getName(), existingNgoPartnersType.getId());
		existingNgoPartnersType.setName(ngoPartnersType.getName());
		// Set other properties if needed
		ngoPartnersTypeRepository.save(existingNgoPartnersType);
	}

	public void deleteNgoPartnersType(Long id) {
		NgoPartnersType ngoPartnersType = ngoPartnersTypeRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoPartnersType not found with id: " + id));
		ngoPartnersTypeRepository.delete(ngoPartnersType);
	}

	private void validateUniqueNgoPartnersTypeName(String name, Long currentId) {
		NgoPartnersType existingNgoPartnersType = ngoPartnersTypeRepository.findByName(name);
		if (existingNgoPartnersType != null && !existingNgoPartnersType.getId().equals(currentId)) {
			throw new EntityConflictException("NgoPartnersType with name: " + name + " already exists.");
		}
	}

	public List<Partner> getAllPartners() {
		return partnerRepository.findAll();
	}

	public Partner getPartnerById(Long id) {
		return partnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Partner not found with id: " + id));
	}

	public void createPartner(Partner partner) {
		validateUniquePartnerName(partner.getName(), null);
		partnerRepository.save(partner);
	}

	public void updatePartner(Long id, Partner partner) {
		Partner existingPartner = partnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Partner not found with id: " + id));
		validateUniquePartnerName(partner.getName(), existingPartner.getId());
		existingPartner.setName(partner.getName());
		// Set other properties if needed
		partnerRepository.save(existingPartner);
	}

	public void deletePartner(Long id) {
		Partner partner = partnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Partner not found with id: " + id));
		partnerRepository.delete(partner);
	}

	private void validateUniquePartnerName(String name, Long currentId) {
		Partner existingPartner = partnerRepository.findByName(name);
		if (existingPartner != null && !existingPartner.getId().equals(currentId)) {
			throw new EntityConflictException("Partner with name: " + name + " already exists.");
		}
	}

	public List<ProjectBudgetIncreaseRequest> getAllProjectBudgetIncreaseRequests() {
		return projectBudgetIncreaseRequestRepository.findAll();
	}

	public ProjectBudgetIncreaseRequest getProjectBudgetIncreaseRequestById(Long id) {
		return projectBudgetIncreaseRequestRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectBudgetIncreaseRequest not found with id: " + id));
	}

	public void createProjectBudgetIncreaseRequest(ProjectBudgetIncreaseRequest projectBudgetIncreaseRequest) {
		projectBudgetIncreaseRequestRepository.save(projectBudgetIncreaseRequest);
	}

	public void updateProjectBudgetIncreaseRequest(Long id, ProjectBudgetIncreaseRequest projectBudgetIncreaseRequest) {
		ProjectBudgetIncreaseRequest existingProjectBudgetIncreaseRequest = projectBudgetIncreaseRequestRepository
				.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectBudgetIncreaseRequest not found with id: " + id));
		// Update the properties of existingProjectBudgetIncreaseRequest with the values
		// from projectBudgetIncreaseRequest
		projectBudgetIncreaseRequestRepository.save(existingProjectBudgetIncreaseRequest);
	}

	public void deleteProjectBudgetIncreaseRequest(Long id) {
		ProjectBudgetIncreaseRequest projectBudgetIncreaseRequest = projectBudgetIncreaseRequestRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectBudgetIncreaseRequest not found with id: " + id));
		projectBudgetIncreaseRequestRepository.delete(projectBudgetIncreaseRequest);
	}

	public List<ProjectExpense> getAllProjectExpenses() {
		return projectExpenseRepository.findAll();
	}

	public ProjectExpense getProjectExpenseById(Long id) {
		return projectExpenseRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectExpense not found with id: " + id));
	}

	public void createProjectExpense(ProjectExpense projectExpense) {
		projectExpenseRepository.save(projectExpense);
	}

	public void updateProjectExpense(Long id, ProjectExpense projectExpense) {
		ProjectExpense existingProjectExpense = projectExpenseRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectExpense not found with id: " + id));
		// Update the properties of existingProjectExpense with the values from
		// projectExpense
		projectExpenseRepository.save(existingProjectExpense);
	}

	public void deleteProjectExpense(Long id) {
		ProjectExpense projectExpense = projectExpenseRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectExpense not found with id: " + id));
		projectExpenseRepository.delete(projectExpense);
	}

	public List<NgoYear> getAllNgoYears() {
		return ngoYearRepository.findAll();
	}

	public NgoYear getNgoYearById(Long id) {
		return ngoYearRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoYear not found with id: " + id));
	}

	public void createNgoYear(NgoYear ngoYear) {
		validateUniqueNgoYearName(ngoYear.getName(), ngoYear.getNgo().getId());
		ngoYearRepository.save(ngoYear);
	}

	public void updateNgoYear(Long id, NgoYear ngoYear) {
		NgoYear existingNgoYear = ngoYearRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoYear not found with id: " + id));
		validateUniqueNgoYearName(ngoYear.getName(), ngoYear.getNgo().getId());
		// Update the properties of existingNgoYear with the values from ngoYear
		ngoYearRepository.save(existingNgoYear);
	}

	public void deleteNgoYear(Long id) {
		NgoYear ngoYear = ngoYearRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoYear not found with id: " + id));
		ngoYearRepository.delete(ngoYear);
	}

	private void validateUniqueNgoYearName(String name, Long ngoId) {
		NgoYear existingNgoYear = ngoYearRepository.findByNameAndNgo_Id(name, ngoId);
		if (existingNgoYear != null) {
			throw new EntityConflictException(
					"NgoYear with name: " + name + " already exists for the NGO with id: " + ngoId);
		}
	}

	public List<ProjectPartner> getAllProjectPartners() {
		return projectPartnerRepository.findAll();
	}

	public ProjectPartner getProjectPartnerById(Long id) {
		return projectPartnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectPartner not found with id: " + id));
	}

	public void createProjectPartner(ProjectPartner projectPartner) {
		Long projectId = projectPartner.getProject().getId();
		Long partnerId = projectPartner.getPartner().getId();

		ProjectPartner partnerExists = projectPartnerRepository.findByProject_IdAndPartner_Id(projectId, partnerId);
		if (partnerExists != null) {
			throw new EntityConflictException(
					"Partner with id: " + partnerId + " already associated with the project with id: " + projectId);
		}

		projectPartnerRepository.save(projectPartner);
	}

	public void updateProjectPartner(Long id, ProjectPartner projectPartner) {
		ProjectPartner existingProjectPartner = projectPartnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectPartner not found with id: " + id));

		// Update the properties of existingProjectPartner with the values from
		// projectPartner
		existingProjectPartner.setProject(projectPartner.getProject());
		existingProjectPartner.setPartner(projectPartner.getPartner());

		projectPartnerRepository.save(existingProjectPartner);
	}

	public void deleteProjectPartner(Long id) {
		ProjectPartner projectPartner = projectPartnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectPartner not found with id: " + id));

		projectPartnerRepository.delete(projectPartner);
	}
}
