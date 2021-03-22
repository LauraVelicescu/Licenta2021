package ro.fii.licenta.api.exception;

import javax.naming.AuthenticationException;

public class UserAlreadyExistAuthenticationException extends AuthenticationException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistAuthenticationException(final String msg) {
		super(msg);
	}

}
