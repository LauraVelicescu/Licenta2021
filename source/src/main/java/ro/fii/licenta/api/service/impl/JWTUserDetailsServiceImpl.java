package ro.fii.licenta.api.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.repository.UserRepository;


@Service
public class JWTUserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmailAddress(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with e-mail address: "  + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getEmailAddress(), user.getPassword(),
				new ArrayList<>());
	}
	
	public User save(UserDTO user) {
		User newUser = new User();
		newUser.setEmailAddress(user.getEmailAddress());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userRepository.save(newUser);
	}
	
}


