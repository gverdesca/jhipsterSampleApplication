package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.WidgetImpl;

import io.github.jhipster.application.repository.WidgetImplRepository;
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
 * REST controller for managing WidgetImpl.
 */
@RestController
@RequestMapping("/api")
public class WidgetImplResource {

    private final Logger log = LoggerFactory.getLogger(WidgetImplResource.class);

    private static final String ENTITY_NAME = "widgetImpl";

    private final WidgetImplRepository widgetImplRepository;

    public WidgetImplResource(WidgetImplRepository widgetImplRepository) {
        this.widgetImplRepository = widgetImplRepository;
    }

    /**
     * POST  /widget-impls : Create a new widgetImpl.
     *
     * @param widgetImpl the widgetImpl to create
     * @return the ResponseEntity with status 201 (Created) and with body the new widgetImpl, or with status 400 (Bad Request) if the widgetImpl has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/widget-impls")
    @Timed
    public ResponseEntity<WidgetImpl> createWidgetImpl(@Valid @RequestBody WidgetImpl widgetImpl) throws URISyntaxException {
        log.debug("REST request to save WidgetImpl : {}", widgetImpl);
        if (widgetImpl.getId() != null) {
            throw new BadRequestAlertException("A new widgetImpl cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WidgetImpl result = widgetImplRepository.save(widgetImpl);
        return ResponseEntity.created(new URI("/api/widget-impls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /widget-impls : Updates an existing widgetImpl.
     *
     * @param widgetImpl the widgetImpl to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated widgetImpl,
     * or with status 400 (Bad Request) if the widgetImpl is not valid,
     * or with status 500 (Internal Server Error) if the widgetImpl couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/widget-impls")
    @Timed
    public ResponseEntity<WidgetImpl> updateWidgetImpl(@Valid @RequestBody WidgetImpl widgetImpl) throws URISyntaxException {
        log.debug("REST request to update WidgetImpl : {}", widgetImpl);
        if (widgetImpl.getId() == null) {
            return createWidgetImpl(widgetImpl);
        }
        WidgetImpl result = widgetImplRepository.save(widgetImpl);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, widgetImpl.getId().toString()))
            .body(result);
    }

    /**
     * GET  /widget-impls : get all the widgetImpls.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of widgetImpls in body
     */
    @GetMapping("/widget-impls")
    @Timed
    public List<WidgetImpl> getAllWidgetImpls() {
        log.debug("REST request to get all WidgetImpls");
        return widgetImplRepository.findAll();
        }

    /**
     * GET  /widget-impls/:id : get the "id" widgetImpl.
     *
     * @param id the id of the widgetImpl to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the widgetImpl, or with status 404 (Not Found)
     */
    @GetMapping("/widget-impls/{id}")
    @Timed
    public ResponseEntity<WidgetImpl> getWidgetImpl(@PathVariable Long id) {
        log.debug("REST request to get WidgetImpl : {}", id);
        WidgetImpl widgetImpl = widgetImplRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(widgetImpl));
    }

    /**
     * DELETE  /widget-impls/:id : delete the "id" widgetImpl.
     *
     * @param id the id of the widgetImpl to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/widget-impls/{id}")
    @Timed
    public ResponseEntity<Void> deleteWidgetImpl(@PathVariable Long id) {
        log.debug("REST request to delete WidgetImpl : {}", id);
        widgetImplRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
