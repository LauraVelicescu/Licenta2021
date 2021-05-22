package ro.fii.licenta.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import ro.fii.licenta.api.dao.User;

public interface UserService {

	User findUserByEmail(String userEmail);
	
	User findUserByFirstName(String firstName);

	void createPasswordResetTokenForUser(User user, String token);
	
	User getUserByPasswordResetToken(String token);
	
	void changeUserPassword(User user, String newPassword);
	
	User save(User user);
	
	List<User> findAllUsers(Integer page, Integer pageSize);
	
	User getCurrentUser(HttpServletRequest request);

}
