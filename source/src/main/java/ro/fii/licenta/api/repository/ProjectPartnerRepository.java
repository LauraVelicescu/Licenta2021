package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.ProjectPartner;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface ProjectPartnerRepository extends PersistableEntityRepository<ProjectPartner, Long> {
	
	ProjectPartner findByProject_IdAndPartner_Id(Long projectId, Long partnerId);
	
	List<ProjectPartner> findByProject_Id(Long id);
}
