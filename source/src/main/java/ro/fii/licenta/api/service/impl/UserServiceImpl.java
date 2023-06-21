package ro.fii.licenta.api.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;
import ro.fii.licenta.api.config.JWTTokenUtil;
import ro.fii.licenta.api.dao.PasswordResetToken;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.exception.BusinessException;
import ro.fii.licenta.api.repository.MemberRepository;
import ro.fii.licenta.api.repository.PasswordTokenRepository;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.service.UserService;

public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordTokenRepository passwordTokenRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private JWTTokenUtil jwtTokenUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	public User findUserByEmail(String userEmail) {
		return userRepository.findByEmailAddress(userEmail);
	}

	public String authenticate(String username, String password) throws InvalidCredentialsException {

		return authenticateUser(username, password);

	}
	
	private String authenticateUser(String username, String password) throws InvalidCredentialsException {
		try {
			final UserDetails userDetails = (UserDetails) this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password)).getPrincipal();

			final String token = jwtTokenUtil.generateToken(userDetails);
			return token;
		} catch (DisabledException e) {
			throw new InvalidCredentialsException("USER_DISABLED");
		} catch (BadCredentialsException e) {
			User user = this.userRepository.findByEmailAddress(username);
			if (user != null) {
				user.setFailAttemtps(user.getFailAttemtps() + 1);
				if (user.getFailAttemtps() == 3) {
					user.setBlocked(true);
				}
				this.userRepository.save(user);
			} else {
				throw new InvalidCredentialsException("INVALID_USERNAME");
			}

			throw new InvalidCredentialsException("INVALID_PASSWORD");
		} catch (LockedException e) {
			throw new InvalidCredentialsException("USER_BLOCKED");
		}
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

	@Override
	public List<String> deleteUser(List<UserDTO> users, User loggedUser) {
		List<String> stringToReturn = new ArrayList<String>();

		for (UserDTO userDto : users) {
			try {
				User user = userRepository.findById(userDto.getId())
						.orElseThrow(() -> new BusinessException("user_not_exists"));
				if (user.getAdministeredNGOs().size() != 0) {
					throw new BusinessException("user_own_ong");
				}
				if (user.getId().equals(loggedUser.getId())) {
					throw new BusinessException("user_logged");
				}
				if(this.memberRepository.findByUser_Id(user.getId()).size() != 0) {
					throw new BusinessException("This user is a member of one more more NGOs");
				}
				userRepository.delete(user);
			} catch (BusinessException e) {
				stringToReturn.add(userDto.getEmailAddress() + " " + e.getMessage());
			}
		}

		return stringToReturn;
	}

	@Override
	public void blockUsers(List<UserDTO> users) throws BusinessException {
		for (UserDTO userDto : users) {
			User user = userRepository.findById(userDto.getId())
					.orElseThrow(() -> new BusinessException("user_not_exists"));

			user.setBlocked(!user.isBlocked());
			if (user.isBlocked()) {
				user.setFailAttemtps(3);
			}
			userRepository.save(user);
		}
	}

}
