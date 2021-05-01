package ro.fii.licenta.api.service;

import ro.fii.licenta.api.dao.NGO;

public interface NGOService {
	
	NGO findByName(String name);
	
	NGO findByAcronym(String acronym);
	
	NGO findById(int id);
	
	NGO save (NGO ngo);
}
