package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.TipiWidget;
import io.github.jhipster.application.repository.TipiWidgetRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TipiWidgetResource REST controller.
 *
 * @see TipiWidgetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TipiWidgetResourceIntTest {

    private static final String DEFAULT_DB_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_DB_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_DB_TIPO_CONT = "AAAAAAAAAA";
    private static final String UPDATED_DB_TIPO_CONT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FL_DRILL = false;
    private static final Boolean UPDATED_FL_DRILL = true;

    @Autowired
    private TipiWidgetRepository tipiWidgetRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipiWidgetMockMvc;

    private TipiWidget tipiWidget;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipiWidgetResource tipiWidgetResource = new TipiWidgetResource(tipiWidgetRepository);
        this.restTipiWidgetMockMvc = MockMvcBuilders.standaloneSetup(tipiWidgetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipiWidget createEntity(EntityManager em) {
        TipiWidget tipiWidget = new TipiWidget()
            .dbTipo(DEFAULT_DB_TIPO)
            .dbTipoCont(DEFAULT_DB_TIPO_CONT)
            .flDrill(DEFAULT_FL_DRILL);
        return tipiWidget;
    }

    @Before
    public void initTest() {
        tipiWidget = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipiWidget() throws Exception {
        int databaseSizeBeforeCreate = tipiWidgetRepository.findAll().size();

        // Create the TipiWidget
        restTipiWidgetMockMvc.perform(post("/api/tipi-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipiWidget)))
            .andExpect(status().isCreated());

        // Validate the TipiWidget in the database
        List<TipiWidget> tipiWidgetList = tipiWidgetRepository.findAll();
        assertThat(tipiWidgetList).hasSize(databaseSizeBeforeCreate + 1);
        TipiWidget testTipiWidget = tipiWidgetList.get(tipiWidgetList.size() - 1);
        assertThat(testTipiWidget.getDbTipo()).isEqualTo(DEFAULT_DB_TIPO);
        assertThat(testTipiWidget.getDbTipoCont()).isEqualTo(DEFAULT_DB_TIPO_CONT);
        assertThat(testTipiWidget.isFlDrill()).isEqualTo(DEFAULT_FL_DRILL);
    }

    @Test
    @Transactional
    public void createTipiWidgetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipiWidgetRepository.findAll().size();

        // Create the TipiWidget with an existing ID
        tipiWidget.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipiWidgetMockMvc.perform(post("/api/tipi-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipiWidget)))
            .andExpect(status().isBadRequest());

        // Validate the TipiWidget in the database
        List<TipiWidget> tipiWidgetList = tipiWidgetRepository.findAll();
        assertThat(tipiWidgetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipiWidgets() throws Exception {
        // Initialize the database
        tipiWidgetRepository.saveAndFlush(tipiWidget);

        // Get all the tipiWidgetList
        restTipiWidgetMockMvc.perform(get("/api/tipi-widgets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipiWidget.getId().intValue())))
            .andExpect(jsonPath("$.[*].dbTipo").value(hasItem(DEFAULT_DB_TIPO.toString())))
            .andExpect(jsonPath("$.[*].dbTipoCont").value(hasItem(DEFAULT_DB_TIPO_CONT.toString())))
            .andExpect(jsonPath("$.[*].flDrill").value(hasItem(DEFAULT_FL_DRILL.booleanValue())));
    }

    @Test
    @Transactional
    public void getTipiWidget() throws Exception {
        // Initialize the database
        tipiWidgetRepository.saveAndFlush(tipiWidget);

        // Get the tipiWidget
        restTipiWidgetMockMvc.perform(get("/api/tipi-widgets/{id}", tipiWidget.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipiWidget.getId().intValue()))
            .andExpect(jsonPath("$.dbTipo").value(DEFAULT_DB_TIPO.toString()))
            .andExpect(jsonPath("$.dbTipoCont").value(DEFAULT_DB_TIPO_CONT.toString()))
            .andExpect(jsonPath("$.flDrill").value(DEFAULT_FL_DRILL.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTipiWidget() throws Exception {
        // Get the tipiWidget
        restTipiWidgetMockMvc.perform(get("/api/tipi-widgets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipiWidget() throws Exception {
        // Initialize the database
        tipiWidgetRepository.saveAndFlush(tipiWidget);
        int databaseSizeBeforeUpdate = tipiWidgetRepository.findAll().size();

        // Update the tipiWidget
        TipiWidget updatedTipiWidget = tipiWidgetRepository.findOne(tipiWidget.getId());
        // Disconnect from session so that the updates on updatedTipiWidget are not directly saved in db
        em.detach(updatedTipiWidget);
        updatedTipiWidget
            .dbTipo(UPDATED_DB_TIPO)
            .dbTipoCont(UPDATED_DB_TIPO_CONT)
            .flDrill(UPDATED_FL_DRILL);

        restTipiWidgetMockMvc.perform(put("/api/tipi-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipiWidget)))
            .andExpect(status().isOk());

        // Validate the TipiWidget in the database
        List<TipiWidget> tipiWidgetList = tipiWidgetRepository.findAll();
        assertThat(tipiWidgetList).hasSize(databaseSizeBeforeUpdate);
        TipiWidget testTipiWidget = tipiWidgetList.get(tipiWidgetList.size() - 1);
        assertThat(testTipiWidget.getDbTipo()).isEqualTo(UPDATED_DB_TIPO);
        assertThat(testTipiWidget.getDbTipoCont()).isEqualTo(UPDATED_DB_TIPO_CONT);
        assertThat(testTipiWidget.isFlDrill()).isEqualTo(UPDATED_FL_DRILL);
    }

    @Test
    @Transactional
    public void updateNonExistingTipiWidget() throws Exception {
        int databaseSizeBeforeUpdate = tipiWidgetRepository.findAll().size();

        // Create the TipiWidget

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipiWidgetMockMvc.perform(put("/api/tipi-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipiWidget)))
            .andExpect(status().isCreated());

        // Validate the TipiWidget in the database
        List<TipiWidget> tipiWidgetList = tipiWidgetRepository.findAll();
        assertThat(tipiWidgetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipiWidget() throws Exception {
        // Initialize the database
        tipiWidgetRepository.saveAndFlush(tipiWidget);
        int databaseSizeBeforeDelete = tipiWidgetRepository.findAll().size();

        // Get the tipiWidget
        restTipiWidgetMockMvc.perform(delete("/api/tipi-widgets/{id}", tipiWidget.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipiWidget> tipiWidgetList = tipiWidgetRepository.findAll();
        assertThat(tipiWidgetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipiWidget.class);
        TipiWidget tipiWidget1 = new TipiWidget();
        tipiWidget1.setId(1L);
        TipiWidget tipiWidget2 = new TipiWidget();
        tipiWidget2.setId(tipiWidget1.getId());
        assertThat(tipiWidget1).isEqualTo(tipiWidget2);
        tipiWidget2.setId(2L);
        assertThat(tipiWidget1).isNotEqualTo(tipiWidget2);
        tipiWidget1.setId(null);
        assertThat(tipiWidget1).isNotEqualTo(tipiWidget2);
    }
}
