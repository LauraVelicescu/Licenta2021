package ro.fii.licenta.api.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import ro.fii.licenta.api.dao.PasswordResetToken;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.exception.BusinessException;
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
