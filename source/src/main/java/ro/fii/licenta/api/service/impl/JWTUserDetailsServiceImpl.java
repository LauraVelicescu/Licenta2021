package ro.fii.licenta.api.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.repository.UserRepository;

@Service

public class JWTUserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User existingUser = userRepository.findByEmailAddress(username);
		if (existingUser == null) {
			throw new UsernameNotFoundException("User not found with e-mail address: " + username);
		}
		return new org.springframework.security.core.userdetails.User(existingUser.getEmailAddress(),
				existingUser.getPassword(), true, true, true, !existingUser.isBlocked(), new ArrayList<>());
	}
}
