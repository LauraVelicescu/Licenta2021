package ro.fii.licenta.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import ro.fii.licenta.api.dao.NgoFunction;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface NgoFunctionRepository extends PersistableEntityRepository<NgoFunction, Long>{
	
	@Query("SELECT nf FROM NgoFunction nf WHERE nf.ngo.id=?1")
	public Page<NgoFunction> findAllByNgoId(Long ngoId, Pageable page);
}
