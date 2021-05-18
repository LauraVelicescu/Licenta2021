package ro.fii.licenta.framework;

public interface IntitializeEntryRepository extends PersistableEntityRepository<InitializeEntry, Long>{

	InitializeEntry findByName(String name);
}
