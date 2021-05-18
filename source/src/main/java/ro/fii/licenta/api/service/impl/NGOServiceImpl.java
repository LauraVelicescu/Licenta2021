package ro.fii.licenta.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.repository.NGORepository;
import ro.fii.licenta.api.service.NGOService;

public class NGOServiceImpl implements NGOService {
	
	@Autowired
	NGORepository ngoRepository;

	@Override
	public Ngo findByName(String name) {
		return ngoRepository.findByName(name);
	}

	@Override
	public Ngo findByAcronym(String acronym) {
		return ngoRepository.findByAcronym(acronym);
	}

	@Override
	public Ngo save(Ngo ngo) {
		return ngoRepository.save(ngo);
	}

	@Override
	public Ngo findById(int id) {
		return ngoRepository.findById(id);
	}

//	@Override
//	public List<NGO> findAllByUser(int userId) {
//		return ngoRepository.findAllByUser(userId);
//	}

}
