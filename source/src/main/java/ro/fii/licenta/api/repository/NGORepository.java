package ro.fii.licenta.api.repository;

import ro.fii.licenta.api.dao.NGO;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface NGORepository extends PersistableEntityRepository<NGO, Long>{
	NGO findByName(String name);
	NGO findByAcronym(String acronym);
	NGO findById(int id);
}
