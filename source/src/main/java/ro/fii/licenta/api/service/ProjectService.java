package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.Project;

public interface ProjectService {
	
	Project save(Project project);

	List<Project> findAllNgoProjects(Integer pageNo, Integer pageSize, Long ngoId );
	
	Project findById(Long projectId);
	
	void deleteProjects(List<Project> projects);
	
	void deleteById(Long id);
}
