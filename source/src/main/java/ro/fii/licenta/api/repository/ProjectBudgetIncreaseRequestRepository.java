package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.ProjectBudgetIncreaseRequest;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface ProjectBudgetIncreaseRequestRepository
		extends PersistableEntityRepository<ProjectBudgetIncreaseRequest, Long> {

	List<ProjectBudgetIncreaseRequest> findByProject_Id(Long id);
}
