package ro.fii.licenta.api.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.fii.licenta.api.dao.ProjectMember;
import ro.fii.licenta.api.dao.ProjectTask;
import ro.fii.licenta.api.dao.TaskHistory;
import ro.fii.licenta.api.dao.TaskStatus;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.repository.ProjectMemberRepository;
import ro.fii.licenta.api.repository.TaskHistoryRepository;

@Service
public class TaskHistoryServiceImpl {

	@Autowired
	TaskHistoryRepository taskHistoryRepository;

	@Autowired
	ProjectMemberRepository projectMemberRepository;

	private static final String CREATE = "CREATE_TASK_HISTORY";
	private static final String UPDATE = "UPDATE_TASK_HISTORY";

	public void createTask(ProjectTask projectTask, User user) {
		TaskHistory taskHistory = new TaskHistory();
		taskHistory.setCurrentStatus(TaskStatus.TO_DO);
		taskHistory.setPreviousStatus(null);
		taskHistory.setDate(new Date());
		taskHistory.setName(CREATE);
		taskHistory.setProjectTask(projectTask);
		taskHistory.setProjectMember(this.projectMemberRepository
				.findByProject_IdAndMember_User_Id(projectTask.getProject().getId(), user.getId()));
		taskHistory.setDescription("Create new task for project " + projectTask.getProject().getName() + " by "
				+ user.getFirstName() + " " + user.getLastName() + " and put it in TO DO");
		taskHistoryRepository.save(taskHistory);
	}

	public void update(ProjectTask oldProjectTask, ProjectTask newProjectTask, User user) {
		TaskHistory taskHistory = new TaskHistory();
		taskHistory.setDate(new Date());
		taskHistory.setName(UPDATE);
		taskHistory.setProjectTask(newProjectTask);
		taskHistory.setProjectMember(this.projectMemberRepository
				.findByProject_IdAndMember_User_Id(newProjectTask.getProject().getId(), user.getId()));
		StringBuilder sb = new StringBuilder();
		sb.append("Update task " + newProjectTask.getName() + " with the following updates: ");
		if (!newProjectTask.getName().equals(oldProjectTask.getName())) {
			sb.append("name from ").append(oldProjectTask.getName()).append(" to ").append(newProjectTask.getName())
					.append(" ");
		}

		if (!newProjectTask.getDescription().equals(oldProjectTask.getDescription())) {
			sb.append("description from ").append(oldProjectTask.getDescription()).append(" to ")
					.append(newProjectTask.getDescription()).append(" ");
		}

		if (!newProjectTask.getDeadline().equals(oldProjectTask.getDeadline())) {
			sb.append("deadline from ").append(oldProjectTask.getDeadline()).append(" to ")
					.append(newProjectTask.getDeadline()).append(" ");
		}

		if (!newProjectTask.getCreatedDate().equals(oldProjectTask.getCreatedDate())) {
			sb.append("created date from ").append(oldProjectTask.getCreatedDate()).append(" to ")
					.append(newProjectTask.getCreatedDate()).append(" ");
		}

		if (!newProjectTask.getTaskStatus().equals(oldProjectTask.getTaskStatus())) {
			sb.append("status from ").append(oldProjectTask.getTaskStatus()).append(" to ")
					.append(newProjectTask.getTaskStatus()).append(" ");
			taskHistory.setPreviousStatus(oldProjectTask.getTaskStatus());
			taskHistory.setCurrentStatus(newProjectTask.getTaskStatus());
		}

		if (!newProjectTask.getProjectMember().getId().equals(oldProjectTask.getProjectMember().getId())) {
			sb.append("project member from ").append(this.getNameFromProjectMember(oldProjectTask.getProjectMember()))
					.append(" to ").append(this.getNameFromProjectMember(newProjectTask.getProjectMember()))
					.append(" ");
		}
		taskHistory.setDescription(sb.toString());
		taskHistoryRepository.save(taskHistory);
	}

	public void deleteHistoryForTaskId(Long taskId) {
		this.taskHistoryRepository.deleteByProjectTask_Id(taskId);
	}

	private String getNameFromProjectMember(ProjectMember projectMember) {
		if (projectMember == null) {
			return "";
		} else {
			return projectMember.getMember().getUser().getFirstName() + " "
					+ projectMember.getMember().getUser().getLastName();
		}
	}
}
