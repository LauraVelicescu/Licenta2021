package ro.fii.licenta.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface NGORepository extends PersistableEntityRepository<Ngo, Long> {

	Ngo findByName(String name);

	Ngo findByAcronym(String acronym);

	Ngo findById(int id);
	
	List<Ngo> findAllByAdmin(User user);
	
	Page<Ngo> findByIdNotIn(List<Long> memberIds, Pageable page);
	
}
