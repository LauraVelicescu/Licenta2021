package ro.fii.licenta.api.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.zip.Deflater;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ro.fii.licenta.api.dao.ProjectTask;
import ro.fii.licenta.api.dao.TaskAttachment;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.ProjectDTO;
import ro.fii.licenta.api.dto.ProjectTaskDTO;
import ro.fii.licenta.api.dto.TaskAttachmentDTO;
import ro.fii.licenta.api.repository.ProjectTaskRepository;
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
	private ProjectTaskRepository projectTaskRepository;

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

	@GetMapping(value = "/upload/{taskId}")
	public ResponseEntity<List<TaskAttachmentDTO>> findAttachmentsForTask(@PathVariable(value = "taskId") Long taskId) {
		List<TaskAttachmentDTO> attachmentskDTOs = new ArrayList<>();
		this.taskService.findAttachmentByTask(taskId).forEach(pt -> {
			attachmentskDTOs.add(this.modelMapper.map(pt, TaskAttachmentDTO.class));
		});
		return ResponseEntity.ok(attachmentskDTOs);
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

	@DeleteMapping(value = "/upload/{attachmentId}")
	public void deleteAttachments(@PathVariable(value = "attachmentId") Long attachmentId) {
		this.taskService.deleteAttachment(attachmentId);
	}

	@PostMapping(value = "/upload/{taskId}", consumes = { "multipart/form-data" })
	public void uploadFile(@RequestParam("imageFile") List<MultipartFile> file,
			@PathVariable(value = "taskId") Long taskId, HttpServletRequest request) throws IOException {

		User currentUser = userService.getCurrentUser(request);

		file.forEach(f -> {
			TaskAttachment taskAttachment = new TaskAttachment();
			taskAttachment.setName(f.getOriginalFilename().substring(0, f.getOriginalFilename().lastIndexOf(".")));
			taskAttachment.setFileExtension(f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."),
					f.getOriginalFilename().length()));
			taskAttachment.setProjectTask(this.projectTaskRepository.findById(taskId).get());
			try {
				taskAttachment.setFile(compressBytes(f.getBytes()));
			} catch (IOException e) {
				e.printStackTrace();
			}
			taskAttachment.setDescription("Uploaded at " + DateFormat.getDateInstance().format(new Date()));
			this.taskService.saveTaskAttachement(taskAttachment, currentUser);
		});

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
