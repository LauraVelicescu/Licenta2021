package ro.fii.licenta.api.exception;

import javax.security.auth.login.LoginException;

public class InvalidPasswordException extends LoginException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidPasswordException (final String msg) {
		super(msg);
	}

}
