package ro.fii.licenta.framework;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.repository.UserRepository;

@InitializerClass
public class UserInitializer implements Initializer {

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public void initialize() {

		User user = new User();
		
		
		user.setEmailAddress("admin@mango.ro");
		user.setPassword(passwordEncoder.encode("admin"));
		userRepository.save(user);
	}

}
