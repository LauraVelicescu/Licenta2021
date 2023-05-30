package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.TaskAttachment;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface TaskAttachmentRepository extends PersistableEntityRepository<TaskAttachment, Long>{

	List<TaskAttachment> findByProjectTask_Id(Long id);
}
