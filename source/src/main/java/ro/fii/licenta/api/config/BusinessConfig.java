package ro.fii.licenta.api.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import ro.fii.licenta.api.service.SecurityService;
import ro.fii.licenta.api.service.UserService;
import ro.fii.licenta.api.service.impl.SecurityServiceImpl;
import ro.fii.licenta.api.service.impl.UserServiceImpl;

@Configuration
public class BusinessConfig {

	@Bean
	UserService userService() {
		return new UserServiceImpl();
	}
	
	@Bean
	SecurityService securityService() {
		return new SecurityServiceImpl();
	}
	
	@Bean
	public JavaMailSender getJavaMailSender() {
	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	    mailSender.setHost("smtp.gmail.com");
	    mailSender.setPort(587);
	    
	    mailSender.setUsername("admin@ongmanager.com");
	    mailSender.setPassword("ParolaAdmin1!");
	    
	    Properties props = mailSender.getJavaMailProperties();
	    props.put("mail.transport.protocol", "smtp");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.debug", "true");
	    
	    return mailSender;
	}
}
