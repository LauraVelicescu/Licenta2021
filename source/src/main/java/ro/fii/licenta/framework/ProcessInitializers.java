package ro.fii.licenta.framework;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.Advised;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

@Component
public class ProcessInitializers implements ApplicationListener<ApplicationReadyEvent> {

	@Autowired
	ApplicationContext applicationContext;

	@Autowired
	IntitializeEntryRepository intitializeEntryRepository;

	private static final Logger LOG = LoggerFactory.getLogger(ProcessInitializers.class);

	@Override
	public void onApplicationEvent(ApplicationReadyEvent event) {

		String[] beanNames = applicationContext.getBeanNamesForAnnotation(InitializerClass.class);
		List<InitializeEntry> classez = new ArrayList<InitializeEntry>();
		for (String beanName : beanNames) {
			InitializeEntry initializeEntry = new InitializeEntry();
			Object bean = applicationContext.getBean(beanName);
			initializeEntry.setName(beanName);
			initializeEntry.setExecutionTime(new Date());
			initializeEntry.setBean(bean);
			Class<?> beanClass = getConfigurerClass(bean);
			initializeEntry.setClazz(beanClass);
			if (!Initializer.class.isAssignableFrom(beanClass)) {
				LOG.debug("Initializoatorul nu implementeaza interfata Initializer");
				return;
			}
			classez.add(initializeEntry);

		}

		classez = classez.stream().sorted(new Comparator<InitializeEntry>() {

			@Override
			public int compare(InitializeEntry o1, InitializeEntry o2) {
				int order1 = o1.getClazz().getAnnotation(InitializerClass.class).order();
				int order2 = o2.getClazz().getAnnotation(InitializerClass.class).order();
				return order1 > order2 ? 1 : -1;
			}
		}).collect(Collectors.toList());

		for (InitializeEntry clazz : classez) {
			try {
				String className = clazz.getName();
				InitializeEntry initializeEntry = this.intitializeEntryRepository.findByName(className);
				if (initializeEntry == null) {
					ReflectionUtils.invokeMethod(
							clazz.getClazz().getMethod(Initializer.class.getMethods()[0].getName()), clazz.getBean());
					intitializeEntryRepository.save(clazz);
				}

			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			}
		}

	}

	private Class<?> getConfigurerClass(Object bean) {
		if (bean instanceof Advised)
			return ((Advised) bean).getTargetClass();
		else
			return bean.getClass();
	}

}
