package ro.fii.licenta.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.NGO;
import ro.fii.licenta.api.repository.NGORepository;
import ro.fii.licenta.api.service.NGOService;

public class NGOServiceImpl implements NGOService {
	
	@Autowired
	NGORepository ngoRepository;

	@Override
	public NGO findByName(String name) {
		return ngoRepository.findByName(name);
	}

	@Override
	public NGO findByAcronym(String acronym) {
		return ngoRepository.findByAcronym(acronym);
	}

	@Override
	public NGO save(NGO ngo) {
		return ngoRepository.save(ngo);
	}

	@Override
	public NGO findById(int id) {
		return ngoRepository.findById(id);
	}

}
