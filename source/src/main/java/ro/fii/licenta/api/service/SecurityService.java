package ro.fii.licenta.api.service;

import ro.fii.licenta.api.dao.PasswordResetToken;

public interface SecurityService {

	String validatePasswordResetToken(String token);
	
	boolean isTokenFound(PasswordResetToken passToken);
	
	boolean isTokenExpired(PasswordResetToken passToken);

}
