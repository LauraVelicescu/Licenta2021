package ro.fii.licenta.api.repository;

import ro.fii.licenta.api.dao.NgoPartnersType;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface NgoPartnersTypeRepository extends PersistableEntityRepository<NgoPartnersType, Long> {

	NgoPartnersType findByName(String name);
}
