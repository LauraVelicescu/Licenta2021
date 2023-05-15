package ro.fii.licenta.api.repository;

import ro.fii.licenta.api.dao.ProjectPosition;
import ro.fii.licenta.framework.PersistableEntityRepository;

import java.util.List;

public interface ProjectPositionRepository extends PersistableEntityRepository<ProjectPosition, Long> {

    List<ProjectPosition> findByProject_Id(Long project);
}
