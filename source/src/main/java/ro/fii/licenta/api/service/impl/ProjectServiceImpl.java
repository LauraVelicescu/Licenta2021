package ro.fii.licenta.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.api.exception.NotFoundException;
import ro.fii.licenta.api.repository.ProjectRepository;
import ro.fii.licenta.api.service.ProjectService;

public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectRepository projectRepository;

	@Override
	public Project save(Project project) {
		return projectRepository.save(project);
	}

	@Override
	public List<Project> findAllNgoProjects(Integer pageNo, Integer pageSize, Long ngoId) {
		Pageable page = (pageNo != null && pageSize != null) ? PageRequest.of(pageNo, pageSize) : null;
		List<Project> ngoProjects = projectRepository.findAllByNgoId(ngoId, page).getContent();

		return ngoProjects;
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

}
