package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Obi02IndicValu;

import io.github.jhipster.application.repository.Obi02IndicValuRepository;
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
 * REST controller for managing Obi02IndicValu.
 */
@RestController
@RequestMapping("/api")
public class Obi02IndicValuResource {

    private final Logger log = LoggerFactory.getLogger(Obi02IndicValuResource.class);

    private static final String ENTITY_NAME = "obi02IndicValu";

    private final Obi02IndicValuRepository obi02IndicValuRepository;

    public Obi02IndicValuResource(Obi02IndicValuRepository obi02IndicValuRepository) {
        this.obi02IndicValuRepository = obi02IndicValuRepository;
    }

    /**
     * POST  /obi-02-indic-valus : Create a new obi02IndicValu.
     *
     * @param obi02IndicValu the obi02IndicValu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new obi02IndicValu, or with status 400 (Bad Request) if the obi02IndicValu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/obi-02-indic-valus")
    @Timed
    public ResponseEntity<Obi02IndicValu> createObi02IndicValu(@Valid @RequestBody Obi02IndicValu obi02IndicValu) throws URISyntaxException {
        log.debug("REST request to save Obi02IndicValu : {}", obi02IndicValu);
        if (obi02IndicValu.getId() != null) {
            throw new BadRequestAlertException("A new obi02IndicValu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Obi02IndicValu result = obi02IndicValuRepository.save(obi02IndicValu);
        return ResponseEntity.created(new URI("/api/obi-02-indic-valus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /obi-02-indic-valus : Updates an existing obi02IndicValu.
     *
     * @param obi02IndicValu the obi02IndicValu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated obi02IndicValu,
     * or with status 400 (Bad Request) if the obi02IndicValu is not valid,
     * or with status 500 (Internal Server Error) if the obi02IndicValu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/obi-02-indic-valus")
    @Timed
    public ResponseEntity<Obi02IndicValu> updateObi02IndicValu(@Valid @RequestBody Obi02IndicValu obi02IndicValu) throws URISyntaxException {
        log.debug("REST request to update Obi02IndicValu : {}", obi02IndicValu);
        if (obi02IndicValu.getId() == null) {
            return createObi02IndicValu(obi02IndicValu);
        }
        Obi02IndicValu result = obi02IndicValuRepository.save(obi02IndicValu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, obi02IndicValu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /obi-02-indic-valus : get all the obi02IndicValus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of obi02IndicValus in body
     */
    @GetMapping("/obi-02-indic-valus")
    @Timed
    public List<Obi02IndicValu> getAllObi02IndicValus() {
        log.debug("REST request to get all Obi02IndicValus");
        return obi02IndicValuRepository.findAll();
        }

    /**
     * GET  /obi-02-indic-valus/:id : get the "id" obi02IndicValu.
     *
     * @param id the id of the obi02IndicValu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the obi02IndicValu, or with status 404 (Not Found)
     */
    @GetMapping("/obi-02-indic-valus/{id}")
    @Timed
    public ResponseEntity<Obi02IndicValu> getObi02IndicValu(@PathVariable Long id) {
        log.debug("REST request to get Obi02IndicValu : {}", id);
        Obi02IndicValu obi02IndicValu = obi02IndicValuRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(obi02IndicValu));
    }

    /**
     * DELETE  /obi-02-indic-valus/:id : delete the "id" obi02IndicValu.
     *
     * @param id the id of the obi02IndicValu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/obi-02-indic-valus/{id}")
    @Timed
    public ResponseEntity<Void> deleteObi02IndicValu(@PathVariable Long id) {
        log.debug("REST request to delete Obi02IndicValu : {}", id);
        obi02IndicValuRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
