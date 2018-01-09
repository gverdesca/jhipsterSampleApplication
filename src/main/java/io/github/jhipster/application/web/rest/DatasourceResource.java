package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Datasource;

import io.github.jhipster.application.repository.DatasourceRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Datasource.
 */
@RestController
@RequestMapping("/api")
public class DatasourceResource {

    private final Logger log = LoggerFactory.getLogger(DatasourceResource.class);

    private static final String ENTITY_NAME = "datasource";

    private final DatasourceRepository datasourceRepository;

    public DatasourceResource(DatasourceRepository datasourceRepository) {
        this.datasourceRepository = datasourceRepository;
    }

    /**
     * POST  /datasources : Create a new datasource.
     *
     * @param datasource the datasource to create
     * @return the ResponseEntity with status 201 (Created) and with body the new datasource, or with status 400 (Bad Request) if the datasource has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/datasources")
    @Timed
    public ResponseEntity<Datasource> createDatasource(@Valid @RequestBody Datasource datasource) throws URISyntaxException {
        log.debug("REST request to save Datasource : {}", datasource);
        if (datasource.getId() != null) {
            throw new BadRequestAlertException("A new datasource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Datasource result = datasourceRepository.save(datasource);
        return ResponseEntity.created(new URI("/api/datasources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /datasources : Updates an existing datasource.
     *
     * @param datasource the datasource to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated datasource,
     * or with status 400 (Bad Request) if the datasource is not valid,
     * or with status 500 (Internal Server Error) if the datasource couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/datasources")
    @Timed
    public ResponseEntity<Datasource> updateDatasource(@Valid @RequestBody Datasource datasource) throws URISyntaxException {
        log.debug("REST request to update Datasource : {}", datasource);
        if (datasource.getId() == null) {
            return createDatasource(datasource);
        }
        Datasource result = datasourceRepository.save(datasource);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, datasource.getId().toString()))
            .body(result);
    }

    /**
     * GET  /datasources : get all the datasources.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of datasources in body
     */
    @GetMapping("/datasources")
    @Timed
    public List<Datasource> getAllDatasources() {
        log.debug("REST request to get all Datasources");
        return datasourceRepository.findAll();
        }

    /**
     * GET  /datasources/:id : get the "id" datasource.
     *
     * @param id the id of the datasource to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the datasource, or with status 404 (Not Found)
     */
    @GetMapping("/datasources/{id}")
    @Timed
    public ResponseEntity<Datasource> getDatasource(@PathVariable Long id) {
        log.debug("REST request to get Datasource : {}", id);
        Datasource datasource = datasourceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(datasource));
    }

    /**
     * DELETE  /datasources/:id : delete the "id" datasource.
     *
     * @param id the id of the datasource to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/datasources/{id}")
    @Timed
    public ResponseEntity<Void> deleteDatasource(@PathVariable Long id) {
        log.debug("REST request to delete Datasource : {}", id);
        datasourceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
