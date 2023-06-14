package ro.fii.licenta.api.service.impl;

import org.springframework.mail.SimpleMailMessage;

import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.service.MailingService;

public class MailingServiceImpl implements MailingService {

	@Override
	public SimpleMailMessage constructEmail(String subject, String body, User user) {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setSubject(subject);
		email.setText(body);
		email.setTo(user.getEmailAddress());
		email.setFrom("mangongoadm@gmail.com");
		return email;
	}

}
