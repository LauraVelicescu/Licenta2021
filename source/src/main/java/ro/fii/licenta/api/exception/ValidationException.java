package ro.fii.licenta.api.exception;

public class ValidationException extends Exception {

	private static final long serialVersionUID = 1L;

	
	public ValidationException(final String msg) {
		super(msg);
	}
}
