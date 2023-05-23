package ro.fii.licenta.api.service;

import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dao.ProjectPosition;
import ro.fii.licenta.api.exception.ValidationException;

import java.util.List;

public interface ProjectService {
	
	Project save(Project project) throws ValidationException;

	List<Project> findAllNgoProjects(Integer pageNo, Integer pageSize, Long ngoId );
	
	Project findById(Long projectId);
	
	void deleteProjects(List<Project> projects);
	
	void deleteById(Long id);
	List<ProjectPosition> getProjectPositions(Long projectId);
	ProjectPosition saveProjectPosition(ProjectPosition projectPosition);

	void deleteProjectPosition(Long projectPositionId);
}
