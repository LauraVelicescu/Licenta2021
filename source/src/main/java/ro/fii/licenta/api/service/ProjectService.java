package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.NgoFunction;
import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.dto.ProjectDTO;

public interface ProjectService {
	
	Project save(Project project);

	List<Project> findAllNgoProjects(Integer pageNo, Integer pageSize, Long ngoId );
	
	Project findById(Long projectId);
	
	void deleteProjects(List<Project> projects);
}
