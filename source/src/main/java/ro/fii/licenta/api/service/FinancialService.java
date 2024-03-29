package ro.fii.licenta.api.service;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.fii.licenta.api.dao.NgoPartnersType;
import ro.fii.licenta.api.dao.NgoYear;
import ro.fii.licenta.api.dao.Partner;
import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dao.ProjectExpense;
import ro.fii.licenta.api.dao.ProjectPartner;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.exception.NotFoundException;
import ro.fii.licenta.api.exception.ValidationException;
import ro.fii.licenta.api.repository.NgoPartnersTypeRepository;
import ro.fii.licenta.api.repository.NgoYearRepository;
import ro.fii.licenta.api.repository.PartnerRepository;
import ro.fii.licenta.api.repository.ProjectExpenseRepository;
import ro.fii.licenta.api.repository.ProjectPartnerRepository;
import ro.fii.licenta.api.repository.ProjectRepository;

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
	private ProjectRepository projectRepository;


	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	private static final String PHONE_NUMBER_PATTERN = "^(?:(?:\\+|00)40\\s?|0)(?:(?:[72][236845]\\d{1}\\s?\\d{3}\\s?\\d{3})|(?:7[2-9]\\d{1}\\s?\\d{3}\\s?\\d{4})|(?:3[0-9]{2}\\s?\\d{3}\\s?\\d{3}))$";

	private final Pattern patternPhone = Pattern.compile(PHONE_NUMBER_PATTERN);

	private final Pattern pattern = Pattern.compile(EMAIL_PATTERN);

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
				&& (updatedNgoPartnersType.getId() == null || !existingNgoPartnersType.getId().equals(updatedNgoPartnersType.getId()))) {
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
		if (!this.isValidEmail(partner.getMail())) {
			throw new ValidationException("Email is incorect");
		}
		if (!this.isValidPhoneNumber(partner.getPhone())) {
			throw new ValidationException("Phone is incorect");
		}
		partnerRepository.save(partner);
	}

	public void updatePartner(Long id, Partner partner) {
		validateUniquePartnerName(partner.getName(), partner.getId());
		if (!this.isValidEmail(partner.getMail())) {
			throw new ValidationException("Email is incorect");
		}
		if (!this.isValidPhoneNumber(partner.getPhone())) {
			throw new ValidationException("Phone is incorect");
		}
		partnerRepository.save(partner);
	}

	public void deletePartner(Long id) {
		Partner partner = partnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Partner not found with id: " + id));
		partnerRepository.delete(partner);
	}

	private void validateUniquePartnerName(String name, Long currentId) {
		Partner existingPartner = partnerRepository.findByName(name);
		if (existingPartner != null && (currentId == null || !existingPartner.getId().equals(currentId))) {
			throw new EntityConflictException("Partner with name: " + name + " already exists.");
		}
	}

	private boolean isValidEmail(String email) {
		if (email == null) {
			return false;
		}
		return pattern.matcher(email).matches();
	}

	public boolean isValidPhoneNumber(String phoneNumber) {
		if (phoneNumber == null) {
			return false;
		}
		patternPhone.matcher("0723678901").matches();
		patternPhone.matcher("0753738357").matches();
		return patternPhone.matcher(phoneNumber).matches();
//		0723678901
//		0753738357
	}


	public List<ProjectExpense> getAllProjectExpenses() {
		return projectExpenseRepository.findAll();
	}

	public List<ProjectExpense> getProjectExpenseById(Long id) {
		return projectExpenseRepository.findByProject_Id(id);
	}

	public ProjectExpense createProjectExpense(ProjectExpense projectExpense) {
		return projectExpenseRepository.save(projectExpense);
	}

	public void updateProjectExpense(Long id, ProjectExpense projectExpense) {
		projectExpenseRepository.save(projectExpense);
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
		ngoYear.setRemainingTreasury(ngoYear.getTreasury());
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
		ngoYear.setRemainingTreasury(ngoYear.getTreasury());
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

		if (projectPartner.getAmount() > projectPartner.getPartnersType().getMaxAmount()
				|| projectPartner.getAmount() < projectPartner.getPartnersType().getMinAmount()) {
			throw new ValidationException(
					"Partner must give an amount between: " + projectPartner.getPartnersType().getMinAmount() + " and: "
							+ projectPartner.getPartnersType().getMaxAmount());
		}
		Project project = this.projectRepository.findById(projectId).get();
		project.setBudgetPartners(
				(project.getBudgetPartners() != null ? project.getBudgetPartners() : 0) + projectPartner.getAmount());
		project.setRemainingBudget(project.getRemainingBudget() + projectPartner.getAmount());
		projectRepository.save(project);
		projectPartnerRepository.save(projectPartner);
	}

	public void updateProjectPartner(Long id, ProjectPartner projectPartner) {

		Long projectId = projectPartner.getProject().getId();
		Long partnerId = projectPartner.getPartner().getId();

		ProjectPartner partnerExists = projectPartnerRepository.findByProject_IdAndPartner_Id(projectId, partnerId);
		if (partnerExists != null && !partnerExists.getId().equals(projectPartner.getId())) {
			throw new EntityConflictException(
					"Partner with id: " + partnerId + " already associated with the project with id: " + projectId);
		}

		if (projectPartner.getAmount() > projectPartner.getPartnersType().getMaxAmount()
				|| projectPartner.getAmount() < projectPartner.getPartnersType().getMinAmount()) {
			throw new ValidationException(
					"Partner must give an amount between: " + projectPartner.getPartnersType().getMinAmount() + " and: "
							+ projectPartner.getPartnersType().getMaxAmount());
		}
		ProjectPartner existingPartner = this.projectPartnerRepository.findById(projectPartner.getId()).get();
		Project project = this.projectRepository.findById(projectId).get();
		project.setBudgetPartners(
				project.getBudgetPartners() - existingPartner.getAmount() + projectPartner.getAmount());
		project.setRemainingBudget(
				project.getRemainingBudget() - existingPartner.getAmount() + projectPartner.getAmount());
		projectRepository.save(project);
		projectPartnerRepository.save(projectPartner);
	}

	public void deleteProjectPartner(Long id) {
		ProjectPartner projectPartner = projectPartnerRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("ProjectPartner not found with id: " + id));

		Project project = this.projectRepository.findById(projectPartner.getProject().getId()).get();
		project.setBudgetPartners(project.getBudgetPartners() - projectPartner.getAmount());
		project.setRemainingBudget(project.getRemainingBudget() - projectPartner.getAmount());
		this.projectRepository.save(project);
		projectPartnerRepository.delete(projectPartner);
	}
}
