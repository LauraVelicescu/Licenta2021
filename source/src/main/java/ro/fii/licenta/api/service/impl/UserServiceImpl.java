package ro.fii.licenta.api.service.impl;

import ro.fii.licenta.api.dao.PasswordResetToken;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.repository.PasswordTokenRepository;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.service.UserService;

public class UserServiceImpl implements UserService {
	
	private UserRepository userRepository;
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

}
