package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ind04Classif;

import io.github.jhipster.application.repository.Ind04ClassifRepository;
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
 * REST controller for managing Ind04Classif.
 */
@RestController
@RequestMapping("/api")
public class Ind04ClassifResource {

    private final Logger log = LoggerFactory.getLogger(Ind04ClassifResource.class);

    private static final String ENTITY_NAME = "ind04Classif";

    private final Ind04ClassifRepository ind04ClassifRepository;

    public Ind04ClassifResource(Ind04ClassifRepository ind04ClassifRepository) {
        this.ind04ClassifRepository = ind04ClassifRepository;
    }

    /**
     * POST  /ind-04-classifs : Create a new ind04Classif.
     *
     * @param ind04Classif the ind04Classif to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ind04Classif, or with status 400 (Bad Request) if the ind04Classif has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ind-04-classifs")
    @Timed
    public ResponseEntity<Ind04Classif> createInd04Classif(@Valid @RequestBody Ind04Classif ind04Classif) throws URISyntaxException {
        log.debug("REST request to save Ind04Classif : {}", ind04Classif);
        if (ind04Classif.getId() != null) {
            throw new BadRequestAlertException("A new ind04Classif cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ind04Classif result = ind04ClassifRepository.save(ind04Classif);
        return ResponseEntity.created(new URI("/api/ind-04-classifs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ind-04-classifs : Updates an existing ind04Classif.
     *
     * @param ind04Classif the ind04Classif to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ind04Classif,
     * or with status 400 (Bad Request) if the ind04Classif is not valid,
     * or with status 500 (Internal Server Error) if the ind04Classif couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ind-04-classifs")
    @Timed
    public ResponseEntity<Ind04Classif> updateInd04Classif(@Valid @RequestBody Ind04Classif ind04Classif) throws URISyntaxException {
        log.debug("REST request to update Ind04Classif : {}", ind04Classif);
        if (ind04Classif.getId() == null) {
            return createInd04Classif(ind04Classif);
        }
        Ind04Classif result = ind04ClassifRepository.save(ind04Classif);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ind04Classif.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ind-04-classifs : get all the ind04Classifs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ind04Classifs in body
     */
    @GetMapping("/ind-04-classifs")
    @Timed
    public List<Ind04Classif> getAllInd04Classifs() {
        log.debug("REST request to get all Ind04Classifs");
        return ind04ClassifRepository.findAll();
        }

    /**
     * GET  /ind-04-classifs/:id : get the "id" ind04Classif.
     *
     * @param id the id of the ind04Classif to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ind04Classif, or with status 404 (Not Found)
     */
    @GetMapping("/ind-04-classifs/{id}")
    @Timed
    public ResponseEntity<Ind04Classif> getInd04Classif(@PathVariable Long id) {
        log.debug("REST request to get Ind04Classif : {}", id);
        Ind04Classif ind04Classif = ind04ClassifRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ind04Classif));
    }

    /**
     * DELETE  /ind-04-classifs/:id : delete the "id" ind04Classif.
     *
     * @param id the id of the ind04Classif to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ind-04-classifs/{id}")
    @Timed
    public ResponseEntity<Void> deleteInd04Classif(@PathVariable Long id) {
        log.debug("REST request to delete Ind04Classif : {}", id);
        ind04ClassifRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
