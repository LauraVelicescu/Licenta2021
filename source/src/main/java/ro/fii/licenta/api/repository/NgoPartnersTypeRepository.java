package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.NgoPartnersType;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface NgoPartnersTypeRepository extends PersistableEntityRepository<NgoPartnersType, Long> {

	NgoPartnersType findByNameAndNgo_Id(String name, Long id);
	
	List<NgoPartnersType> findByNgo_Id(Long id);
}
