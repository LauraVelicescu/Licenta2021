package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dao.ProjectMember;
import ro.fii.licenta.api.dao.ProjectPosition;
import ro.fii.licenta.api.exception.ValidationException;

public interface ProjectService {
	
	Project save(Project project) throws ValidationException;

	List<Project> findAllNgoProjects(Integer pageNo, Integer pageSize, Long ngoId );
	
	Project findById(Long projectId);
	
	void deleteProjects(List<Project> projects);
	
	void deleteById(Long id);
	List<ProjectPosition> getProjectPositions(Long projectId);
	ProjectPosition saveProjectPosition(ProjectPosition projectPosition);

	void deleteProjectPosition(Long projectPositionId);
	
	List<ProjectMember> findProjectMembers(Long projectId);
	
	ProjectMember saveProjectMember(ProjectMember projectMember);
	
	void deleteProjectMember(Long projectMemberId);
}
