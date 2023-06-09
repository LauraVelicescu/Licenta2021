package ro.fii.licenta.api.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.Deflater;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;
import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dao.ProjectMember;
import ro.fii.licenta.api.dao.ProjectPosition;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.NgoYearDTO;
import ro.fii.licenta.api.dto.ProjectDTO;
import ro.fii.licenta.api.dto.ProjectMemberDTO;
import ro.fii.licenta.api.dto.ProjectPositionDTO;
import ro.fii.licenta.api.repository.NgoYearRepository;
import ro.fii.licenta.api.repository.ProjectRepository;
import ro.fii.licenta.api.service.ProjectService;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
public class ProjectController {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ProjectService projectService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private NgoYearRepository ngoYearRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@PostMapping(value = "/createProject/{ngoYearId}")
	public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDto,
			@PathVariable(value = "ngoYearId") Long ngoId) {
		projectDto.setNgoYear(modelMapper.map(ngoYearRepository.findById(ngoId).get(), NgoYearDTO.class));
		return ResponseEntity
				.ok(modelMapper.map(projectService.save(modelMapper.map(projectDto, Project.class)), ProjectDTO.class));

	}

	@PostMapping(value = "/updateProject")
	public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectDTO projectDto) {
		Project project = projectService.findById(projectDto.getId());

		if (project != null) {
			new NotFoundException(String.format("Project with name %s was not found", projectDto.getName()));
		}

		modelMapper.getConfiguration().setSkipNullEnabled(true);
		modelMapper.map(projectDto, project);
		modelMapper.getConfiguration().setSkipNullEnabled(false);
		return new ResponseEntity<>(modelMapper.map(projectService.save(project), ProjectDTO.class), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		projectService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping(value = "/deleteProjects")
	public void deleteProject(@RequestBody List<ProjectDTO> projectDtos, HttpServletRequest request) throws Exception {
		List<Project> projects = new ArrayList<Project>();
		for (ProjectDTO p : projectDtos) {
			projects.add(modelMapper.map(p, Project.class));
		}
		projectService.deleteProjects(projects);
	}

	@GetMapping(value = "/findAllProjects")
	public ResponseEntity<List<ProjectDTO>> findAllProjects() {
		List<ProjectDTO> ngoProjectDtos = new ArrayList<ProjectDTO>();
		this.projectRepository.findAll().forEach(p -> {
			ngoProjectDtos.add(this.modelMapper.map(p, ProjectDTO.class));
		});
		return ResponseEntity.ok(ngoProjectDtos);
	}

	@GetMapping(value = "/findNgoManagedProject")
	public ResponseEntity<List<ProjectDTO>> findNgoManagedProjects(HttpServletRequest request) {

		User user = userService.getCurrentUser(request);

		List<ProjectDTO> ngoProjectDtos = new ArrayList<ProjectDTO>();
		this.projectRepository.findByNgoYear_Ngo_Admin_Id(user.getId()).forEach(p -> {
			ngoProjectDtos.add(this.modelMapper.map(p, ProjectDTO.class));
		});
		return ResponseEntity.ok(ngoProjectDtos);
	}

	@GetMapping(value = "/findProjects/{ngoId}")
	public ResponseEntity<List<ProjectDTO>> findNGOProjects(@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo,
			@PathVariable(value = "ngoId") Long ngoId) {

		List<ProjectDTO> ngoProjectDtos = new ArrayList<ProjectDTO>();
		List<Project> ngoProjects = projectService.findAllNgoProjects(page, pageNo, ngoId);
		for (Project project : ngoProjects) {
			ngoProjectDtos.add(modelMapper.map(project, ProjectDTO.class));
		}

		return ResponseEntity.ok(ngoProjectDtos);
	}

	@GetMapping(value = "/findProjects/count/{ngoId}")
	public ResponseEntity<Integer> findProjectCount(@PathVariable(value = "ngoId") Long ngoId) {
		List<Project> ngoProjects = projectService.findAllNgoProjects(null, null, ngoId);

		return ResponseEntity.ok(ngoProjects.size());
	}

	@GetMapping(value = "/findMyProjects")
	public ResponseEntity<List<ProjectDTO>> findMyProjects(HttpServletRequest request) {
		User currentUser = userService.getCurrentUser(request);
		List<ProjectDTO> ngoProjectDtos = new ArrayList<ProjectDTO>();
		List<Project> ngoProjects = projectService.findAllProjectsByUser(currentUser);
		for (Project project : ngoProjects) {
			ngoProjectDtos.add(modelMapper.map(project, ProjectDTO.class));
		}

		return ResponseEntity.ok(ngoProjectDtos);
	}

	@GetMapping(value = "/project/{projectId}/position")
	public ResponseEntity<List<ProjectPositionDTO>> getPositions(@PathVariable(value = "projectId") Long projectId) {
		List<ProjectPositionDTO> projectPositionDTOS = new ArrayList<>();
		this.projectService.getProjectPositions(projectId).forEach(projectPosition -> {
			projectPositionDTOS.add(modelMapper.map(projectPosition, ProjectPositionDTO.class));
		});
		return ResponseEntity.ok(projectPositionDTOS);
	}

	@PostMapping(value = "/project/{projectId}/position")
	public ResponseEntity<ProjectPositionDTO> createPosition(@PathVariable(value = "projectId") Long projectId,
			@RequestBody ProjectPositionDTO projectPositionDTO) {
		projectPositionDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		return ResponseEntity
				.ok(this.modelMapper.map(
						this.projectService
								.saveProjectPosition(this.modelMapper.map(projectPositionDTO, ProjectPosition.class)),
						ProjectPositionDTO.class));
	}

	@PutMapping(value = "/project/{projectId}/position")
	public ResponseEntity<ProjectPositionDTO> updatePosition(@PathVariable(value = "projectId") Long projectId,
			@RequestBody ProjectPositionDTO projectPositionDTO) {
		projectPositionDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		return ResponseEntity
				.ok(this.modelMapper.map(
						this.projectService
								.saveProjectPosition(this.modelMapper.map(projectPositionDTO, ProjectPosition.class)),
						ProjectPositionDTO.class));
	}

	@DeleteMapping("/project/{projectPositionId}/position")
	public void deleteProjectPosition(@PathVariable(value = "projectPositionId") Long projectPositionId) {
		this.projectService.deleteProjectPosition(projectPositionId);
	}

	@GetMapping("/project/{projectId}/member")
	public ResponseEntity<List<ProjectMemberDTO>> getMembers(@PathVariable(value = "projectId") Long projectId) {

		List<ProjectMemberDTO> list = new ArrayList<>();

		this.projectService.findProjectMembers(projectId).forEach(m -> {
			list.add(this.modelMapper.map(m, ProjectMemberDTO.class));
		});

		return ResponseEntity.ok(list);
	}

	@PostMapping(value = "/project/{projectId}/member")
	public void createProjectMember(@PathVariable(value = "projectId") Long projectId,
			@RequestBody ProjectMemberDTO projectMemberDTO) {
		projectMemberDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		this.projectService.saveProjectMember(this.modelMapper.map(projectMemberDTO, ProjectMember.class));
	}

	@PutMapping(value = "/project/{projectId}/member")
	public void updateProjectMember(@PathVariable(value = "projectId") Long projectId,
			@RequestBody ProjectMemberDTO projectMemberDTO) {
		projectMemberDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		this.projectService.saveProjectMember(this.modelMapper.map(projectMemberDTO, ProjectMember.class));
	}

	@DeleteMapping("/project/{projectMemberId}/member")
	public void deleteMember(@PathVariable(value = "projectMemberId") Long projectMemberId) {
		this.projectService.deleteProjectMember(projectMemberId);
	}

//	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
//			@PathVariable(value = "projectId") Long projectId) throws IOException {
//		Project p = this.projectService.findById(projectId);
//		p.setLogo(compressBytes(file.getBytes()));
//		return new ResponseEntity<>(modelMapper.map(projectService.save(p), ProjectDTO.class), HttpStatus.OK);
//	}

	@PostMapping(value = "/project/{projectId}/uploadImage")
	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
			@PathVariable(value = "projectId") Long projectId, HttpServletRequest request) throws IOException {
		Project project = this.projectService.findById(projectId);

		project.setLogo(compressBytes(file.getBytes()));
		return new ResponseEntity<>(modelMapper.map(projectService.save(project), ProjectDTO.class), HttpStatus.OK);

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

}
