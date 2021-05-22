package ro.fii.licenta.api.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import io.jsonwebtoken.ExpiredJwtException;
import ro.fii.licenta.api.config.JWTTokenUtil;
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
	
	@Autowired
	private JWTTokenUtil jwtTokenUtil;

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
		Date afterAddingThirtyMins = new Date(t + (30 * 60000));
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

	@Override
	public User save(User user) {
		return userRepository.save(user);

	}

	@Override
	public User findUserByFirstName(String firstName) {
		return userRepository.findByFirstName(firstName);
	}

	@Override
	public List<User> findAllUsers(Integer pageNo, Integer pageSize) {
		Pageable page = (pageNo != null && pageSize != null) ? PageRequest.of(pageNo, pageSize) : null;
		return page != null ? userRepository.findAll(page).getContent() : userRepository.findAll();
	}
	
	@Override
	public User getCurrentUser(HttpServletRequest request) {
		final String requestTokenHeader = request.getHeader("Authorization");

		String username = null;
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		} else {
			System.out.println("JWT Token does not begin with Bearer String");
		}
		User user = userRepository.findByEmailAddress(username);
		
		return user;
	}

}
