package ro.fii.licenta.api.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javassist.NotFoundException;
import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dao.ProjectPosition;
import ro.fii.licenta.api.dto.NgoDTO;
import ro.fii.licenta.api.dto.ProjectDTO;
import ro.fii.licenta.api.dto.ProjectPositionDTO;
import ro.fii.licenta.api.service.NGOService;
import ro.fii.licenta.api.service.ProjectService;

@RestController
@CrossOrigin
public class ProjectController {


    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private NGOService ngoService;

    @PostMapping(value = "/createProject/{ngoId}")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDto, @PathVariable(value = "ngoId") Long ngoId) {
        projectDto.setNgoDTO(modelMapper.map(ngoService.findById(ngoId), NgoDTO.class));
        return ResponseEntity.ok(modelMapper.map(projectService.save(modelMapper.map(projectDto, Project.class)), ProjectDTO.class));

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

    @GetMapping(value = "/findProjects/{ngoId}")
    public ResponseEntity<List<ProjectDTO>> findNGOProjects(
            @RequestParam(name = "page", required = false) Integer page,
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

    @GetMapping(value = "/project/{projectId}/position")
    public ResponseEntity<List<ProjectPositionDTO>> getPositions(@PathVariable(value = "projectId") Long projectId) {
        List<ProjectPositionDTO> projectPositionDTOS = new ArrayList<>();
        this.projectService.getProjectPositions(projectId).forEach(projectPosition -> {
            projectPositionDTOS.add(modelMapper.map(projectPosition, ProjectPositionDTO.class));
        });
        return ResponseEntity.ok(projectPositionDTOS);
    }

    @PostMapping(value = "/project/{projectId}/position")
    public ResponseEntity<ProjectPositionDTO> createPosition(@PathVariable(value = "projectId") Long projectId, @RequestBody ProjectPositionDTO projectPositionDTO) {
        projectPositionDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		return ResponseEntity.ok(this.modelMapper.map(this.projectService.saveProjectPosition(this.modelMapper.map(projectPositionDTO, ProjectPosition.class)), ProjectPositionDTO.class));
    }

	@PutMapping(value = "/project/{projectId}/position")
	public ResponseEntity<ProjectPositionDTO> updatePosition(@PathVariable(value = "projectId") Long projectId, @RequestBody ProjectPositionDTO projectPositionDTO) {
		projectPositionDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		return ResponseEntity.ok(this.modelMapper.map(this.projectService.saveProjectPosition(this.modelMapper.map(projectPositionDTO, ProjectPosition.class)), ProjectPositionDTO.class));
	}

	@DeleteMapping("/project/{projectPositionId}/position")
	public void deleteProjectPosition(@PathVariable(value = "projectPositionId") Long projectPositionId) {
        this.projectService.deleteProjectPosition(projectPositionId);
	}
}

