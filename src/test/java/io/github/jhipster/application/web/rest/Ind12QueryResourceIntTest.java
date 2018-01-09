package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ind12Query;
import io.github.jhipster.application.repository.Ind12QueryRepository;
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
 * Test class for the Ind12QueryResource REST controller.
 *
 * @see Ind12QueryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ind12QueryResourceIntTest {

    private static final String DEFAULT_DB_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_DB_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_CD_COD = "AAAAAAAAAA";
    private static final String UPDATED_CD_COD = "BBBBBBBBBB";

    private static final String DEFAULT_NM_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NM_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DE_QUERY = "AAAAAAAAAA";
    private static final String UPDATED_DE_QUERY = "BBBBBBBBBB";

    private static final String DEFAULT_DL_PATH = "AAAAAAAAAA";
    private static final String UPDATED_DL_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_DE_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DE_DESC = "BBBBBBBBBB";

    @Autowired
    private Ind12QueryRepository ind12QueryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInd12QueryMockMvc;

    private Ind12Query ind12Query;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ind12QueryResource ind12QueryResource = new Ind12QueryResource(ind12QueryRepository);
        this.restInd12QueryMockMvc = MockMvcBuilders.standaloneSetup(ind12QueryResource)
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
    public static Ind12Query createEntity(EntityManager em) {
        Ind12Query ind12Query = new Ind12Query()
            .dbTipo(DEFAULT_DB_TIPO)
            .cdCod(DEFAULT_CD_COD)
            .nmNome(DEFAULT_NM_NOME)
            .deQuery(DEFAULT_DE_QUERY)
            .dlPath(DEFAULT_DL_PATH)
            .deDesc(DEFAULT_DE_DESC);
        return ind12Query;
    }

    @Before
    public void initTest() {
        ind12Query = createEntity(em);
    }

    @Test
    @Transactional
    public void createInd12Query() throws Exception {
        int databaseSizeBeforeCreate = ind12QueryRepository.findAll().size();

        // Create the Ind12Query
        restInd12QueryMockMvc.perform(post("/api/ind-12-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind12Query)))
            .andExpect(status().isCreated());

        // Validate the Ind12Query in the database
        List<Ind12Query> ind12QueryList = ind12QueryRepository.findAll();
        assertThat(ind12QueryList).hasSize(databaseSizeBeforeCreate + 1);
        Ind12Query testInd12Query = ind12QueryList.get(ind12QueryList.size() - 1);
        assertThat(testInd12Query.getDbTipo()).isEqualTo(DEFAULT_DB_TIPO);
        assertThat(testInd12Query.getCdCod()).isEqualTo(DEFAULT_CD_COD);
        assertThat(testInd12Query.getNmNome()).isEqualTo(DEFAULT_NM_NOME);
        assertThat(testInd12Query.getDeQuery()).isEqualTo(DEFAULT_DE_QUERY);
        assertThat(testInd12Query.getDlPath()).isEqualTo(DEFAULT_DL_PATH);
        assertThat(testInd12Query.getDeDesc()).isEqualTo(DEFAULT_DE_DESC);
    }

    @Test
    @Transactional
    public void createInd12QueryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ind12QueryRepository.findAll().size();

        // Create the Ind12Query with an existing ID
        ind12Query.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInd12QueryMockMvc.perform(post("/api/ind-12-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind12Query)))
            .andExpect(status().isBadRequest());

        // Validate the Ind12Query in the database
        List<Ind12Query> ind12QueryList = ind12QueryRepository.findAll();
        assertThat(ind12QueryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCdCodIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind12QueryRepository.findAll().size();
        // set the field null
        ind12Query.setCdCod(null);

        // Create the Ind12Query, which fails.

        restInd12QueryMockMvc.perform(post("/api/ind-12-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind12Query)))
            .andExpect(status().isBadRequest());

        List<Ind12Query> ind12QueryList = ind12QueryRepository.findAll();
        assertThat(ind12QueryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInd12Queries() throws Exception {
        // Initialize the database
        ind12QueryRepository.saveAndFlush(ind12Query);

        // Get all the ind12QueryList
        restInd12QueryMockMvc.perform(get("/api/ind-12-queries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ind12Query.getId().intValue())))
            .andExpect(jsonPath("$.[*].dbTipo").value(hasItem(DEFAULT_DB_TIPO.toString())))
            .andExpect(jsonPath("$.[*].cdCod").value(hasItem(DEFAULT_CD_COD.toString())))
            .andExpect(jsonPath("$.[*].nmNome").value(hasItem(DEFAULT_NM_NOME.toString())))
            .andExpect(jsonPath("$.[*].deQuery").value(hasItem(DEFAULT_DE_QUERY.toString())))
            .andExpect(jsonPath("$.[*].dlPath").value(hasItem(DEFAULT_DL_PATH.toString())))
            .andExpect(jsonPath("$.[*].deDesc").value(hasItem(DEFAULT_DE_DESC.toString())));
    }

    @Test
    @Transactional
    public void getInd12Query() throws Exception {
        // Initialize the database
        ind12QueryRepository.saveAndFlush(ind12Query);

        // Get the ind12Query
        restInd12QueryMockMvc.perform(get("/api/ind-12-queries/{id}", ind12Query.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ind12Query.getId().intValue()))
            .andExpect(jsonPath("$.dbTipo").value(DEFAULT_DB_TIPO.toString()))
            .andExpect(jsonPath("$.cdCod").value(DEFAULT_CD_COD.toString()))
            .andExpect(jsonPath("$.nmNome").value(DEFAULT_NM_NOME.toString()))
            .andExpect(jsonPath("$.deQuery").value(DEFAULT_DE_QUERY.toString()))
            .andExpect(jsonPath("$.dlPath").value(DEFAULT_DL_PATH.toString()))
            .andExpect(jsonPath("$.deDesc").value(DEFAULT_DE_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInd12Query() throws Exception {
        // Get the ind12Query
        restInd12QueryMockMvc.perform(get("/api/ind-12-queries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInd12Query() throws Exception {
        // Initialize the database
        ind12QueryRepository.saveAndFlush(ind12Query);
        int databaseSizeBeforeUpdate = ind12QueryRepository.findAll().size();

        // Update the ind12Query
        Ind12Query updatedInd12Query = ind12QueryRepository.findOne(ind12Query.getId());
        // Disconnect from session so that the updates on updatedInd12Query are not directly saved in db
        em.detach(updatedInd12Query);
        updatedInd12Query
            .dbTipo(UPDATED_DB_TIPO)
            .cdCod(UPDATED_CD_COD)
            .nmNome(UPDATED_NM_NOME)
            .deQuery(UPDATED_DE_QUERY)
            .dlPath(UPDATED_DL_PATH)
            .deDesc(UPDATED_DE_DESC);

        restInd12QueryMockMvc.perform(put("/api/ind-12-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInd12Query)))
            .andExpect(status().isOk());

        // Validate the Ind12Query in the database
        List<Ind12Query> ind12QueryList = ind12QueryRepository.findAll();
        assertThat(ind12QueryList).hasSize(databaseSizeBeforeUpdate);
        Ind12Query testInd12Query = ind12QueryList.get(ind12QueryList.size() - 1);
        assertThat(testInd12Query.getDbTipo()).isEqualTo(UPDATED_DB_TIPO);
        assertThat(testInd12Query.getCdCod()).isEqualTo(UPDATED_CD_COD);
        assertThat(testInd12Query.getNmNome()).isEqualTo(UPDATED_NM_NOME);
        assertThat(testInd12Query.getDeQuery()).isEqualTo(UPDATED_DE_QUERY);
        assertThat(testInd12Query.getDlPath()).isEqualTo(UPDATED_DL_PATH);
        assertThat(testInd12Query.getDeDesc()).isEqualTo(UPDATED_DE_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingInd12Query() throws Exception {
        int databaseSizeBeforeUpdate = ind12QueryRepository.findAll().size();

        // Create the Ind12Query

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInd12QueryMockMvc.perform(put("/api/ind-12-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind12Query)))
            .andExpect(status().isCreated());

        // Validate the Ind12Query in the database
        List<Ind12Query> ind12QueryList = ind12QueryRepository.findAll();
        assertThat(ind12QueryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInd12Query() throws Exception {
        // Initialize the database
        ind12QueryRepository.saveAndFlush(ind12Query);
        int databaseSizeBeforeDelete = ind12QueryRepository.findAll().size();

        // Get the ind12Query
        restInd12QueryMockMvc.perform(delete("/api/ind-12-queries/{id}", ind12Query.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ind12Query> ind12QueryList = ind12QueryRepository.findAll();
        assertThat(ind12QueryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ind12Query.class);
        Ind12Query ind12Query1 = new Ind12Query();
        ind12Query1.setId(1L);
        Ind12Query ind12Query2 = new Ind12Query();
        ind12Query2.setId(ind12Query1.getId());
        assertThat(ind12Query1).isEqualTo(ind12Query2);
        ind12Query2.setId(2L);
        assertThat(ind12Query1).isNotEqualTo(ind12Query2);
        ind12Query1.setId(null);
        assertThat(ind12Query1).isNotEqualTo(ind12Query2);
    }
}
