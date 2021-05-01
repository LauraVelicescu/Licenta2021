package ro.fii.licenta.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.ExpiredJwtException;
import javassist.NotFoundException;
import ro.fii.licenta.api.dao.NGO;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.NGODTO;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.service.NGOService;

@RestController
@CrossOrigin
public class NGOController {
	
	@Autowired
	private NGOService ngoService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping(value = "/createNGO")
	public ResponseEntity<?> createNGO(@RequestBody NGODTO ngoDTO, HttpServletRequest request)
			throws Exception {

		NGO ngo = ngoService.findByName(ngoDTO.getName());

		if (ngo != null) {
			throw new Exception(String.format("This name is already used by another NGO");
		}
		modelMapper.getConfiguration().setSkipNullEnabled(true);
		modelMapper.map(ngoDTO, ngo);
		modelMapper.getConfiguration().setSkipNullEnabled(false);
		return new ResponseEntity<>(modelMapper.map(ngoService.save(ngo), UserDTO.class), HttpStatus.OK);

	}

}
