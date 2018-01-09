package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ba11Dsh;

import io.github.jhipster.application.repository.Ba11DshRepository;
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
 * REST controller for managing Ba11Dsh.
 */
@RestController
@RequestMapping("/api")
public class Ba11DshResource {

    private final Logger log = LoggerFactory.getLogger(Ba11DshResource.class);

    private static final String ENTITY_NAME = "ba11Dsh";

    private final Ba11DshRepository ba11DshRepository;

    public Ba11DshResource(Ba11DshRepository ba11DshRepository) {
        this.ba11DshRepository = ba11DshRepository;
    }

    /**
     * POST  /ba-11-dshes : Create a new ba11Dsh.
     *
     * @param ba11Dsh the ba11Dsh to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ba11Dsh, or with status 400 (Bad Request) if the ba11Dsh has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ba-11-dshes")
    @Timed
    public ResponseEntity<Ba11Dsh> createBa11Dsh(@Valid @RequestBody Ba11Dsh ba11Dsh) throws URISyntaxException {
        log.debug("REST request to save Ba11Dsh : {}", ba11Dsh);
        if (ba11Dsh.getId() != null) {
            throw new BadRequestAlertException("A new ba11Dsh cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ba11Dsh result = ba11DshRepository.save(ba11Dsh);
        return ResponseEntity.created(new URI("/api/ba-11-dshes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ba-11-dshes : Updates an existing ba11Dsh.
     *
     * @param ba11Dsh the ba11Dsh to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ba11Dsh,
     * or with status 400 (Bad Request) if the ba11Dsh is not valid,
     * or with status 500 (Internal Server Error) if the ba11Dsh couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ba-11-dshes")
    @Timed
    public ResponseEntity<Ba11Dsh> updateBa11Dsh(@Valid @RequestBody Ba11Dsh ba11Dsh) throws URISyntaxException {
        log.debug("REST request to update Ba11Dsh : {}", ba11Dsh);
        if (ba11Dsh.getId() == null) {
            return createBa11Dsh(ba11Dsh);
        }
        Ba11Dsh result = ba11DshRepository.save(ba11Dsh);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ba11Dsh.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ba-11-dshes : get all the ba11Dshes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ba11Dshes in body
     */
    @GetMapping("/ba-11-dshes")
    @Timed
    public List<Ba11Dsh> getAllBa11Dshes() {
        log.debug("REST request to get all Ba11Dshes");
        return ba11DshRepository.findAll();
        }

    /**
     * GET  /ba-11-dshes/:id : get the "id" ba11Dsh.
     *
     * @param id the id of the ba11Dsh to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ba11Dsh, or with status 404 (Not Found)
     */
    @GetMapping("/ba-11-dshes/{id}")
    @Timed
    public ResponseEntity<Ba11Dsh> getBa11Dsh(@PathVariable Long id) {
        log.debug("REST request to get Ba11Dsh : {}", id);
        Ba11Dsh ba11Dsh = ba11DshRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ba11Dsh));
    }

    /**
     * DELETE  /ba-11-dshes/:id : delete the "id" ba11Dsh.
     *
     * @param id the id of the ba11Dsh to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ba-11-dshes/{id}")
    @Timed
    public ResponseEntity<Void> deleteBa11Dsh(@PathVariable Long id) {
        log.debug("REST request to delete Ba11Dsh : {}", id);
        ba11DshRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
