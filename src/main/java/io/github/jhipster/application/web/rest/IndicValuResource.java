package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.IndicValu;

import io.github.jhipster.application.repository.IndicValuRepository;
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
 * REST controller for managing IndicValu.
 */
@RestController
@RequestMapping("/api")
public class IndicValuResource {

    private final Logger log = LoggerFactory.getLogger(IndicValuResource.class);

    private static final String ENTITY_NAME = "indicValu";

    private final IndicValuRepository indicValuRepository;

    public IndicValuResource(IndicValuRepository indicValuRepository) {
        this.indicValuRepository = indicValuRepository;
    }

    /**
     * POST  /indic-valus : Create a new indicValu.
     *
     * @param indicValu the indicValu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new indicValu, or with status 400 (Bad Request) if the indicValu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/indic-valus")
    @Timed
    public ResponseEntity<IndicValu> createIndicValu(@Valid @RequestBody IndicValu indicValu) throws URISyntaxException {
        log.debug("REST request to save IndicValu : {}", indicValu);
        if (indicValu.getId() != null) {
            throw new BadRequestAlertException("A new indicValu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IndicValu result = indicValuRepository.save(indicValu);
        return ResponseEntity.created(new URI("/api/indic-valus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /indic-valus : Updates an existing indicValu.
     *
     * @param indicValu the indicValu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated indicValu,
     * or with status 400 (Bad Request) if the indicValu is not valid,
     * or with status 500 (Internal Server Error) if the indicValu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/indic-valus")
    @Timed
    public ResponseEntity<IndicValu> updateIndicValu(@Valid @RequestBody IndicValu indicValu) throws URISyntaxException {
        log.debug("REST request to update IndicValu : {}", indicValu);
        if (indicValu.getId() == null) {
            return createIndicValu(indicValu);
        }
        IndicValu result = indicValuRepository.save(indicValu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, indicValu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /indic-valus : get all the indicValus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of indicValus in body
     */
    @GetMapping("/indic-valus")
    @Timed
    public List<IndicValu> getAllIndicValus() {
        log.debug("REST request to get all IndicValus");
        return indicValuRepository.findAll();
        }

    /**
     * GET  /indic-valus/:id : get the "id" indicValu.
     *
     * @param id the id of the indicValu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the indicValu, or with status 404 (Not Found)
     */
    @GetMapping("/indic-valus/{id}")
    @Timed
    public ResponseEntity<IndicValu> getIndicValu(@PathVariable Long id) {
        log.debug("REST request to get IndicValu : {}", id);
        IndicValu indicValu = indicValuRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(indicValu));
    }

    /**
     * DELETE  /indic-valus/:id : delete the "id" indicValu.
     *
     * @param id the id of the indicValu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/indic-valus/{id}")
    @Timed
    public ResponseEntity<Void> deleteIndicValu(@PathVariable Long id) {
        log.debug("REST request to delete IndicValu : {}", id);
        indicValuRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
