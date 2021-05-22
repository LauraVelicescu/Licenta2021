package ro.fii.licenta.api.service;

import org.springframework.mail.SimpleMailMessage;

import ro.fii.licenta.api.dao.User;

public interface MailingService {
	
	SimpleMailMessage constructEmail(String subject, String body, User user);

}
