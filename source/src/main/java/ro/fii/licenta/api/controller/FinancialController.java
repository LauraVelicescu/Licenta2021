package ro.fii.licenta.api.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ro.fii.licenta.api.dao.NgoPartnersType;
import ro.fii.licenta.api.dao.NgoYear;
import ro.fii.licenta.api.dao.Partner;
import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dao.ProjectBudgetIncreaseRequest;
import ro.fii.licenta.api.dao.ProjectExpense;
import ro.fii.licenta.api.dao.ProjectMember;
import ro.fii.licenta.api.dao.ProjectPartner;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.NgoPartnersTypeDTO;
import ro.fii.licenta.api.dto.NgoYearDTO;
import ro.fii.licenta.api.dto.PartnerDTO;
import ro.fii.licenta.api.dto.ProjectBudgetIncreaseRequestDTO;
import ro.fii.licenta.api.dto.ProjectExpenseDTO;
import ro.fii.licenta.api.dto.ProjectMemberDTO;
import ro.fii.licenta.api.dto.ProjectPartnerDTO;
import ro.fii.licenta.api.exception.ValidationException;
import ro.fii.licenta.api.repository.ProjectExpenseRepository;
import ro.fii.licenta.api.repository.ProjectMemberRepository;
import ro.fii.licenta.api.repository.ProjectRepository;
import ro.fii.licenta.api.service.FinancialService;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/financial")
public class FinancialController {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	FinancialService financialService;

	@Autowired
	ProjectMemberRepository projectMemberRepository;

	@Autowired
	ProjectExpenseRepository projectExpenseRepository;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	UserService userService;

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
	public ResponseEntity<ProjectExpenseDTO> createProjectExpense(@RequestBody ProjectExpenseDTO projectExpenseDTO,
			HttpServletRequest request) {

		User user = userService.getCurrentUser(request);
		ProjectMember pm = this.projectMemberRepository
				.findByProject_IdAndMember_User_Id(projectExpenseDTO.getProject().getId(), user.getId());
		if(pm != null) {
			projectExpenseDTO.setExpenseOwner(this.modelMapper.map(pm, ProjectMemberDTO.class));
		}

		ProjectExpense created = this.financialService
				.createProjectExpense(this.modelMapper.map(projectExpenseDTO, ProjectExpense.class));
		ProjectExpenseDTO toReturn = new ProjectExpenseDTO();
		toReturn.setId(created.getId());
		return ResponseEntity.ok(toReturn);
	}

	@PutMapping(value = "/projectExpenses/{id}/{state}")
	public void updateState(@PathVariable("id") Long id, @PathVariable("state") Long state) {
		ProjectExpense projectExpense = this.projectExpenseRepository.findById(id).get();
		if (state == 1) {
			if (projectExpense.getAmount() > projectExpense.getProject().getRemainingBudget()) {
				throw new ValidationException(
						"Cannot validate the expense because it's higher than the remaining budget");
			}
			projectExpense.setStatus(1);
			Project project = projectExpense.getProject();
			project.setRemainingBudget(project.getRemainingBudget() - projectExpense.getAmount());
			this.projectRepository.save(project);
		} else if (state == 2) {
			if (projectExpense.getStatus() == 1) {
				Project project = projectExpense.getProject();
				project.setRemainingBudget(project.getRemainingBudget() + projectExpense.getAmount());

				this.projectRepository.save(project);
			}
			projectExpense.setStatus(2);

			this.projectExpenseRepository.save(projectExpense);
		}
	}

	@PostMapping(value = "/projectExpenses/upload/{id}")
	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile f, @PathVariable("id") Long id,
			HttpServletRequest request) throws IOException {
		ProjectExpense projectExpense = this.projectExpenseRepository.findById(id).get();
		projectExpense.setDocuments(compressBytes(f.getBytes()));
		projectExpense.setFileName(f.getOriginalFilename().substring(0, f.getOriginalFilename().lastIndexOf(".")));
		projectExpense.setFileExtension(f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."),
				f.getOriginalFilename().length()));
		projectExpense.setContentType(f.getContentType());
		return new ResponseEntity<>(
				modelMapper.map(this.projectExpenseRepository.save(projectExpense), ProjectExpenseDTO.class),
				HttpStatus.OK);
	}

	@PostMapping(value = "/projectExpenses/download/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<Resource> downloadFile(@PathVariable("id") Long id) {
		ProjectExpense projectExpense = this.projectExpenseRepository.findById(id).get();
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;");
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

		Resource resource = new ByteArrayResource(decompressBytes(projectExpense.getDocuments()));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}

	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {

		}
		return outputStream.toByteArray();

	}

	private byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException ioe) {
		} catch (DataFormatException e) {
		}
		return outputStream.toByteArray();

	}

	@PutMapping("/projectExpenses/{id}")
	public void updateProjectExpense(@PathVariable("id") Long id, @RequestBody ProjectExpenseDTO projectExpenseDTO,
			HttpServletRequest request) {
		this.financialService.updateProjectExpense(id, this.modelMapper.map(projectExpenseDTO, ProjectExpense.class));
	}

	@DeleteMapping("/projectExpenses/{id}")
	public void deleteProjectExpense(@PathVariable("id") Long id) {
		this.financialService.deleteProjectExpense(id);
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
