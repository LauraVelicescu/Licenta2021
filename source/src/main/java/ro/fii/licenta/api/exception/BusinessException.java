package ro.fii.licenta.api.exception;

public class BusinessException extends Exception {
	private static final long serialVersionUID = 1L;

	public BusinessException(final String msg) {
		super(msg);
	}

}
