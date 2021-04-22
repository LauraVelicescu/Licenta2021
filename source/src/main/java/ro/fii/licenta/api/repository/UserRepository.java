package ro.fii.licenta.api.repository;


import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface UserRepository extends PersistableEntityRepository<User, Long> {

	User findByEmailAddress(String emailAddress);
	
	User findByFirstName(String firstName);
}