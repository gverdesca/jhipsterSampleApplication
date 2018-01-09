package io.github.jhipster.application.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ba11Dsh.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ba11Dsh.class.getName() + ".widgets", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Datasource.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Datasource.class.getName() + ".queries", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ba10Menu.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ba10Menu.class.getName() + ".childs", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.MondrianDs.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ba01Utente.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ba00Entita.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ba12Widget.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.TipiWidget.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.WidgetImpl.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ind12Query.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ind12Query.class.getName() + ".widgets", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ind01Indic.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ind04Classif.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ind02Std.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.IndicValu.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.IndicValInt.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Obiettivi.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Obiettivi.class.getName() + ".obi01ObiettiviIndics", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ObiettiviInd.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ObiettiviInd.class.getName() + ".obi02IndicValuses", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ObiettiviInd.class.getName() + ".obi03IndicValuInters", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
