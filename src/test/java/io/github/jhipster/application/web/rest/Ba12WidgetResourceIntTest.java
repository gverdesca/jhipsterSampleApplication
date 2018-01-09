package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ba12Widget;
import io.github.jhipster.application.repository.Ba12WidgetRepository;
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
 * Test class for the Ba12WidgetResource REST controller.
 *
 * @see Ba12WidgetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ba12WidgetResourceIntTest {

    private static final String DEFAULT_DE_OPTIONS = "AAAAAAAAAA";
    private static final String UPDATED_DE_OPTIONS = "BBBBBBBBBB";

    private static final String DEFAULT_DB_TITOLO = "AAAAAAAAAA";
    private static final String UPDATED_DB_TITOLO = "BBBBBBBBBB";

    private static final String DEFAULT_DE_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_DE_CONTENT = "BBBBBBBBBB";

    @Autowired
    private Ba12WidgetRepository ba12WidgetRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBa12WidgetMockMvc;

    private Ba12Widget ba12Widget;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ba12WidgetResource ba12WidgetResource = new Ba12WidgetResource(ba12WidgetRepository);
        this.restBa12WidgetMockMvc = MockMvcBuilders.standaloneSetup(ba12WidgetResource)
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
    public static Ba12Widget createEntity(EntityManager em) {
        Ba12Widget ba12Widget = new Ba12Widget()
            .deOptions(DEFAULT_DE_OPTIONS)
            .dbTitolo(DEFAULT_DB_TITOLO)
            .deContent(DEFAULT_DE_CONTENT);
        return ba12Widget;
    }

    @Before
    public void initTest() {
        ba12Widget = createEntity(em);
    }

    @Test
    @Transactional
    public void createBa12Widget() throws Exception {
        int databaseSizeBeforeCreate = ba12WidgetRepository.findAll().size();

        // Create the Ba12Widget
        restBa12WidgetMockMvc.perform(post("/api/ba-12-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba12Widget)))
            .andExpect(status().isCreated());

        // Validate the Ba12Widget in the database
        List<Ba12Widget> ba12WidgetList = ba12WidgetRepository.findAll();
        assertThat(ba12WidgetList).hasSize(databaseSizeBeforeCreate + 1);
        Ba12Widget testBa12Widget = ba12WidgetList.get(ba12WidgetList.size() - 1);
        assertThat(testBa12Widget.getDeOptions()).isEqualTo(DEFAULT_DE_OPTIONS);
        assertThat(testBa12Widget.getDbTitolo()).isEqualTo(DEFAULT_DB_TITOLO);
        assertThat(testBa12Widget.getDeContent()).isEqualTo(DEFAULT_DE_CONTENT);
    }

    @Test
    @Transactional
    public void createBa12WidgetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ba12WidgetRepository.findAll().size();

        // Create the Ba12Widget with an existing ID
        ba12Widget.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBa12WidgetMockMvc.perform(post("/api/ba-12-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba12Widget)))
            .andExpect(status().isBadRequest());

        // Validate the Ba12Widget in the database
        List<Ba12Widget> ba12WidgetList = ba12WidgetRepository.findAll();
        assertThat(ba12WidgetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBa12Widgets() throws Exception {
        // Initialize the database
        ba12WidgetRepository.saveAndFlush(ba12Widget);

        // Get all the ba12WidgetList
        restBa12WidgetMockMvc.perform(get("/api/ba-12-widgets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ba12Widget.getId().intValue())))
            .andExpect(jsonPath("$.[*].deOptions").value(hasItem(DEFAULT_DE_OPTIONS.toString())))
            .andExpect(jsonPath("$.[*].dbTitolo").value(hasItem(DEFAULT_DB_TITOLO.toString())))
            .andExpect(jsonPath("$.[*].deContent").value(hasItem(DEFAULT_DE_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getBa12Widget() throws Exception {
        // Initialize the database
        ba12WidgetRepository.saveAndFlush(ba12Widget);

        // Get the ba12Widget
        restBa12WidgetMockMvc.perform(get("/api/ba-12-widgets/{id}", ba12Widget.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ba12Widget.getId().intValue()))
            .andExpect(jsonPath("$.deOptions").value(DEFAULT_DE_OPTIONS.toString()))
            .andExpect(jsonPath("$.dbTitolo").value(DEFAULT_DB_TITOLO.toString()))
            .andExpect(jsonPath("$.deContent").value(DEFAULT_DE_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBa12Widget() throws Exception {
        // Get the ba12Widget
        restBa12WidgetMockMvc.perform(get("/api/ba-12-widgets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBa12Widget() throws Exception {
        // Initialize the database
        ba12WidgetRepository.saveAndFlush(ba12Widget);
        int databaseSizeBeforeUpdate = ba12WidgetRepository.findAll().size();

        // Update the ba12Widget
        Ba12Widget updatedBa12Widget = ba12WidgetRepository.findOne(ba12Widget.getId());
        // Disconnect from session so that the updates on updatedBa12Widget are not directly saved in db
        em.detach(updatedBa12Widget);
        updatedBa12Widget
            .deOptions(UPDATED_DE_OPTIONS)
            .dbTitolo(UPDATED_DB_TITOLO)
            .deContent(UPDATED_DE_CONTENT);

        restBa12WidgetMockMvc.perform(put("/api/ba-12-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBa12Widget)))
            .andExpect(status().isOk());

        // Validate the Ba12Widget in the database
        List<Ba12Widget> ba12WidgetList = ba12WidgetRepository.findAll();
        assertThat(ba12WidgetList).hasSize(databaseSizeBeforeUpdate);
        Ba12Widget testBa12Widget = ba12WidgetList.get(ba12WidgetList.size() - 1);
        assertThat(testBa12Widget.getDeOptions()).isEqualTo(UPDATED_DE_OPTIONS);
        assertThat(testBa12Widget.getDbTitolo()).isEqualTo(UPDATED_DB_TITOLO);
        assertThat(testBa12Widget.getDeContent()).isEqualTo(UPDATED_DE_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingBa12Widget() throws Exception {
        int databaseSizeBeforeUpdate = ba12WidgetRepository.findAll().size();

        // Create the Ba12Widget

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBa12WidgetMockMvc.perform(put("/api/ba-12-widgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba12Widget)))
            .andExpect(status().isCreated());

        // Validate the Ba12Widget in the database
        List<Ba12Widget> ba12WidgetList = ba12WidgetRepository.findAll();
        assertThat(ba12WidgetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBa12Widget() throws Exception {
        // Initialize the database
        ba12WidgetRepository.saveAndFlush(ba12Widget);
        int databaseSizeBeforeDelete = ba12WidgetRepository.findAll().size();

        // Get the ba12Widget
        restBa12WidgetMockMvc.perform(delete("/api/ba-12-widgets/{id}", ba12Widget.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ba12Widget> ba12WidgetList = ba12WidgetRepository.findAll();
        assertThat(ba12WidgetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ba12Widget.class);
        Ba12Widget ba12Widget1 = new Ba12Widget();
        ba12Widget1.setId(1L);
        Ba12Widget ba12Widget2 = new Ba12Widget();
        ba12Widget2.setId(ba12Widget1.getId());
        assertThat(ba12Widget1).isEqualTo(ba12Widget2);
        ba12Widget2.setId(2L);
        assertThat(ba12Widget1).isNotEqualTo(ba12Widget2);
        ba12Widget1.setId(null);
        assertThat(ba12Widget1).isNotEqualTo(ba12Widget2);
    }
}
