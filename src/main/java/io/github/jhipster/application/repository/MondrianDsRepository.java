package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MondrianDs;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MondrianDs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MondrianDsRepository extends JpaRepository<MondrianDs, Long> {

}
