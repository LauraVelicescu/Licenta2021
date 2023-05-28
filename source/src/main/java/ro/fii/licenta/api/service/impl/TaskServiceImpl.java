package ro.fii.licenta.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.ProjectTask;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.repository.ProjectTaskRepository;
import ro.fii.licenta.api.service.TaskHistoryServiceImpl;
import ro.fii.licenta.api.service.TaskService;

public class TaskServiceImpl implements TaskService {

	@Autowired
	ProjectTaskRepository projectTaskRepository;

	@Autowired
	TaskHistoryServiceImpl taskHistoryServiceImpl;

	@Override
	public List<ProjectTask> findProjectTaskByProject(Long projectId) {
		return this.projectTaskRepository.findByProject_Id(projectId);
	}

	@Override
	public void createTask(ProjectTask projectTask, User user) {

		ProjectTask existingProjectTask = this.projectTaskRepository.findByNameAndProject_Id(projectTask.name,
				projectTask.getProject().getId());
		if (existingProjectTask != null) {
			throw new EntityConflictException("There already is a task with the same name");
		}

		this.taskHistoryServiceImpl.createTask(this.projectTaskRepository.save(existingProjectTask), user);
	}

	@Override
	public void updateTask(ProjectTask projectTask, User user) {
		ProjectTask existingProjectTask = this.projectTaskRepository.findByNameAndProject_Id(projectTask.name,
				projectTask.getProject().getId());
		if (existingProjectTask != null && !existingProjectTask.getId().equals(projectTask.getId())) {
			throw new EntityConflictException("There already is a task with the same name");
		}
		this.taskHistoryServiceImpl.update(this.projectTaskRepository.findById(projectTask.getId()).get(), projectTask,
				user);
		this.projectTaskRepository.save(projectTask);
	}

	@Override
	public void deleteTask(Long taskId) {

		this.projectTaskRepository.deleteById(taskId);
	}
}
