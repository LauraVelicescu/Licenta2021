package ro.fii.licenta.api.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

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

import ro.fii.licenta.api.dao.ProjectTask;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.ProjectDTO;
import ro.fii.licenta.api.dto.ProjectTaskDTO;
import ro.fii.licenta.api.service.ProjectService;
import ro.fii.licenta.api.service.TaskService;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/task")
public class TaskController {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private TaskService taskService;

	@Autowired
	private ProjectService projectService;

	@Autowired
	private UserService userService;

	@GetMapping(value = "/{projectId}")
	public ResponseEntity<List<ProjectTaskDTO>> findProjectTasks(@PathVariable(value = "projectId") Long projectId) {
		List<ProjectTaskDTO> projectTaskDTOs = new ArrayList<>();
		this.taskService.findProjectTaskByProject(projectId).forEach(pt -> {
			projectTaskDTOs.add(this.modelMapper.map(pt, ProjectTaskDTO.class));
		});
		return ResponseEntity.ok(projectTaskDTOs);
	}

	@PostMapping(value = "/{projectId}")
	public void createProjectTask(@PathVariable(value = "projectId") Long projectId,
			@RequestBody ProjectTaskDTO projectTaskDTO, HttpServletRequest request) {

		User currentUser = userService.getCurrentUser(request);
		projectTaskDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		this.taskService.createTask(this.modelMapper.map(projectTaskDTO, ProjectTask.class), currentUser);
	}

	@PutMapping(value = "/{projectId}")
	public void updateProjectTask(@PathVariable(value = "projectId") Long projectId,
			@RequestBody ProjectTaskDTO projectTaskDTO, HttpServletRequest request) {

		User currentUser = userService.getCurrentUser(request);
		projectTaskDTO.setProject(this.modelMapper.map(this.projectService.findById(projectId), ProjectDTO.class));
		this.taskService.updateTask(this.modelMapper.map(projectTaskDTO, ProjectTask.class), currentUser);
	}

	@DeleteMapping(value = "/{taskId}")
	public void deleteProjectTask(@PathVariable(value = "taskId") Long taskId) {
		this.taskService.deleteTask(taskId);
	}
}
