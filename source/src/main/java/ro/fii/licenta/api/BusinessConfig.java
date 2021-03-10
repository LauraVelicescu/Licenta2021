package ro.fii.licenta.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ro.fii.licenta.api.service.UserService;
import ro.fii.licenta.api.service.impl.UserServiceImpl;

@Configuration
public class BusinessConfig {

	@Bean
	UserService userService() {
		return new UserServiceImpl();
	}
	}
