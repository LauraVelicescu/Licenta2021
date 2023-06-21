package ro.fii.licenta.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import ro.fii.licenta.api.dao.*;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.exception.NotFoundException;
import ro.fii.licenta.api.exception.ValidationException;
import ro.fii.licenta.api.repository.*;
import ro.fii.licenta.api.service.ProjectService;

public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	ProjectPositionRepository projectPositionRepository;

	@Autowired
	ProjectMemberRepository projectMemberRepository;

	@Autowired
	ProjectTaskRepository projectTaskRepository;

	@Autowired
	ProjectExpenseRepository projectExpenseRepository;

	@Autowired
	TaskHistoryRepository taskHistoryRepository;

	@Autowired
	NgoYearRepository ngoYearRepository;

	@Override
	public Project save(Project project) throws ValidationException {
		if (project.getStartDate().after(project.getEndDate())) {
			throw new ValidationException("Start date must be before end date");
		}
		if (project.getNgoYear().getStartDate().after(project.getStartDate())
				|| project.getNgoYear().getEndDate().before(project.getEndDate())) {
			throw new ValidationException("Dates must be in the specified year");
		}

		if (project.getBudgetTreasury() != null) {
			NgoYear ngoYear = this.ngoYearRepository.findById(project.getNgoYear().getId()).get();
			if (project.getBudgetTreasury() > ngoYear.getTreasury()) {
				throw new ValidationException(
						"You can't specify a budged higher than the tereasury for the seleted year");
			}

			if (project.getId() == null) {
				ngoYear.setRemainingTreasury((ngoYear.getTreasury() - project.getBudgetTreasury()));
			} else {
				Project oldProject = this.projectRepository.findById(project.getId()).get();
				ngoYear.setRemainingTreasury(ngoYear.getRemainingTreasury() - (project.getBudgetTreasury()
						- (oldProject.getBudgetTreasury() != null ? oldProject.getBudgetTreasury() : 0)));
			}
			this.ngoYearRepository.save(ngoYear);
			project.setRemainingBudget(project.getBudgetTreasury()
					+ (project.getBudgetPartners() != null ? project.getBudgetPartners() : 0));
		}
		return projectRepository.save(project);
	}

	@Override
	public List<Project> findAllNgoProjects(Integer pageNo, Integer pageSize, Long ngoYearId) {
		Pageable page = (pageNo != null && pageSize != null) ? PageRequest.of(pageNo, pageSize) : null;
		List<Project> ngoProjects = projectRepository.findAllByNgoYear_Id(ngoYearId, page).getContent();

		return ngoProjects;
	}

	@Override
	public List<Project> findAllProjectsByUser(User user) {
		List<ProjectMember> projectMembers = this.projectMemberRepository.findByMember_User_Id(user.getId());
		return projectMembers.stream().map(pm -> pm.getProject()).collect(Collectors.toList());
	}

	@Override
	public Project findById(Long projectId) {
		return projectRepository.findById(projectId).get();
	}

	@Override
	public void deleteProjects(List<Project> projects) {
		for (Project p : projects) {
			projectRepository.delete(p);
		}

	}

	@Override
	public void deleteById(Long id) {

		if (this.projectRepository.existsById(id)) {
			Project existingProject = this.projectRepository.findById(id).get();
			NgoYear ngoYear = this.ngoYearRepository.findById(existingProject.getNgoYear().getId()).get();
			ngoYear.setRemainingTreasury(ngoYear.getRemainingTreasury()
					+ (existingProject.getBudgetTreasury() != null ? existingProject.getBudgetTreasury() : 0));
			this.projectRepository.deleteById(id);
		} else {
			throw new NotFoundException("Project" + id + " does not exist");
		}
	}

	@Override
	public List<ProjectPosition> getProjectPositions(Long projectId) {
		return this.projectPositionRepository.findByProject_Id(projectId);
	}

	@Override
	public ProjectPosition saveProjectPosition(ProjectPosition projectPosition) {
		ProjectPosition existingProjectPosition = this.projectPositionRepository.findByName(projectPosition.name);
		if (existingProjectPosition != null && (existingProjectPosition.getName().equals(projectPosition.getName())
				&& existingProjectPosition.getProject().getId().equals(projectPosition.getProject().getId()))) {
			throw new EntityConflictException("This project position already exists for this project");
		} else {
			return this.projectPositionRepository.save(projectPosition);
		}
	}

	@Override
	public void deleteProjectPosition(Long projectPositionId) {

		if (this.projectPositionRepository.existsById(projectPositionId)) {
			List<ProjectMember> projectMemberList = this.projectMemberRepository.findByProjectPosition_Id(projectPositionId);
			projectMemberList.forEach(pm -> {
				pm.setProjectPosition(null);
				this.projectMemberRepository.save(pm);
			});
			this.projectPositionRepository.deleteById(projectPositionId);
		} else {
			throw new NotFoundException("Project position with id " + projectPositionId + " does not exist");
		}
	}

	@Override
	public List<ProjectMember> findProjectMembers(Long projectId) {

		return this.projectMemberRepository.findByProject_Id(projectId);
	}

	@Override
	public ProjectMember saveProjectMember(ProjectMember projectMember) {
		// TODO Auto-generated method stub
		ProjectMember existingProjectMember = this.projectMemberRepository
				.findByProject_IdAndMember_Id(projectMember.getProject().getId(), projectMember.getMember().getId());

		if (existingProjectMember != null && !existingProjectMember.getId().equals(projectMember.getId())) {
			throw new EntityConflictException("There is already a member on this project with the same user");
		}
		return this.projectMemberRepository.save(projectMember);
	}

	@Override
	public void deleteProjectMember(Long projectMemberId) {
		// TODO Auto-generated method stub

		if (this.projectMemberRepository.existsById(projectMemberId)) {
			List<ProjectTask> tasks = this.projectTaskRepository.findByProjectMember_Id(projectMemberId);
			tasks.forEach(e -> {
				e.setProjectMember(null);
				e.getTaskHistories().forEach(th -> {
					th.setProjectMember(null);
					this.taskHistoryRepository.save(th);
				});
				this.projectTaskRepository.save(e);
			});
			List<ProjectExpense> expenses = this.projectExpenseRepository.findByExpenseOwner_Id(projectMemberId);
			expenses.forEach(e -> {
				e.setExpenseOwner(null);
				this.projectExpenseRepository.save(e);
			});
			this.projectMemberRepository.deleteById(projectMemberId);
		} else {
			throw new NotFoundException("Project member with id " + projectMemberId + " does not exist");
		}
	}
}
