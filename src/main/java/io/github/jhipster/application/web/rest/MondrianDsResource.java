package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.MondrianDs;

import io.github.jhipster.application.repository.MondrianDsRepository;
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
 * REST controller for managing MondrianDs.
 */
@RestController
@RequestMapping("/api")
public class MondrianDsResource {

    private final Logger log = LoggerFactory.getLogger(MondrianDsResource.class);

    private static final String ENTITY_NAME = "mondrianDs";

    private final MondrianDsRepository mondrianDsRepository;

    public MondrianDsResource(MondrianDsRepository mondrianDsRepository) {
        this.mondrianDsRepository = mondrianDsRepository;
    }

    /**
     * POST  /mondrian-ds : Create a new mondrianDs.
     *
     * @param mondrianDs the mondrianDs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mondrianDs, or with status 400 (Bad Request) if the mondrianDs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mondrian-ds")
    @Timed
    public ResponseEntity<MondrianDs> createMondrianDs(@Valid @RequestBody MondrianDs mondrianDs) throws URISyntaxException {
        log.debug("REST request to save MondrianDs : {}", mondrianDs);
        if (mondrianDs.getId() != null) {
            throw new BadRequestAlertException("A new mondrianDs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MondrianDs result = mondrianDsRepository.save(mondrianDs);
        return ResponseEntity.created(new URI("/api/mondrian-ds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mondrian-ds : Updates an existing mondrianDs.
     *
     * @param mondrianDs the mondrianDs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mondrianDs,
     * or with status 400 (Bad Request) if the mondrianDs is not valid,
     * or with status 500 (Internal Server Error) if the mondrianDs couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mondrian-ds")
    @Timed
    public ResponseEntity<MondrianDs> updateMondrianDs(@Valid @RequestBody MondrianDs mondrianDs) throws URISyntaxException {
        log.debug("REST request to update MondrianDs : {}", mondrianDs);
        if (mondrianDs.getId() == null) {
            return createMondrianDs(mondrianDs);
        }
        MondrianDs result = mondrianDsRepository.save(mondrianDs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mondrianDs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mondrian-ds : get all the mondrianDs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mondrianDs in body
     */
    @GetMapping("/mondrian-ds")
    @Timed
    public List<MondrianDs> getAllMondrianDs() {
        log.debug("REST request to get all MondrianDs");
        return mondrianDsRepository.findAll();
        }

    /**
     * GET  /mondrian-ds/:id : get the "id" mondrianDs.
     *
     * @param id the id of the mondrianDs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mondrianDs, or with status 404 (Not Found)
     */
    @GetMapping("/mondrian-ds/{id}")
    @Timed
    public ResponseEntity<MondrianDs> getMondrianDs(@PathVariable Long id) {
        log.debug("REST request to get MondrianDs : {}", id);
        MondrianDs mondrianDs = mondrianDsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mondrianDs));
    }

    /**
     * DELETE  /mondrian-ds/:id : delete the "id" mondrianDs.
     *
     * @param id the id of the mondrianDs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mondrian-ds/{id}")
    @Timed
    public ResponseEntity<Void> deleteMondrianDs(@PathVariable Long id) {
        log.debug("REST request to delete MondrianDs : {}", id);
        mondrianDsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
