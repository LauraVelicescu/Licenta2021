package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.ProjectExpense;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface ProjectExpenseRepository extends PersistableEntityRepository<ProjectExpense, Long>{

	List<ProjectExpense> findByProject_Id(Long id);
}
