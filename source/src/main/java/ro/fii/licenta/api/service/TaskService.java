package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.ProjectTask;
import ro.fii.licenta.api.dao.TaskAttachment;
import ro.fii.licenta.api.dao.TaskHistory;
import ro.fii.licenta.api.dao.User;

public interface TaskService {

	public List<ProjectTask> findProjectTaskByProject(Long projectId);

	public List<TaskAttachment> findAttachmentByTask(Long taskId);

	public void createTask(ProjectTask projectTask, User user);

	public void updateTask(ProjectTask projectTask, User user);

	public void deleteTask(Long taskId);

	public void deleteAttachment(Long attachmentId);

	public void saveTaskAttachement(TaskAttachment attachment, User user);

	public List<TaskHistory> findHistoryByTask(Long taskId);

	public void saveChatHistory(String message, Long taskId);
}
