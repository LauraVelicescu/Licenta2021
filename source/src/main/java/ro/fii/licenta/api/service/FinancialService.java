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
import ro.fii.licenta.api.exception.ValidationException;
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

	public List<NgoPartnersType> getNgoPartnersTypeById(Long id) {
		return ngoPartnersTypeRepository.findByNgo_Id(id);
	}

	public void createNgoPartnersType(NgoPartnersType ngoPartnersType) {
		validateUniqueNgoPartnersTypeName(ngoPartnersType.getName(), ngoPartnersType.getNgo().getId(), ngoPartnersType);
		if (ngoPartnersType.getMaxAmount() < ngoPartnersType.getMinAmount()) {
			throw new ValidationException("Max must be higher than min");
		}
		ngoPartnersTypeRepository.save(ngoPartnersType);
	}

	public void updateNgoPartnersType(Long id, NgoPartnersType ngoPartnersType) {
		validateUniqueNgoPartnersTypeName(ngoPartnersType.getName(), ngoPartnersType.getNgo().getId(), ngoPartnersType);
		if (ngoPartnersType.getMaxAmount() < ngoPartnersType.getMinAmount()) {
			throw new ValidationException("Max must be higher than min");
		}
		ngoPartnersTypeRepository.save(ngoPartnersType);
	}

	public void deleteNgoPartnersType(Long id) {
		NgoPartnersType ngoPartnersType = ngoPartnersTypeRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoPartnersType not found with id: " + id));
		ngoPartnersTypeRepository.delete(ngoPartnersType);
	}

	private void validateUniqueNgoPartnersTypeName(String name, Long currentId,
			NgoPartnersType updatedNgoPartnersType) {
		NgoPartnersType existingNgoPartnersType = ngoPartnersTypeRepository.findByNameAndNgo_Id(name, currentId);
		if (existingNgoPartnersType != null
				&& (updatedNgoPartnersType.getId() == null || !existingNgoPartnersType.getId().equals(currentId))) {
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

	public List<ProjectBudgetIncreaseRequest> getProjectBudgetIncreaseRequestById(Long id) {
		return projectBudgetIncreaseRequestRepository.findByProject_Id(id);
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

	public List<ProjectExpense> getProjectExpenseById(Long id) {
		return projectExpenseRepository.findByProject_Id(id);
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

	public List<NgoYear> getNgoYearById(Long id) {
		return ngoYearRepository.findByNgo_Id(id);
	}

	public void createNgoYear(NgoYear ngoYear) {
		validateUniqueNgoYearName(ngoYear.getName(), ngoYear.getNgo().getId(), ngoYear);
		if (ngoYear.getStartDate().after(ngoYear.getEndDate())) {
			throw new ValidationException("Start date must be before end date");
		}
		if (ngoYear.getStartDate().getYear() + 1 != ngoYear.getEndDate().getYear()) {
			throw new ValidationException("Years must be different and consecutive");
		}
		if (ngoYear.getTreasury() < 0) {
			throw new ValidationException("Treasury must be > 0");
		}
		ngoYearRepository.save(ngoYear);
	}

	public void updateNgoYear(Long id, NgoYear ngoYear) {
		validateUniqueNgoYearName(ngoYear.getName(), ngoYear.getNgo().getId(), ngoYear);
		if (ngoYear.getStartDate().after(ngoYear.getEndDate())) {
			throw new ValidationException("Start date must be before end date");
		}
		if (ngoYear.getStartDate().getYear() + 1 != ngoYear.getEndDate().getYear()) {
			throw new ValidationException("Years must be different and consecutive");
		}
		if (ngoYear.getTreasury() < 0) {
			throw new ValidationException("Treasury must be > 0");
		}
		// Update the properties of existingNgoYear with the values from ngoYear
		ngoYearRepository.save(ngoYear);
	}

	public void deleteNgoYear(Long id) {
		NgoYear ngoYear = ngoYearRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("NgoYear not found with id: " + id));
		ngoYearRepository.delete(ngoYear);
	}

	private void validateUniqueNgoYearName(String name, Long ngoId, NgoYear updatedNgoYear) {
		NgoYear existingNgoYear = ngoYearRepository.findByNameAndNgo_Id(name, ngoId);
		if (existingNgoYear != null
				&& (updatedNgoYear.getId() == null || !updatedNgoYear.getId().equals(existingNgoYear.getId()))) {
			throw new EntityConflictException(
					"NgoYear with name: " + name + " already exists for the NGO with id: " + ngoId);
		}
	}

	public List<ProjectPartner> getAllProjectPartners() {
		return projectPartnerRepository.findAll();
	}

	public List<ProjectPartner> getProjectPartnerById(Long id) {
		return projectPartnerRepository.findByProject_Id(id);
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
