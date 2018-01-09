package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.MondrianDs;
import io.github.jhipster.application.repository.MondrianDsRepository;
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
 * Test class for the MondrianDsResource REST controller.
 *
 * @see MondrianDsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class MondrianDsResourceIntTest {

    private static final String DEFAULT_NM_CUBO = "AAAAAAAAAA";
    private static final String UPDATED_NM_CUBO = "BBBBBBBBBB";

    private static final String DEFAULT_DL_NOME_SAIKU = "AAAAAAAAAA";
    private static final String UPDATED_DL_NOME_SAIKU = "BBBBBBBBBB";

    private static final String DEFAULT_DL_PATH_SCHEMA = "AAAAAAAAAA";
    private static final String UPDATED_DL_PATH_SCHEMA = "BBBBBBBBBB";

    private static final String DEFAULT_DE_MONDRIAN_CONN = "AAAAAAAAAA";
    private static final String UPDATED_DE_MONDRIAN_CONN = "BBBBBBBBBB";

    private static final String DEFAULT_DL_JDBC_URL = "AAAAAAAAAA";
    private static final String UPDATED_DL_JDBC_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DL_DRIVER = "AAAAAAAAAA";
    private static final String UPDATED_DL_DRIVER = "BBBBBBBBBB";

    private static final String DEFAULT_DL_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_DL_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DL_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_DL_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private MondrianDsRepository mondrianDsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMondrianDsMockMvc;

    private MondrianDs mondrianDs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MondrianDsResource mondrianDsResource = new MondrianDsResource(mondrianDsRepository);
        this.restMondrianDsMockMvc = MockMvcBuilders.standaloneSetup(mondrianDsResource)
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
    public static MondrianDs createEntity(EntityManager em) {
        MondrianDs mondrianDs = new MondrianDs()
            .nmCubo(DEFAULT_NM_CUBO)
            .dlNomeSaiku(DEFAULT_DL_NOME_SAIKU)
            .dlPathSchema(DEFAULT_DL_PATH_SCHEMA)
            .deMondrianConn(DEFAULT_DE_MONDRIAN_CONN)
            .dlJdbcUrl(DEFAULT_DL_JDBC_URL)
            .dlDriver(DEFAULT_DL_DRIVER)
            .dlUsername(DEFAULT_DL_USERNAME)
            .dlPassword(DEFAULT_DL_PASSWORD);
        return mondrianDs;
    }

    @Before
    public void initTest() {
        mondrianDs = createEntity(em);
    }

    @Test
    @Transactional
    public void createMondrianDs() throws Exception {
        int databaseSizeBeforeCreate = mondrianDsRepository.findAll().size();

        // Create the MondrianDs
        restMondrianDsMockMvc.perform(post("/api/mondrian-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mondrianDs)))
            .andExpect(status().isCreated());

        // Validate the MondrianDs in the database
        List<MondrianDs> mondrianDsList = mondrianDsRepository.findAll();
        assertThat(mondrianDsList).hasSize(databaseSizeBeforeCreate + 1);
        MondrianDs testMondrianDs = mondrianDsList.get(mondrianDsList.size() - 1);
        assertThat(testMondrianDs.getNmCubo()).isEqualTo(DEFAULT_NM_CUBO);
        assertThat(testMondrianDs.getDlNomeSaiku()).isEqualTo(DEFAULT_DL_NOME_SAIKU);
        assertThat(testMondrianDs.getDlPathSchema()).isEqualTo(DEFAULT_DL_PATH_SCHEMA);
        assertThat(testMondrianDs.getDeMondrianConn()).isEqualTo(DEFAULT_DE_MONDRIAN_CONN);
        assertThat(testMondrianDs.getDlJdbcUrl()).isEqualTo(DEFAULT_DL_JDBC_URL);
        assertThat(testMondrianDs.getDlDriver()).isEqualTo(DEFAULT_DL_DRIVER);
        assertThat(testMondrianDs.getDlUsername()).isEqualTo(DEFAULT_DL_USERNAME);
        assertThat(testMondrianDs.getDlPassword()).isEqualTo(DEFAULT_DL_PASSWORD);
    }

    @Test
    @Transactional
    public void createMondrianDsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mondrianDsRepository.findAll().size();

        // Create the MondrianDs with an existing ID
        mondrianDs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMondrianDsMockMvc.perform(post("/api/mondrian-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mondrianDs)))
            .andExpect(status().isBadRequest());

        // Validate the MondrianDs in the database
        List<MondrianDs> mondrianDsList = mondrianDsRepository.findAll();
        assertThat(mondrianDsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMondrianDs() throws Exception {
        // Initialize the database
        mondrianDsRepository.saveAndFlush(mondrianDs);

        // Get all the mondrianDsList
        restMondrianDsMockMvc.perform(get("/api/mondrian-ds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mondrianDs.getId().intValue())))
            .andExpect(jsonPath("$.[*].nmCubo").value(hasItem(DEFAULT_NM_CUBO.toString())))
            .andExpect(jsonPath("$.[*].dlNomeSaiku").value(hasItem(DEFAULT_DL_NOME_SAIKU.toString())))
            .andExpect(jsonPath("$.[*].dlPathSchema").value(hasItem(DEFAULT_DL_PATH_SCHEMA.toString())))
            .andExpect(jsonPath("$.[*].deMondrianConn").value(hasItem(DEFAULT_DE_MONDRIAN_CONN.toString())))
            .andExpect(jsonPath("$.[*].dlJdbcUrl").value(hasItem(DEFAULT_DL_JDBC_URL.toString())))
            .andExpect(jsonPath("$.[*].dlDriver").value(hasItem(DEFAULT_DL_DRIVER.toString())))
            .andExpect(jsonPath("$.[*].dlUsername").value(hasItem(DEFAULT_DL_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].dlPassword").value(hasItem(DEFAULT_DL_PASSWORD.toString())));
    }

    @Test
    @Transactional
    public void getMondrianDs() throws Exception {
        // Initialize the database
        mondrianDsRepository.saveAndFlush(mondrianDs);

        // Get the mondrianDs
        restMondrianDsMockMvc.perform(get("/api/mondrian-ds/{id}", mondrianDs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mondrianDs.getId().intValue()))
            .andExpect(jsonPath("$.nmCubo").value(DEFAULT_NM_CUBO.toString()))
            .andExpect(jsonPath("$.dlNomeSaiku").value(DEFAULT_DL_NOME_SAIKU.toString()))
            .andExpect(jsonPath("$.dlPathSchema").value(DEFAULT_DL_PATH_SCHEMA.toString()))
            .andExpect(jsonPath("$.deMondrianConn").value(DEFAULT_DE_MONDRIAN_CONN.toString()))
            .andExpect(jsonPath("$.dlJdbcUrl").value(DEFAULT_DL_JDBC_URL.toString()))
            .andExpect(jsonPath("$.dlDriver").value(DEFAULT_DL_DRIVER.toString()))
            .andExpect(jsonPath("$.dlUsername").value(DEFAULT_DL_USERNAME.toString()))
            .andExpect(jsonPath("$.dlPassword").value(DEFAULT_DL_PASSWORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMondrianDs() throws Exception {
        // Get the mondrianDs
        restMondrianDsMockMvc.perform(get("/api/mondrian-ds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMondrianDs() throws Exception {
        // Initialize the database
        mondrianDsRepository.saveAndFlush(mondrianDs);
        int databaseSizeBeforeUpdate = mondrianDsRepository.findAll().size();

        // Update the mondrianDs
        MondrianDs updatedMondrianDs = mondrianDsRepository.findOne(mondrianDs.getId());
        // Disconnect from session so that the updates on updatedMondrianDs are not directly saved in db
        em.detach(updatedMondrianDs);
        updatedMondrianDs
            .nmCubo(UPDATED_NM_CUBO)
            .dlNomeSaiku(UPDATED_DL_NOME_SAIKU)
            .dlPathSchema(UPDATED_DL_PATH_SCHEMA)
            .deMondrianConn(UPDATED_DE_MONDRIAN_CONN)
            .dlJdbcUrl(UPDATED_DL_JDBC_URL)
            .dlDriver(UPDATED_DL_DRIVER)
            .dlUsername(UPDATED_DL_USERNAME)
            .dlPassword(UPDATED_DL_PASSWORD);

        restMondrianDsMockMvc.perform(put("/api/mondrian-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMondrianDs)))
            .andExpect(status().isOk());

        // Validate the MondrianDs in the database
        List<MondrianDs> mondrianDsList = mondrianDsRepository.findAll();
        assertThat(mondrianDsList).hasSize(databaseSizeBeforeUpdate);
        MondrianDs testMondrianDs = mondrianDsList.get(mondrianDsList.size() - 1);
        assertThat(testMondrianDs.getNmCubo()).isEqualTo(UPDATED_NM_CUBO);
        assertThat(testMondrianDs.getDlNomeSaiku()).isEqualTo(UPDATED_DL_NOME_SAIKU);
        assertThat(testMondrianDs.getDlPathSchema()).isEqualTo(UPDATED_DL_PATH_SCHEMA);
        assertThat(testMondrianDs.getDeMondrianConn()).isEqualTo(UPDATED_DE_MONDRIAN_CONN);
        assertThat(testMondrianDs.getDlJdbcUrl()).isEqualTo(UPDATED_DL_JDBC_URL);
        assertThat(testMondrianDs.getDlDriver()).isEqualTo(UPDATED_DL_DRIVER);
        assertThat(testMondrianDs.getDlUsername()).isEqualTo(UPDATED_DL_USERNAME);
        assertThat(testMondrianDs.getDlPassword()).isEqualTo(UPDATED_DL_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingMondrianDs() throws Exception {
        int databaseSizeBeforeUpdate = mondrianDsRepository.findAll().size();

        // Create the MondrianDs

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMondrianDsMockMvc.perform(put("/api/mondrian-ds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mondrianDs)))
            .andExpect(status().isCreated());

        // Validate the MondrianDs in the database
        List<MondrianDs> mondrianDsList = mondrianDsRepository.findAll();
        assertThat(mondrianDsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMondrianDs() throws Exception {
        // Initialize the database
        mondrianDsRepository.saveAndFlush(mondrianDs);
        int databaseSizeBeforeDelete = mondrianDsRepository.findAll().size();

        // Get the mondrianDs
        restMondrianDsMockMvc.perform(delete("/api/mondrian-ds/{id}", mondrianDs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MondrianDs> mondrianDsList = mondrianDsRepository.findAll();
        assertThat(mondrianDsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MondrianDs.class);
        MondrianDs mondrianDs1 = new MondrianDs();
        mondrianDs1.setId(1L);
        MondrianDs mondrianDs2 = new MondrianDs();
        mondrianDs2.setId(mondrianDs1.getId());
        assertThat(mondrianDs1).isEqualTo(mondrianDs2);
        mondrianDs2.setId(2L);
        assertThat(mondrianDs1).isNotEqualTo(mondrianDs2);
        mondrianDs1.setId(null);
        assertThat(mondrianDs1).isNotEqualTo(mondrianDs2);
    }
}
