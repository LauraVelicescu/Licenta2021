package ro.fii.licenta.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import ro.fii.licenta.api.dao.Project;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface ProjectRepository extends PersistableEntityRepository<Project, Long> {

	public Page<Project> findAllByNgoYear_Id(Long ngoId, Pageable page);

	public List<Project> findByNgoYear_Ngo_Admin_Id(Long id);

}
