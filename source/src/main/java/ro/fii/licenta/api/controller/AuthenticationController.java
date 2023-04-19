package ro.fii.licenta.api.controller;

import java.util.Locale;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.api.dao.PersonType;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.JwtRequest;
import ro.fii.licenta.api.dto.JwtResponse;
import ro.fii.licenta.api.dto.PasswordDTO;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.exception.BusinessException;
import ro.fii.licenta.api.exception.UserAlreadyExistAuthenticationException;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.service.SecurityService;
import ro.fii.licenta.api.service.UserService;

@RestController
@RequestMapping(path = "/authenticate")
public class AuthenticationController {

	@Resource(name = "authenticationManagerBean")
	private AuthenticationManager authManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private UserService userService;

	@Autowired
	private SecurityService securityService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping(value = "/login")
	public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		final String token = this.userService.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping("/register")
	public UserDTO register(HttpServletRequest request, @RequestBody UserDTO userDto)
			throws UserAlreadyExistAuthenticationException {
		System.out.println(userDto);

		User user = this.modelMapper.map(userDto, User.class);
		User dbUser = this.userRepository.findByEmailAddress(user.getEmailAddress());
		if (dbUser == null) {
			user.setPassword(passwordEncoder.encode(userDto.getPassword()));
			user.setPersonType(PersonType.NORMAL);
			user = this.userRepository.save(user);
			return this.modelMapper.map(user, UserDTO.class);
		} else {
			throw new UserAlreadyExistAuthenticationException("This user already exists.");
		}

	}

	@PostMapping("/resetPassword")
	// gets email and creates token
	// TODO send e-mail with token
	public UserDTO resetPassword(HttpServletRequest request, @RequestBody UserDTO userDto) throws BusinessException {
		User user = userService.findUserByEmail(userDto.getEmailAddress());
		if (user == null) {
			throw new BusinessException("This user does not exist.");
		}
		String token = UUID.randomUUID().toString();
		userService.createPasswordResetTokenForUser(user, token);
		mailSender.send(constructResetTokenEmail(getAppUrl(request), request.getLocale(), token, user));

		return this.modelMapper.map(user, UserDTO.class);
	}

	private String getAppUrl(HttpServletRequest request) {
		return "http://localhost:4200/auth/changePassword";
	}

	@GetMapping("/changePassword")
	public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestParam("token") String token)
			throws Exception {
		String result = securityService.validatePasswordResetToken(token);
		if (result != null) {
			throw new Exception("Invalid token.");
		} else {
			return ResponseEntity.ok().build();
		}
	}

	@PostMapping("/savePassword")
	public void savePassword(HttpServletRequest request, @RequestBody PasswordDTO passwordDto) throws Exception {

		String result = securityService.validatePasswordResetToken(passwordDto.getToken());
		System.out.print(false);

		if (result != null) {
			throw new Exception("Password reset unsuccesful.");
		}

		User user = userService.getUserByPasswordResetToken(passwordDto.getToken());
		if (user != null) {
			userService.changeUserPassword(user, passwordEncoder.encode(passwordDto.getNewPassword()));
		} else {
			throw new BusinessException("This user does not exist.");
		}
	}

	private SimpleMailMessage constructResetTokenEmail(String contextPath, Locale locale, String token, User user) {
		String url = contextPath + "?token=" + token;
		String message = "Reset password link:";
		return constructEmail("Reset Password", message + " \r\n" + url, user);
	}

	private SimpleMailMessage constructEmail(String subject, String body, User user) {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setSubject(subject);
		email.setText(body);
		email.setTo(user.getEmailAddress());
		email.setFrom("admin@ongmanager.com");
		return email;
	}
}
