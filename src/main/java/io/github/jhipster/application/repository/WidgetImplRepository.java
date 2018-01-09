package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.WidgetImpl;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WidgetImpl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WidgetImplRepository extends JpaRepository<WidgetImpl, Long> {

}
