package ro.fii.licenta.api.controller;

import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;
import ro.fii.licenta.api.dao.PersonType;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.LoginDTO;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.exception.InvalidPasswordException;
import ro.fii.licenta.api.exception.UserAlreadyExistAuthenticationException;
import ro.fii.licenta.api.exception.UserNotFoundException;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.service.SecurityService;
import ro.fii.licenta.api.service.UserService;

@RestController
@RequestMapping(path = "/authentication")
public class AuthenticationController {

	@Resource(name = "authenticationManager")
	private AuthenticationManager authManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;
	
	@Autowired
	private SecurityService securityService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/login")
    public String login(HttpServletRequest request, @RequestBody UserDTO userDto) throws NotFoundException, InvalidPasswordException {
    	// TODO sa se verifice parola care vine plain text sa coincida cu ea criptata (vezi tu cum ;))
    	// TODO de actualizat sau nu faill attempts si blocked daca se logheaza gresit
    	// TODO check if user is blocked
        User user = userRepository.findByEmailAddress(userDto.getEmailAddress());
        if (user == null) {
            throw new NotFoundException("This user does not exist.");
        } else 
        	if(user.isBlocked()){
        		throw new InvalidPasswordException("The user has been blocked due to too many wrong password attempts.");
        	}
        		else {
        			if(passwordEncoder.matches( userDto.getPassword(), user.getPassword())) {
                        request.getSession().setAttribute("user", user);
                	} else {
                		user.setFailAttemtps(user.getFailAttemtps()+1);
                		if(user.getFailAttemtps() == 3) {
                			user.setBlocked(true);
                		}
                		userRepository.save(user);
                		throw new InvalidPasswordException("Wrong password.");
                	}
                }

                return request.getSession()
                        .getAttribute("user").toString();
            }

	@GetMapping("/user")
	public String getUser(HttpServletRequest request) {
		request.getSession().getMaxInactiveInterval();
		return request.getSession().getAttribute("user").toString();
	}

	@PostMapping("/register")
	public UserDTO register(HttpServletRequest request, @RequestBody UserDTO userDto)
			throws UserAlreadyExistAuthenticationException {
		// TODO email unic
		// TODO parola criptata
		// TODO setat person type default
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
	
	@PostMapping("/user/resetPassword")
	// gets email and creates token
	// TODO send e-mail with token
	public ResponseEntity<UserDTO> resetPassword(HttpServletRequest request, 
	  @RequestParam("email") String userEmail) throws UserNotFoundException {
	    User user = userService.findUserByEmail(userEmail);
	    if (user == null) {
	        throw new UserNotFoundException("This user does not exist.");
	    }
	    String token = UUID.randomUUID().toString();
	    userService.createPasswordResetTokenForUser(user, token);
//	    mailSender.send(constructResetTokenEmail(getAppUrl(request), 
//	      request.getLocale(), token, user));

		return null;
	}
	
	@PostMapping("/user/changePassword")
	public ResponseEntity<UserDTO> changePassword(HttpServletRequest request, 
			  @RequestParam("token") String token){
		String result = securityService.validatePasswordResetToken(token);
				return null;
		
	}

	@GetMapping("/logout")

	public String logout(HttpServletRequest request) {
		request.getSession().removeAttribute("user");
		return "";
	}
}
