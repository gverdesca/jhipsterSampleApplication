package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TipiWidget;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipiWidget entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipiWidgetRepository extends JpaRepository<TipiWidget, Long> {

}
