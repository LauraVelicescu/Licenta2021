package ro.fii.licenta.api.controller;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.framework.PersistableEntity;

@RestController
public abstract class GenericRestController<T extends PersistableEntity> {

	protected JpaRepository<T, Long> repository;

	@Autowired
	private ApplicationContext applicationContext;

	public GenericRestController() {
	}

	@PostConstruct
	@SuppressWarnings("unchecked")
	public void initialize() {
		// Code that uses applicationContext
		ParameterizedType parameterizedType = (ParameterizedType) getClass().getGenericSuperclass();
		Class<T> entityClass = (Class<T>) parameterizedType.getActualTypeArguments()[0];
		repository = (JpaRepository<T, Long>) applicationContext.getBean(entityClass.getSimpleName().toLowerCase() + "Repository");
	}

	@GetMapping("/{id}")
	public ResponseEntity<T> getById(@PathVariable Long id) {
		Optional<T> entity = repository.findById(id);
		if (entity.isPresent()) {
			return ResponseEntity.ok(entity.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public T create(@RequestBody T entity) {
		return repository.save(entity);
	}

	@PutMapping("/{id}")
	public ResponseEntity<T> update(@PathVariable Long id, @RequestBody T entity) {
		if (repository.existsById(id)) {
			entity.setId(id);
			repository.save(entity);
			return ResponseEntity.ok(entity);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping
	public List<T> getAll() {
		return repository.findAll();
	}
}
