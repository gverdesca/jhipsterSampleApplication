package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ind12Query;

import io.github.jhipster.application.repository.Ind12QueryRepository;
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
 * REST controller for managing Ind12Query.
 */
@RestController
@RequestMapping("/api")
public class Ind12QueryResource {

    private final Logger log = LoggerFactory.getLogger(Ind12QueryResource.class);

    private static final String ENTITY_NAME = "ind12Query";

    private final Ind12QueryRepository ind12QueryRepository;

    public Ind12QueryResource(Ind12QueryRepository ind12QueryRepository) {
        this.ind12QueryRepository = ind12QueryRepository;
    }

    /**
     * POST  /ind-12-queries : Create a new ind12Query.
     *
     * @param ind12Query the ind12Query to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ind12Query, or with status 400 (Bad Request) if the ind12Query has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ind-12-queries")
    @Timed
    public ResponseEntity<Ind12Query> createInd12Query(@Valid @RequestBody Ind12Query ind12Query) throws URISyntaxException {
        log.debug("REST request to save Ind12Query : {}", ind12Query);
        if (ind12Query.getId() != null) {
            throw new BadRequestAlertException("A new ind12Query cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ind12Query result = ind12QueryRepository.save(ind12Query);
        return ResponseEntity.created(new URI("/api/ind-12-queries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ind-12-queries : Updates an existing ind12Query.
     *
     * @param ind12Query the ind12Query to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ind12Query,
     * or with status 400 (Bad Request) if the ind12Query is not valid,
     * or with status 500 (Internal Server Error) if the ind12Query couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ind-12-queries")
    @Timed
    public ResponseEntity<Ind12Query> updateInd12Query(@Valid @RequestBody Ind12Query ind12Query) throws URISyntaxException {
        log.debug("REST request to update Ind12Query : {}", ind12Query);
        if (ind12Query.getId() == null) {
            return createInd12Query(ind12Query);
        }
        Ind12Query result = ind12QueryRepository.save(ind12Query);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ind12Query.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ind-12-queries : get all the ind12Queries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ind12Queries in body
     */
    @GetMapping("/ind-12-queries")
    @Timed
    public List<Ind12Query> getAllInd12Queries() {
        log.debug("REST request to get all Ind12Queries");
        return ind12QueryRepository.findAll();
        }

    /**
     * GET  /ind-12-queries/:id : get the "id" ind12Query.
     *
     * @param id the id of the ind12Query to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ind12Query, or with status 404 (Not Found)
     */
    @GetMapping("/ind-12-queries/{id}")
    @Timed
    public ResponseEntity<Ind12Query> getInd12Query(@PathVariable Long id) {
        log.debug("REST request to get Ind12Query : {}", id);
        Ind12Query ind12Query = ind12QueryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ind12Query));
    }

    /**
     * DELETE  /ind-12-queries/:id : delete the "id" ind12Query.
     *
     * @param id the id of the ind12Query to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ind-12-queries/{id}")
    @Timed
    public ResponseEntity<Void> deleteInd12Query(@PathVariable Long id) {
        log.debug("REST request to delete Ind12Query : {}", id);
        ind12QueryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
