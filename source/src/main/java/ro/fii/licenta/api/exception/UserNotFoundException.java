package ro.fii.licenta.api.exception;

public class UserNotFoundException extends Exception {
	private static final long serialVersionUID = 1L;

	public UserNotFoundException(final String msg) {
		super(msg);
	}

}