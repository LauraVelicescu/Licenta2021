package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.NgoDTO;

public interface NGOService {
	
	Ngo findByName(String name);
	
	Ngo findByAcronym(String acronym);
	
	Ngo findById(int id);
	
	Ngo save (Ngo ngo);

	List<Ngo> findAllNgosByAdmin(Integer pageNo, Integer pageSize, User user);
	
	List<String> deleteNGOs(List<NgoDTO> ngosDtos);
}
