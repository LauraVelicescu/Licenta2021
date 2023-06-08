package ro.fii.licenta.api.repository;

import ro.fii.licenta.api.dao.NgoYear;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface NgoYearRepository extends PersistableEntityRepository<NgoYear, Long> {

	NgoYear findByNameAndNgo_Id(String name, Long id);

}
