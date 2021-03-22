package ro.fii.licenta.api.service;

import ro.fii.licenta.api.dao.User;

public interface UserService {

	User findUserByEmail(String userEmail);

	void createPasswordResetTokenForUser(User user, String token);

}
