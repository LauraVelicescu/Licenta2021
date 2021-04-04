package ro.fii.licenta.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.api.config.JWTTokenUtil;
import ro.fii.licenta.api.dto.JwtRequest;
import ro.fii.licenta.api.dto.JwtResponse;
import ro.fii.licenta.api.service.impl.JWTUserDetailsServiceImpl;

@RestController
@CrossOrigin
public class JWTAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManagerBean;

	@Autowired
	private JWTTokenUtil jwtTokenUtil;

	@Autowired
	private JWTUserDetailsServiceImpl userDetailsService;

	@PostMapping(value = "/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		System.out.println(jwtRequest.getUsername() + ' ' + jwtRequest.getPassword());
		authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(jwtRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManagerBean.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
}