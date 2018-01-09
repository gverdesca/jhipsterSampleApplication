package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ind01Indic;

import io.github.jhipster.application.repository.Ind01IndicRepository;
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
 * REST controller for managing Ind01Indic.
 */
@RestController
@RequestMapping("/api")
public class Ind01IndicResource {

    private final Logger log = LoggerFactory.getLogger(Ind01IndicResource.class);

    private static final String ENTITY_NAME = "ind01Indic";

    private final Ind01IndicRepository ind01IndicRepository;

    public Ind01IndicResource(Ind01IndicRepository ind01IndicRepository) {
        this.ind01IndicRepository = ind01IndicRepository;
    }

    /**
     * POST  /ind-01-indics : Create a new ind01Indic.
     *
     * @param ind01Indic the ind01Indic to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ind01Indic, or with status 400 (Bad Request) if the ind01Indic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ind-01-indics")
    @Timed
    public ResponseEntity<Ind01Indic> createInd01Indic(@Valid @RequestBody Ind01Indic ind01Indic) throws URISyntaxException {
        log.debug("REST request to save Ind01Indic : {}", ind01Indic);
        if (ind01Indic.getId() != null) {
            throw new BadRequestAlertException("A new ind01Indic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ind01Indic result = ind01IndicRepository.save(ind01Indic);
        return ResponseEntity.created(new URI("/api/ind-01-indics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ind-01-indics : Updates an existing ind01Indic.
     *
     * @param ind01Indic the ind01Indic to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ind01Indic,
     * or with status 400 (Bad Request) if the ind01Indic is not valid,
     * or with status 500 (Internal Server Error) if the ind01Indic couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ind-01-indics")
    @Timed
    public ResponseEntity<Ind01Indic> updateInd01Indic(@Valid @RequestBody Ind01Indic ind01Indic) throws URISyntaxException {
        log.debug("REST request to update Ind01Indic : {}", ind01Indic);
        if (ind01Indic.getId() == null) {
            return createInd01Indic(ind01Indic);
        }
        Ind01Indic result = ind01IndicRepository.save(ind01Indic);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ind01Indic.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ind-01-indics : get all the ind01Indics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ind01Indics in body
     */
    @GetMapping("/ind-01-indics")
    @Timed
    public List<Ind01Indic> getAllInd01Indics() {
        log.debug("REST request to get all Ind01Indics");
        return ind01IndicRepository.findAll();
        }

    /**
     * GET  /ind-01-indics/:id : get the "id" ind01Indic.
     *
     * @param id the id of the ind01Indic to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ind01Indic, or with status 404 (Not Found)
     */
    @GetMapping("/ind-01-indics/{id}")
    @Timed
    public ResponseEntity<Ind01Indic> getInd01Indic(@PathVariable Long id) {
        log.debug("REST request to get Ind01Indic : {}", id);
        Ind01Indic ind01Indic = ind01IndicRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ind01Indic));
    }

    /**
     * DELETE  /ind-01-indics/:id : delete the "id" ind01Indic.
     *
     * @param id the id of the ind01Indic to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ind-01-indics/{id}")
    @Timed
    public ResponseEntity<Void> deleteInd01Indic(@PathVariable Long id) {
        log.debug("REST request to delete Ind01Indic : {}", id);
        ind01IndicRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
