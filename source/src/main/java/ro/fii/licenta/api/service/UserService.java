package ro.fii.licenta.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.auth.InvalidCredentialsException;

import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.exception.BusinessException;

public interface UserService {

	User findUserByEmail(String userEmail);
	
	User findUserByFirstName(String firstName);

	void createPasswordResetTokenForUser(User user, String token);
	
	User getUserByPasswordResetToken(String token);
	
	void changeUserPassword(User user, String newPassword);
	
	User save(User user);
	
	List<User> findAllUsers(Integer page, Integer pageSize);
	
	List<String> deleteUser(List<UserDTO> users, User loggedUser);
	
	void blockUsers(List<UserDTO> users) throws BusinessException;
	
	User getCurrentUser(HttpServletRequest request);
	
	String authenticate(String username, String password) throws InvalidCredentialsException ;

}
