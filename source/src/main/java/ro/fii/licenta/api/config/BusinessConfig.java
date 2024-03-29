package ro.fii.licenta.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import ro.fii.licenta.api.service.MailingService;
import ro.fii.licenta.api.service.MemberService;
import ro.fii.licenta.api.service.NGOService;
import ro.fii.licenta.api.service.ProjectService;
import ro.fii.licenta.api.service.SecurityService;
import ro.fii.licenta.api.service.TaskService;
import ro.fii.licenta.api.service.UserService;
import ro.fii.licenta.api.service.impl.MailingServiceImpl;
import ro.fii.licenta.api.service.impl.MemberServiceImpl;
import ro.fii.licenta.api.service.impl.NGOServiceImpl;
import ro.fii.licenta.api.service.impl.ProjectServiceImpl;
import ro.fii.licenta.api.service.impl.SecurityServiceImpl;
import ro.fii.licenta.api.service.impl.TaskServiceImpl;
import ro.fii.licenta.api.service.impl.UserServiceImpl;

@Configuration
public class BusinessConfig {

	@Autowired
	Environment env;
	
	@Bean
	UserService userService() {
		return new UserServiceImpl();
	}
	
	@Bean
	SecurityService securityService() {
		return new SecurityServiceImpl();
	}
	
	@Bean
	NGOService ngoService() {
		return new NGOServiceImpl();
	}
	
	@Bean
	MailingService mailService() {
		return new MailingServiceImpl();
	}
	
	@Bean
	MemberService memberService() {
		return new MemberServiceImpl();
	}
	
	@Bean
	ProjectService projectService() {
		return new ProjectServiceImpl();
	}
	
	@Bean
	TaskService taskService() {
		return new TaskServiceImpl();
	}
	
//	@Bean
//	public JavaMailSender getJavaMailSender() {
//	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//	    mailSender.setHost("smtp.gmail.com");
//	    mailSender.setPort(587);
//	    
////	    mailSender.setUsername("admin@ongmanager.com");
////	    mailSender.setPassword("ParolaAdmin1!");
//	    
//	    Properties props = mailSender.getJavaMailProperties();
//	    props.put("mail.transport.protocol", "smtp");
//	    props.put("mail.smtp.auth", "true");
//	    props.put("mail.smtp.starttls.enable", "true");
//	    props.put("mail.debug", "true");
//	    
//	    return mailSender;
//	}
}
