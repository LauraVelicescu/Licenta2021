package ro.fii.licenta.api.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.ExpiredJwtException;
import ro.fii.licenta.api.config.JWTTokenUtil;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.NgoDTO;
import ro.fii.licenta.api.service.NGOService;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
public class NGOController {
	
	@Autowired
	private NGOService ngoService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private JWTTokenUtil jwtTokenUtil;

	@Autowired
	private UserService userService;
	
	@PostMapping(value = "/createNGO")
	public ResponseEntity<?> createNGO(@RequestBody NgoDTO ngoDTO, HttpServletRequest request)
			throws Exception {
		
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

		Ngo ngo = ngoService.findByName(ngoDTO.getName());

		if (ngo != null) {
			throw new Exception(String.format("This name is already used by another NGO"));
		}
		List<User> admins = new ArrayList<User>();
//		admins = ngo.getAdmins();
		admins.add(user);
		ngoDTO.setAdmins(admins);
		ngo = this.modelMapper.map(ngoDTO, Ngo.class);
		ngo = this.ngoService.save(ngo);
//		modelMapper.getConfiguration().setSkipNullEnabled(true);
//		modelMapper.map(ngoDTO, ngo);
//		modelMapper.getConfiguration().setSkipNullEnabled(false);
		
		return new ResponseEntity<>(modelMapper.map(ngo, NgoDTO.class), HttpStatus.OK);

	}
	
	@GetMapping(value = "/getNGO")
	public ResponseEntity<?> getNGO(HttpServletRequest request){
		return null;
		
	}

}
