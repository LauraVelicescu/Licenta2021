package ro.fii.licenta.api.repository;

import ro.fii.licenta.api.dao.Partner;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface PartnerRepository extends PersistableEntityRepository<Partner, Long>{

	Partner findByName(String name);
}
