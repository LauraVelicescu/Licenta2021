package ro.fii.licenta.api.service;

import ro.fii.licenta.api.dao.Ngo;

public interface NGOService {
	
	Ngo findByName(String name);
	
	Ngo findByAcronym(String acronym);
	
	Ngo findById(int id);
	
	Ngo save (Ngo ngo);
	
//	List<NGO> findAllByUser(int userId);
}
