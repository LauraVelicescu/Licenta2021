package ro.fii.licenta.api.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dao.ProjectMember;
import ro.fii.licenta.api.dao.ProjectPosition;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.exception.NotFoundException;
import ro.fii.licenta.api.exception.ValidationException;
import ro.fii.licenta.api.repository.ProjectMemberRepository;
import ro.fii.licenta.api.repository.ProjectPositionRepository;
import ro.fii.licenta.api.repository.ProjectRepository;
import ro.fii.licenta.api.service.ProjectService;

public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	ProjectPositionRepository projectPositionRepository;

	@Autowired
	ProjectMemberRepository projectMemberRepository;

	@Override
	public Project save(Project project) throws ValidationException {
		if (project.getStartDate().after(project.getEndDate())) {
			throw new ValidationException("Start date must be before end date");
		}
		if (project.getNgoYear().getStartDate().after(project.getStartDate())
				|| project.getNgoYear().getEndDate().before(project.getEndDate())) {
			throw new ValidationException("Dates must be in the specified year");
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
			this.projectMemberRepository.deleteById(projectMemberId);
		} else {
			throw new NotFoundException("Project member with id " + projectMemberId + " does not exist");
		}
	}
}
