package ro.fii.licenta.framework;

// TODO de gandit un mecanism smecher cu introspectie pt legaturi de tabele
public interface LinkEntity<T1, T2> {

    public T1 getLeft();

    public T2 getRight();
}
