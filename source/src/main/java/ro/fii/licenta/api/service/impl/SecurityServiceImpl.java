package ro.fii.licenta.api.service.impl;

import java.util.Calendar;

import ro.fii.licenta.api.dao.PasswordResetToken;
import ro.fii.licenta.api.repository.PasswordTokenRepository;
import ro.fii.licenta.api.service.SecurityService;

public class SecurityServiceImpl implements SecurityService {
	
	private PasswordTokenRepository passwordTokenRepository;

	@Override
	public String validatePasswordResetToken(String token) {
		final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

	    return !isTokenFound(passToken) ? "invalidToken"
	            : isTokenExpired(passToken) ? "expired"
	            : null;
	}

	private boolean isTokenFound(PasswordResetToken passToken) {
		return passToken != null;
	}
	
	private boolean isTokenExpired(PasswordResetToken passToken) {
	    final Calendar cal = Calendar.getInstance();
	    return passToken.getExpiryDate().before(cal.getTime());
	}

}
