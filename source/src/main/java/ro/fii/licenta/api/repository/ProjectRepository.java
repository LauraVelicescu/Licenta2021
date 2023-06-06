package ro.fii.licenta.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface ProjectRepository extends PersistableEntityRepository<Project, Long> {

	@Query("SELECT p FROM Project p WHERE p.ngo.id=?1")
	public Page<Project> findAllByNgoId(Long ngoId, Pageable page);
	
	public List<Project> findByNgo_Admin_Id(Long id);

}
