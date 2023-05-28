package ro.fii.licenta.api.repository;

import ro.fii.licenta.api.dao.TaskHistory;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface TaskHistoryRepository extends PersistableEntityRepository<TaskHistory, Long> {

	void deleteByProjectTask_Id(Long id);
}
