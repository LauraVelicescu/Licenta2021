package ro.fii.licenta.api.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.NgoDTO;
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

	@Override
	public List<Ngo> findAllNgosByAdmin(Integer pageNo, Integer pageSize, User user) {
		Pageable page = (pageNo != null && pageSize != null) ? PageRequest.of(pageNo, pageSize) : null;
		return page != null ? ngoRepository.findAll(new Specification<Ngo>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Ngo> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.equal(root.get("admin"), user);
			}
		}, page).getContent() : ngoRepository.findAllByAdmin(user);
	}

	@Override
	public List<String> deleteNGOs(List<NgoDTO> ngosDtos) {
		List<String> list = new ArrayList<String>();
		for (NgoDTO n : ngosDtos) {
			Ngo ngo = ngoRepository.findById(n.getId()).get();
			ngoRepository.delete(ngo);
		}
		return list;
	}

}
