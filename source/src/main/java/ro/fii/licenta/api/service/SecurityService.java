package ro.fii.licenta.api.service;

public interface SecurityService {

	String validatePasswordResetToken(String token);

}
