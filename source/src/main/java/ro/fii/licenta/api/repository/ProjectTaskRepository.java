package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.ProjectTask;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface ProjectTaskRepository extends PersistableEntityRepository<ProjectTask, Long> {

	List<ProjectTask> findByProject_Id(Long id);

	ProjectTask findByNameAndProject_Id(String name, Long id);
}
