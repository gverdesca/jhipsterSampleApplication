package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Ind12Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ind12Query entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Ind12QueryRepository extends JpaRepository<Ind12Query, Long> {

}
