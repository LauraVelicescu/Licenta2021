package ro.fii.licenta.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.api.dao.NgoPartnersType;
import ro.fii.licenta.api.dao.NgoYear;
import ro.fii.licenta.api.dao.Partner;
import ro.fii.licenta.api.dao.ProjectBudgetIncreaseRequest;
import ro.fii.licenta.api.dao.ProjectExpense;
import ro.fii.licenta.api.dao.ProjectPartner;
import ro.fii.licenta.api.dto.NgoPartnersTypeDTO;
import ro.fii.licenta.api.dto.NgoYearDTO;
import ro.fii.licenta.api.dto.PartnerDTO;
import ro.fii.licenta.api.dto.ProjectBudgetIncreaseRequestDTO;
import ro.fii.licenta.api.dto.ProjectExpenseDTO;
import ro.fii.licenta.api.dto.ProjectPartnerDTO;
import ro.fii.licenta.api.service.FinancialService;

@RestController
@CrossOrigin
@RequestMapping("/financial")
public class FinancialController {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	FinancialService financialService;

	@GetMapping("/ngo-partner-types")
	public ResponseEntity<List<NgoPartnersTypeDTO>> getAllNgoPartnerTypes() {
		return ResponseEntity.ok(this.financialService.getAllNgoPartnersTypes().stream()
				.map(soure -> modelMapper.map(soure, NgoPartnersTypeDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/ngo-partner-types/{id}")
	public ResponseEntity<List<NgoPartnersTypeDTO>> getNgoPartnerTypeById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.financialService.getNgoPartnersTypeById(id).stream()
				.map(soure -> modelMapper.map(soure, NgoPartnersTypeDTO.class)).collect(Collectors.toList()));
	}

	@PostMapping("/ngo-partner-types")
	public void createNgoPartnerType(@RequestBody NgoPartnersTypeDTO ngoPartnerTypeDTO) {
		this.financialService.createNgoPartnersType(this.modelMapper.map(ngoPartnerTypeDTO, NgoPartnersType.class));
	}

	@PutMapping("/ngo-partner-types/{id}")
	public void updateNgoPartnerType(@PathVariable("id") Long id, @RequestBody NgoPartnersTypeDTO ngoPartnerTypeDTO) {
		this.financialService.updateNgoPartnersType(id, this.modelMapper.map(ngoPartnerTypeDTO, NgoPartnersType.class));
	}

	@DeleteMapping("/ngo-partner-types/{id}")
	public void deleteNgoPartnerType(@PathVariable("id") Long id) {
		this.financialService.deleteNgoPartnersType(id);
	}

	@GetMapping("/partners")
	public ResponseEntity<List<PartnerDTO>> getAllPartners() {
		return ResponseEntity.ok(this.financialService.getAllPartners().stream()
				.map(soure -> modelMapper.map(soure, PartnerDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/partners/{id}")
	public ResponseEntity<PartnerDTO> getPartnerById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.modelMapper.map(this.financialService.getPartnerById(id), PartnerDTO.class));
	}

	@PostMapping("/partners")
	public void createPartner(@RequestBody PartnerDTO partnerDTO) {
		this.financialService.createPartner(this.modelMapper.map(partnerDTO, Partner.class));
	}
	
	@PutMapping("/partners/{id}")
	public void updatePartner(@PathVariable("id") Long id, @RequestBody PartnerDTO partnerDTO) {
		this.financialService.updatePartner(id, this.modelMapper.map(partnerDTO, Partner.class));
	}

	@DeleteMapping("/partners/{id}")
	public void deletePartner(@PathVariable("id") Long id) {
		this.financialService.deletePartner(id);
	}

	@GetMapping("/ngoYears")
	public ResponseEntity<List<NgoYearDTO>> getAllNgoYears() {
		return ResponseEntity.ok(this.financialService.getAllNgoYears().stream()
				.map(soure -> modelMapper.map(soure, NgoYearDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/ngoYears/{id}")
	public ResponseEntity<List<NgoYearDTO>> getNgoYearById(@PathVariable("id") Long id) {
		// Method body
		return ResponseEntity.ok(this.financialService.getNgoYearById(id).stream()
				.map(soure -> modelMapper.map(soure, NgoYearDTO.class)).collect(Collectors.toList()));
	}

	@PostMapping("/ngoYears")
	public void createNgoYear(@RequestBody NgoYearDTO ngoYearDTO) {
		this.financialService.createNgoYear(this.modelMapper.map(ngoYearDTO, NgoYear.class));
	}

	@PutMapping("/ngoYears/{id}")
	public void updateNgoYear(@PathVariable("id") Long id, @RequestBody NgoYearDTO ngoYearDTO) {
		this.financialService.updateNgoYear(id, this.modelMapper.map(ngoYearDTO, NgoYear.class));
	}

	@DeleteMapping("/ngoYears/{id}")
	public void deleteNgoYear(@PathVariable("id") Long id) {
		this.financialService.deleteNgoYear(id);
	}

	@GetMapping("/projectBudgetIncreaseRequests")
	public ResponseEntity<List<ProjectBudgetIncreaseRequestDTO>> getAllProjectBudgetIncreaseRequests() {
		return ResponseEntity.ok(this.financialService.getAllProjectBudgetIncreaseRequests().stream()
				.map(soure -> modelMapper.map(soure, ProjectBudgetIncreaseRequestDTO.class))
				.collect(Collectors.toList()));
	}

	@GetMapping("/projectBudgetIncreaseRequests/{id}")
	public ResponseEntity<List<ProjectBudgetIncreaseRequestDTO>> getProjectBudgetIncreaseRequestById(
			@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.financialService.getProjectBudgetIncreaseRequestById(id).stream()
				.map(soure -> modelMapper.map(soure, ProjectBudgetIncreaseRequestDTO.class))
				.collect(Collectors.toList()));
	}

	@PostMapping("/projectBudgetIncreaseRequests")
	public void createProjectBudgetIncreaseRequest(
			@RequestBody ProjectBudgetIncreaseRequestDTO projectBudgetIncreaseRequestDTO) {
		this.financialService.createProjectBudgetIncreaseRequest(
				this.modelMapper.map(projectBudgetIncreaseRequestDTO, ProjectBudgetIncreaseRequest.class));
	}

	@PutMapping("/projectBudgetIncreaseRequests/{id}")
	public void updateProjectBudgetIncreaseRequest(@PathVariable("id") Long id,
			@RequestBody ProjectBudgetIncreaseRequestDTO projectBudgetIncreaseRequestDTO) {
		this.financialService.updateProjectBudgetIncreaseRequest(id,
				this.modelMapper.map(projectBudgetIncreaseRequestDTO, ProjectBudgetIncreaseRequest.class));
	}

	@DeleteMapping("/projectBudgetIncreaseRequests/{id}")
	public void deleteProjectBudgetIncreaseRequest(@PathVariable("id") Long id) {
		this.financialService.deleteProjectBudgetIncreaseRequest(id);
	}

	@GetMapping("/projectExpenses")
	public ResponseEntity<List<ProjectExpenseDTO>> getAllProjectExpenses() {
		return ResponseEntity.ok(this.financialService.getAllProjectExpenses().stream()
				.map(soure -> modelMapper.map(soure, ProjectExpenseDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/projectExpenses/{id}")
	public ResponseEntity<List<ProjectExpenseDTO>> getProjectExpenseById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.financialService.getProjectExpenseById(id).stream()
				.map(soure -> modelMapper.map(soure, ProjectExpenseDTO.class)).collect(Collectors.toList()));
	}

	@PostMapping("/projectExpenses")
	public void createProjectExpense(@RequestBody ProjectExpenseDTO projectExpenseDTO) {
		this.financialService.createProjectExpense(this.modelMapper.map(projectExpenseDTO, ProjectExpense.class));
	}

	@PutMapping("/projectExpenses/{id}")
	public void updateProjectExpense(@PathVariable("id") Long id, @RequestBody ProjectExpenseDTO projectExpenseDTO) {
		this.financialService.updateProjectExpense(id, this.modelMapper.map(projectExpenseDTO, ProjectExpense.class));
	}

	@DeleteMapping("/projectExpenses/{id}")
	public void deleteProjectExpense(@PathVariable("id") Long id) {
		this.deleteProjectExpense(id);
	}

	@GetMapping("/projectPartners")
	public ResponseEntity<List<ProjectPartnerDTO>> getAllProjectPartners() {
		return ResponseEntity.ok(this.financialService.getAllProjectPartners().stream()
				.map(soure -> modelMapper.map(soure, ProjectPartnerDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/projectPartners/{id}")
	public ResponseEntity<List<ProjectPartnerDTO>> getProjectPartnerById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.financialService.getProjectPartnerById(id).stream()
				.map(soure -> modelMapper.map(soure, ProjectPartnerDTO.class)).collect(Collectors.toList()));
	}

	@PostMapping("/projectPartners")
	public void createProjectPartner(@RequestBody ProjectPartnerDTO projectPartnerDTO) {
		this.financialService.createProjectPartner(this.modelMapper.map(projectPartnerDTO, ProjectPartner.class));
	}

	@PutMapping("/projectPartners/{id}")
	public void updateProjectPartner(@PathVariable("id") Long id, @RequestBody ProjectPartnerDTO projectPartnerDTO) {
		this.financialService.updateProjectPartner(id, this.modelMapper.map(projectPartnerDTO, ProjectPartner.class));
	}

	@DeleteMapping("/projectPartners/{id}")
	public void deleteProjectPartner(@PathVariable("id") Long id) {
		this.financialService.deleteProjectPartner(id);
	}

}
