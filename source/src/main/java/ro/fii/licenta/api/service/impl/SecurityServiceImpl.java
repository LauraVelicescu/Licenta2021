package ro.fii.licenta.api.service.impl;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.PasswordResetToken;
import ro.fii.licenta.api.repository.PasswordTokenRepository;
import ro.fii.licenta.api.service.SecurityService;

public class SecurityServiceImpl implements SecurityService {
	
	@Autowired
	private PasswordTokenRepository passwordTokenRepository;

	@Override
	public String validatePasswordResetToken(String token) {
		final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

	    return !isTokenFound(passToken) ? "invalidToken"
	            : isTokenExpired(passToken) ? "expired"
	            : null;
	}

	@Override
	public boolean isTokenFound(PasswordResetToken passToken) {
		return passToken != null;
	}
	
	@Override
	public boolean isTokenExpired(PasswordResetToken passToken) {
	    final Calendar cal = Calendar.getInstance();
	    return passToken.getExpiryDate().before(cal.getTime());
	}

}
