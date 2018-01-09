package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Datasource;
import io.github.jhipster.application.repository.DatasourceRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DatasourceResource REST controller.
 *
 * @see DatasourceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class DatasourceResourceIntTest {

    private static final String DEFAULT_DB_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_DB_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_CD_COD = "AAAAAAAAAA";
    private static final String UPDATED_CD_COD = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_TS_CREAZ = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TS_CREAZ = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TS_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TS_MODIF = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DL_PATH_IMG = "AAAAAAAAAA";
    private static final String UPDATED_DL_PATH_IMG = "BBBBBBBBBB";

    @Autowired
    private DatasourceRepository datasourceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDatasourceMockMvc;

    private Datasource datasource;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DatasourceResource datasourceResource = new DatasourceResource(datasourceRepository);
        this.restDatasourceMockMvc = MockMvcBuilders.standaloneSetup(datasourceResource)
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
    public static Datasource createEntity(EntityManager em) {
        Datasource datasource = new Datasource()
            .dbTipo(DEFAULT_DB_TIPO)
            .cdCod(DEFAULT_CD_COD)
            .tsCreaz(DEFAULT_TS_CREAZ)
            .tsModif(DEFAULT_TS_MODIF)
            .dlPathImg(DEFAULT_DL_PATH_IMG);
        return datasource;
    }

    @Before
    public void initTest() {
        datasource = createEntity(em);
    }

    @Test
    @Transactional
    public void createDatasource() throws Exception {
        int databaseSizeBeforeCreate = datasourceRepository.findAll().size();

        // Create the Datasource
        restDatasourceMockMvc.perform(post("/api/datasources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datasource)))
            .andExpect(status().isCreated());

        // Validate the Datasource in the database
        List<Datasource> datasourceList = datasourceRepository.findAll();
        assertThat(datasourceList).hasSize(databaseSizeBeforeCreate + 1);
        Datasource testDatasource = datasourceList.get(datasourceList.size() - 1);
        assertThat(testDatasource.getDbTipo()).isEqualTo(DEFAULT_DB_TIPO);
        assertThat(testDatasource.getCdCod()).isEqualTo(DEFAULT_CD_COD);
        assertThat(testDatasource.getTsCreaz()).isEqualTo(DEFAULT_TS_CREAZ);
        assertThat(testDatasource.getTsModif()).isEqualTo(DEFAULT_TS_MODIF);
        assertThat(testDatasource.getDlPathImg()).isEqualTo(DEFAULT_DL_PATH_IMG);
    }

    @Test
    @Transactional
    public void createDatasourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = datasourceRepository.findAll().size();

        // Create the Datasource with an existing ID
        datasource.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDatasourceMockMvc.perform(post("/api/datasources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datasource)))
            .andExpect(status().isBadRequest());

        // Validate the Datasource in the database
        List<Datasource> datasourceList = datasourceRepository.findAll();
        assertThat(datasourceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCdCodIsRequired() throws Exception {
        int databaseSizeBeforeTest = datasourceRepository.findAll().size();
        // set the field null
        datasource.setCdCod(null);

        // Create the Datasource, which fails.

        restDatasourceMockMvc.perform(post("/api/datasources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datasource)))
            .andExpect(status().isBadRequest());

        List<Datasource> datasourceList = datasourceRepository.findAll();
        assertThat(datasourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDatasources() throws Exception {
        // Initialize the database
        datasourceRepository.saveAndFlush(datasource);

        // Get all the datasourceList
        restDatasourceMockMvc.perform(get("/api/datasources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(datasource.getId().intValue())))
            .andExpect(jsonPath("$.[*].dbTipo").value(hasItem(DEFAULT_DB_TIPO.toString())))
            .andExpect(jsonPath("$.[*].cdCod").value(hasItem(DEFAULT_CD_COD.toString())))
            .andExpect(jsonPath("$.[*].tsCreaz").value(hasItem(DEFAULT_TS_CREAZ.toString())))
            .andExpect(jsonPath("$.[*].tsModif").value(hasItem(DEFAULT_TS_MODIF.toString())))
            .andExpect(jsonPath("$.[*].dlPathImg").value(hasItem(DEFAULT_DL_PATH_IMG.toString())));
    }

    @Test
    @Transactional
    public void getDatasource() throws Exception {
        // Initialize the database
        datasourceRepository.saveAndFlush(datasource);

        // Get the datasource
        restDatasourceMockMvc.perform(get("/api/datasources/{id}", datasource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(datasource.getId().intValue()))
            .andExpect(jsonPath("$.dbTipo").value(DEFAULT_DB_TIPO.toString()))
            .andExpect(jsonPath("$.cdCod").value(DEFAULT_CD_COD.toString()))
            .andExpect(jsonPath("$.tsCreaz").value(DEFAULT_TS_CREAZ.toString()))
            .andExpect(jsonPath("$.tsModif").value(DEFAULT_TS_MODIF.toString()))
            .andExpect(jsonPath("$.dlPathImg").value(DEFAULT_DL_PATH_IMG.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDatasource() throws Exception {
        // Get the datasource
        restDatasourceMockMvc.perform(get("/api/datasources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDatasource() throws Exception {
        // Initialize the database
        datasourceRepository.saveAndFlush(datasource);
        int databaseSizeBeforeUpdate = datasourceRepository.findAll().size();

        // Update the datasource
        Datasource updatedDatasource = datasourceRepository.findOne(datasource.getId());
        // Disconnect from session so that the updates on updatedDatasource are not directly saved in db
        em.detach(updatedDatasource);
        updatedDatasource
            .dbTipo(UPDATED_DB_TIPO)
            .cdCod(UPDATED_CD_COD)
            .tsCreaz(UPDATED_TS_CREAZ)
            .tsModif(UPDATED_TS_MODIF)
            .dlPathImg(UPDATED_DL_PATH_IMG);

        restDatasourceMockMvc.perform(put("/api/datasources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDatasource)))
            .andExpect(status().isOk());

        // Validate the Datasource in the database
        List<Datasource> datasourceList = datasourceRepository.findAll();
        assertThat(datasourceList).hasSize(databaseSizeBeforeUpdate);
        Datasource testDatasource = datasourceList.get(datasourceList.size() - 1);
        assertThat(testDatasource.getDbTipo()).isEqualTo(UPDATED_DB_TIPO);
        assertThat(testDatasource.getCdCod()).isEqualTo(UPDATED_CD_COD);
        assertThat(testDatasource.getTsCreaz()).isEqualTo(UPDATED_TS_CREAZ);
        assertThat(testDatasource.getTsModif()).isEqualTo(UPDATED_TS_MODIF);
        assertThat(testDatasource.getDlPathImg()).isEqualTo(UPDATED_DL_PATH_IMG);
    }

    @Test
    @Transactional
    public void updateNonExistingDatasource() throws Exception {
        int databaseSizeBeforeUpdate = datasourceRepository.findAll().size();

        // Create the Datasource

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDatasourceMockMvc.perform(put("/api/datasources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datasource)))
            .andExpect(status().isCreated());

        // Validate the Datasource in the database
        List<Datasource> datasourceList = datasourceRepository.findAll();
        assertThat(datasourceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDatasource() throws Exception {
        // Initialize the database
        datasourceRepository.saveAndFlush(datasource);
        int databaseSizeBeforeDelete = datasourceRepository.findAll().size();

        // Get the datasource
        restDatasourceMockMvc.perform(delete("/api/datasources/{id}", datasource.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Datasource> datasourceList = datasourceRepository.findAll();
        assertThat(datasourceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Datasource.class);
        Datasource datasource1 = new Datasource();
        datasource1.setId(1L);
        Datasource datasource2 = new Datasource();
        datasource2.setId(datasource1.getId());
        assertThat(datasource1).isEqualTo(datasource2);
        datasource2.setId(2L);
        assertThat(datasource1).isNotEqualTo(datasource2);
        datasource1.setId(null);
        assertThat(datasource1).isNotEqualTo(datasource2);
    }
}
