package ro.fii.licenta.api.repository;


import ro.fii.licenta.api.dao.PasswordResetToken;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface PasswordTokenRepository extends PersistableEntityRepository<PasswordResetToken, Long>{

	PasswordResetToken findByToken (String token);
	
}
