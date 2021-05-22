package ro.fii.licenta.api.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.jsonwebtoken.ExpiredJwtException;
import javassist.NotFoundException;
import ro.fii.licenta.api.config.JWTTokenUtil;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.exception.BusinessException;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(path = "/user")
public class UserController {

	// TODO DE MUTAT TOT IN SERVICE gen de mut

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

	@GetMapping(value = "/findUsers")
	public ResponseEntity<List<UserDTO>> findUsers(@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo) {
		List<UserDTO> users = new ArrayList<UserDTO>();
		userService.findAllUsers(page, pageNo).forEach(e -> {
			users.add(modelMapper.map(e, UserDTO.class));
		});
		return ResponseEntity.ok(users);
	}

	@GetMapping(value = "/findUsers/count")
	public ResponseEntity<Integer> findUsersCount() {
		return ResponseEntity.ok(userService.findAllUsers(null, null).size());
	}

	@PostMapping(value = "/updateUser")
	public ResponseEntity<?> updateUserInformation(@RequestBody UserDTO userDTO, HttpServletRequest request)
			throws Exception {
		User user = userService.findUserByEmail(userDTO.getEmailAddress());

		if (user == null) {
			throw new NotFoundException(String.format("User ith email %s was not found", userDTO.getEmailAddress()));
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

	@PostMapping(value = "/delete")
	public ResponseEntity<List<String>> deleteUsers(@RequestBody List<UserDTO> usersDTO,  HttpServletRequest request) {
		final String requestTokenHeader = request.getHeader("Authorization");

		String username = null;
		String jwtToken = null;
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
		List<String> errors = this.userService.deleteUser(usersDTO, user);
		return ResponseEntity.ok(errors);
	}
	
	
	@PostMapping(value = "/block")
	public void blockUsers(@RequestBody List<UserDTO> usersDTO) throws BusinessException {
		userService.blockUsers(usersDTO);
	}

}
