package ro.fii.licenta.api.service.impl;

import java.util.Calendar;
import java.util.Date;

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
		// TODO de verificat daca exista token
		PasswordResetToken myToken = new PasswordResetToken();
		myToken.setUser(user);
		myToken.setToken(token);
		Calendar date = Calendar.getInstance();
		long t = date.getTimeInMillis();
		Date afterAddingThirtyMins=new Date(t + (30 * 60000));
		myToken.setExpiryDate(afterAddingThirtyMins);
	    passwordTokenRepository.save(myToken);
		
	}

	@Override
	public User getUserByPasswordResetToken(String token) {
		return passwordTokenRepository.findByToken(token).getUser();
	}

	@Override
	public void changeUserPassword(User user, String newPassword) {
		user.setPassword(newPassword);
	    userRepository.save(user);		
	}
	
	
	

}
