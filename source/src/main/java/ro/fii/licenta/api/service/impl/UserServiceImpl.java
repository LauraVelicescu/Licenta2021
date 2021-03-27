package ro.fii.licenta.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ro.fii.licenta.api.dao.PasswordResetToken;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.repository.PasswordTokenRepository;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.service.UserService;

public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordTokenRepository passwordTokenRepository;

	@Override
	public User findUserByEmail(String userEmail) {
		return userRepository.findByEmailAddress(userEmail);
	}

	@Override
	public void createPasswordResetTokenForUser(User user, String token) {
		PasswordResetToken myToken = new PasswordResetToken(token, user);
	    passwordTokenRepository.save(myToken);
		
	}

	@Override
	public User getUserByPasswordResetToken(String token) {
		return passwordTokenRepository.getUserByToken(token);
	}

	@Override
	public void changeUserPassword(User user, String newPassword) {
		user.setPassword(newPassword);
	    userRepository.save(user);		
	}
	
	

}
