package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Datasource;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Datasource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DatasourceRepository extends JpaRepository<Datasource, Long> {

}
