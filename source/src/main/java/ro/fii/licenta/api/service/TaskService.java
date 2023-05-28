package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.ProjectTask;
import ro.fii.licenta.api.dao.User;

public interface TaskService {

	public List<ProjectTask> findProjectTaskByProject(Long projectId);

	public void createTask(ProjectTask projectTask, User user);

	public void updateTask(ProjectTask projectTask, User user);

	public void deleteTask(Long taskId);
}
