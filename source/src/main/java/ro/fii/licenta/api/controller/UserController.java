package ro.fii.licenta.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import io.jsonwebtoken.ExpiredJwtException;
import javassist.NotFoundException;
import ro.fii.licenta.api.config.JWTTokenUtil;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private JWTTokenUtil jwtTokenUtil;
	
	@GetMapping(value = "/getUser")
	public ResponseEntity<UserDTO> getUser(HttpServletRequest request) throws NotFoundException{
		
		final String requestTokenHeader = request.getHeader("Authorization");
		
		String username = null;
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		} else {
			System.out.println("JWT Token does not begin with Bearer String");
		}
		User user = userService.findUserByEmail(username);
		
		if (user == null) {
			throw new NotFoundException(String.format("User ith email %s was not found", username));
		}
		return new ResponseEntity<>(modelMapper.map(user, UserDTO.class), HttpStatus.OK);
		
	}
	
	
	@PostMapping(value = "/updateUser")
	public ResponseEntity<?> updateUserInformation(@RequestBody UserDTO userDTO) throws Exception {
		User dbUser = userService.findUserByEmail(userDTO.getEmailAddress());
		if (dbUser != null) {
			modelMapper.map(userDTO, dbUser);
		}
		
		return null;
		
	}


}
