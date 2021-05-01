package ro.fii.licenta.api.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.Deflater;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	public ResponseEntity<UserDTO> getUser(HttpServletRequest request) throws NotFoundException {

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
	public ResponseEntity<?> updateUserInformation(@RequestBody UserDTO userDTO, HttpServletRequest request)
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

		if (user == null) {
			throw new NotFoundException(String.format("User ith email %s was not found", username));
		}
		modelMapper.getConfiguration().setSkipNullEnabled(true);
		modelMapper.map(userDTO, user);
		modelMapper.getConfiguration().setSkipNullEnabled(false);
		return new ResponseEntity<>(modelMapper.map(userService.save(user), UserDTO.class), HttpStatus.OK);

	}

	@PostMapping(value = "/uploadImage")
	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file, HttpServletRequest request)
			throws IOException {
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

		user.setProfilePicture(compressBytes(file.getBytes()));
		return new ResponseEntity<>(modelMapper.map(userService.save(user), UserDTO.class), HttpStatus.OK);

	}

	// compress the image bytes before storing it in the db

	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {

		}
		return outputStream.toByteArray();

	}

}
